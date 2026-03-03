import { useState, useRef } from 'react';
import { submitPayment } from '../services/api';
import { useStudent } from '../context/StudentContext';
import ImagePreviewModal from './ImagePreviewModal';
import toast from 'react-hot-toast';

// Compress image before upload to speed up Cloudinary transfer
const compressImage = (file, maxWidth = 1200, quality = 0.7) => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            let w = img.width;
            let h = img.height;
            if (w > maxWidth) {
                h = (h * maxWidth) / w;
                w = maxWidth;
            }
            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(img, 0, 0, w, h);
            canvas.toBlob((blob) => {
                resolve(new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' }));
            }, 'image/jpeg', quality);
        };
        img.src = URL.createObjectURL(file);
    });
};

const UploadSection = () => {
    const { student, markPaymentDone } = useStudent();
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [utr, setUtr] = useState('');
    const [utrLocked, setUtrLocked] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            toast.error('Only image files are allowed', { id: 'file-type' });
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File must be under 5MB', { id: 'file-size' });
            return;
        }
        setSelectedImage(file);
        setIsConfirmed(false);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
            setShowPreview(true);
        };
        reader.readAsDataURL(file);
    };

    const handleConfirm = () => {
        setIsConfirmed(true);
        setShowPreview(false);
        toast.success('Screenshot confirmed', { id: 'img-confirm' });
    };

    const handleCancelPreview = () => {
        setShowPreview(false);
        setSelectedImage(null);
        setPreviewUrl('');
        setIsConfirmed(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleLockUtr = () => {
        if (!utr.trim()) {
            toast.error('Enter UTR first', { id: 'utr-empty' });
            return;
        }
        setUtrLocked(true);
    };

    const handleSubmit = async () => {
        if (!selectedImage || !isConfirmed || !utr.trim() || !utrLocked) return;
        setSubmitting(true);
        try {
            const compressed = await compressImage(selectedImage);
            const data = await submitPayment(student.email, student.uniqueCode, utr.trim(), compressed);
            if (data.success) {
                toast.success('Payment submitted successfully', { id: 'submit-ok' });
                setSubmitted(true);
                markPaymentDone();
            }
        } catch (err) {
            const message = err.response?.data?.message || 'Submission failed. Try again.';
            toast.error(message, { id: 'submit-fail' });
        } finally {
            setSubmitting(false);
        }
    };

    const canSubmit = selectedImage && isConfirmed && utr.trim() !== '' && utrLocked && !submitting && !submitted;

    if (submitted || student.paymentSubmitted) {
        return (
            <div style={{
                background: '#f0fdf4', border: '1px solid #dcfce7',
                borderRadius: '10px', padding: '24px', textAlign: 'center',
            }}>
                <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: '#16a34a', display: 'inline-flex',
                    alignItems: 'center', justifyContent: 'center',
                    marginBottom: '12px',
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#15803d', marginBottom: '4px' }}>
                    Payment submitted
                </h3>
                <p style={{ fontSize: '13px', color: '#6b7280' }}>
                    Your details have been recorded. No further action needed.
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Upload */}
            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                    Payment screenshot
                </label>
                <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                        id="file-upload"
                    />
                    {isConfirmed ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                            <div style={{
                                width: '28px', height: '28px', borderRadius: '50%',
                                background: '#16a34a', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                            }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <p style={{ color: '#111827', fontWeight: '500', fontSize: '13px' }}>
                                    {selectedImage?.name.length > 30
                                        ? selectedImage.name.slice(0, 27) + '...'
                                        : selectedImage?.name}
                                </p>
                                <p style={{ fontSize: '11px', color: '#9ca3af' }}>Click to change</p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 8px' }}>
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <p style={{ color: '#374151', fontWeight: '500', fontSize: '13px' }}>Upload screenshot</p>
                            <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>JPG or PNG, max 5MB</p>
                        </div>
                    )}
                </div>
            </div>

            {/* UTR with Confirm button */}
            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                    UTR / Transaction ID
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                        id="utr-input"
                        type="text"
                        className="input-field"
                        placeholder="Enter UTR number"
                        value={utr}
                        onChange={(e) => { setUtr(e.target.value); setUtrLocked(false); }}
                        disabled={submitting || submitted}
                        style={{ flex: 1 }}
                    />
                    <button
                        type="button"
                        onClick={handleLockUtr}
                        disabled={!utr.trim() || submitting}
                        style={{
                            padding: '10px 16px', borderRadius: '8px', border: 'none',
                            fontSize: '13px', fontWeight: '500', cursor: 'pointer',
                            fontFamily: 'Inter, sans-serif',
                            transition: 'all 0.15s',
                            background: utrLocked ? '#f0fdf4' : '#111827',
                            color: utrLocked ? '#16a34a' : '#ffffff',
                            opacity: (!utr.trim() || submitting) ? 0.4 : 1,
                        }}
                    >
                        {utrLocked ? '✓ Confirmed' : 'Confirm'}
                    </button>
                </div>
            </div>

            {/* Steps */}
            <div style={{ marginBottom: '12px', display: 'flex', gap: '8px' }}>
                {[
                    { done: !!selectedImage, label: 'Selected' },
                    { done: isConfirmed, label: 'Confirmed' },
                    { done: utrLocked, label: 'UTR' },
                ].map((step, i) => (
                    <div key={i} style={{
                        flex: 1, textAlign: 'center', padding: '6px 0',
                        borderRadius: '6px', fontSize: '11px', fontWeight: '500',
                        background: step.done ? '#f0fdf4' : '#f9fafb',
                        color: step.done ? '#16a34a' : '#d1d5db',
                        border: `1px solid ${step.done ? '#dcfce7' : '#f3f4f6'}`,
                    }}>
                        {step.done ? '✓' : '○'} {step.label}
                    </div>
                ))}
            </div>

            {/* Warning Note */}
            <div style={{
                background: '#fffbeb', border: '1px solid #fef3c7',
                borderRadius: '8px', padding: '10px 12px', marginBottom: '16px',
                display: 'flex', gap: '8px', alignItems: 'flex-start',
            }}>
                <span style={{ fontSize: '14px', lineHeight: '1.4' }}>⚠️</span>
                <p style={{ fontSize: '11px', color: '#92400e', lineHeight: '1.5' }}>
                    Please double-check all details before submitting. Once submitted, changes cannot be made.
                    Incorrect information may affect your team's registration.
                </p>
            </div>

            {/* Submit */}
            <button
                id="submit-payment-btn"
                className="btn-primary"
                disabled={!canSubmit}
                onClick={handleSubmit}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
                {submitting ? (
                    <><span className="spinner"></span> Uploading...</>
                ) : (
                    'Submit payment'
                )}
            </button>

            {showPreview && (
                <ImagePreviewModal
                    previewUrl={previewUrl}
                    onConfirm={handleConfirm}
                    onCancel={handleCancelPreview}
                />
            )}
        </div>
    );
};

export default UploadSection;

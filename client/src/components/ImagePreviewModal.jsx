const ImagePreviewModal = ({ previewUrl, onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: '16px',
                }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                        Confirm screenshot
                    </h3>
                    <button
                        onClick={onCancel}
                        style={{
                            background: 'none', border: 'none', fontSize: '18px',
                            color: '#9ca3af', cursor: 'pointer', padding: '4px',
                            lineHeight: '1',
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Image */}
                <div style={{
                    borderRadius: '8px', overflow: 'hidden',
                    marginBottom: '16px', border: '1px solid #e5e7eb',
                    background: '#f9fafb',
                }}>
                    <img
                        src={previewUrl}
                        alt="Payment Screenshot"
                        style={{
                            width: '100%', maxHeight: '320px',
                            objectFit: 'contain', display: 'block',
                        }}
                    />
                </div>

                <p style={{
                    fontSize: '13px', color: '#6b7280', marginBottom: '16px',
                    textAlign: 'center',
                }}>
                    Is this the correct payment screenshot?
                </p>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={onCancel}
                        style={{
                            flex: 1, padding: '10px', borderRadius: '8px',
                            border: '1px solid #e5e7eb', background: 'white',
                            color: '#374151', fontSize: '13px', fontWeight: '500',
                            cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                            transition: 'background 0.15s',
                        }}
                        onMouseOver={e => e.target.style.background = '#f9fafb'}
                        onMouseOut={e => e.target.style.background = 'white'}
                    >
                        Re-select
                    </button>
                    <button
                        id="confirm-image-btn"
                        onClick={onConfirm}
                        className="btn-primary"
                        style={{ flex: 1 }}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImagePreviewModal;

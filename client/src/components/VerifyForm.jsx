import { useState, useRef } from 'react';
import { verifyStudent } from '../services/api';
import { useStudent } from '../context/StudentContext';
import toast from 'react-hot-toast';

const VerifyForm = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const { loginStudent } = useStudent();
    const attemptsRef = useRef(0);
    const cooldownTimerRef = useRef(null);

    const startCooldown = () => {
        setCooldown(60);
        cooldownTimerRef.current = setInterval(() => {
            setCooldown((prev) => {
                if (prev <= 1) {
                    clearInterval(cooldownTimerRef.current);
                    attemptsRef.current = 0;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleVerify = async (e) => {
        e.preventDefault();

        if (cooldown > 0) return;

        if (!email.trim() || !code.trim()) {
            toast.error('Enter both email and code', { id: 'missing-fields' });
            return;
        }

        if (attemptsRef.current >= 3) {
            startCooldown();
            toast.error('Too many attempts. Try again in 1 minute.', { id: 'rate-limit' });
            return;
        }

        setLoading(true);
        attemptsRef.current += 1;

        try {
            const data = await verifyStudent(email.trim(), code.trim());
            if (data.success) {
                attemptsRef.current = 0;
                toast.success(`Welcome, ${data.student.name}! 🎉`, { id: 'login-success' });
                loginStudent(data.student);
            }
        } catch (err) {
            const message = err.response?.data?.message || 'Verification failed';
            toast.error(message, { id: 'verify-error' });

            if (attemptsRef.current >= 3) {
                startCooldown();
            }
        } finally {
            setLoading(false);
        }
    };

    const isDisabled = loading || cooldown > 0;

    return (
        <div className="animate-fade-in-up" style={{ width: '100%', maxWidth: '380px', animationDelay: '0.1s' }}>
            <div className="card" style={{ padding: '32px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                    Verify your identity
                </h2>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>
                    Enter your registered email and unique code
                </p>

                <form onSubmit={handleVerify}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{
                            display: 'block', fontSize: '13px', fontWeight: '500',
                            color: '#374151', marginBottom: '6px',
                        }}>Email</label>
                        <input
                            id="email-input"
                            type="email"
                            className="input-field"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isDisabled}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block', fontSize: '13px', fontWeight: '500',
                            color: '#374151', marginBottom: '6px',
                        }}>Unique Code</label>
                        <input
                            id="code-input"
                            type="text"
                            className="input-field"
                            placeholder="Enter code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            disabled={isDisabled}
                        />
                    </div>

                    <button
                        id="verify-btn"
                        type="submit"
                        className="btn-primary"
                        disabled={isDisabled}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                        {loading ? (
                            <><span className="spinner"></span> Verifying...</>
                        ) : cooldown > 0 ? (
                            `Try again in ${cooldown}s`
                        ) : (
                            'Continue'
                        )}
                    </button>
                </form>

                <p style={{ fontSize: '11px', color: '#9ca3af', textAlign: 'center', marginTop: '16px' }}>
                    Only pre-authorized students can access this portal
                </p>
            </div>
        </div>
    );
};

export default VerifyForm;

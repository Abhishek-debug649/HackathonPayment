import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hostLogin } from '../services/api';
import toast from 'react-hot-toast';
import BrandedFooter from './BrandedFooter';

const HostLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            toast.error('Please enter both email and password', { id: 'host-missing' });
            return;
        }
        setLoading(true);
        try {
            const data = await hostLogin(email.trim(), password.trim());
            if (data.success) {
                localStorage.setItem('hostAuthenticated', 'true');
                localStorage.setItem('hostEmail', data.host.email);
                toast.success('Welcome, Host!', { id: 'host-login' });
                navigate('/host-dashboard');
            }
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed. Invalid credentials.';
            toast.error(message, { id: 'host-error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', flexDirection: 'column',
            background: '#f1f5f9',
        }}>
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '40px 16px',
            }}>
            <div className="animate-fade-in-up" style={{ textAlign: 'center', marginBottom: '28px' }}>
                <p style={{
                    fontSize: '11px', fontWeight: '600', color: '#94a3af',
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px',
                }}>Admin Access</p>
                <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', letterSpacing: '-0.02em' }}>
                    QuickRoll Verification
                </h1>
            </div>

            <div className="animate-fade-in-up" style={{ width: '100%', maxWidth: '380px', animationDelay: '0.1s' }}>
                <div style={{
                    background: '#fff', border: '1px solid #e2e8f0',
                    borderRadius: '12px', padding: '32px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                    <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                        Host Login
                    </h2>
                    <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
                        Enter your credentials to manage submissions
                    </p>

                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#475569', marginBottom: '6px' }}>
                                Email
                            </label>
                            <input
                                id="host-email-input"
                                type="email"
                                className="input-field"
                                placeholder="host@quickroll.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#475569', marginBottom: '6px' }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    id="host-password-input"
                                    type={showPassword ? 'text' : 'password'}
                                    className="input-field"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                    style={{ paddingRight: '44px' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        color: '#94a3b8', fontSize: '13px', fontFamily: 'Inter, sans-serif',
                                    }}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <button
                            id="host-login-btn"
                            type="submit"
                            className="btn-primary"
                            disabled={loading}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                        >
                            {loading ? (
                                <><span className="spinner"></span> Authenticating...</>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>

                    <div style={{ marginTop: '16px', textAlign: 'center' }}>
                        <button
                            onClick={() => navigate('/')}
                            style={{
                                background: 'none', border: 'none', fontSize: '12px',
                                color: '#94a3b8', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                            }}
                        >
                            ← Back to Student Portal
                        </button>
                    </div>
                </div>

                <p style={{
                    fontSize: '11px', color: '#94a3b8', textAlign: 'center',
                    marginTop: '16px',
                }}>
                    Restricted to authorized host only
                </p>
            </div>
            </div>
            <BrandedFooter />
        </div>
    );
};

export default HostLogin;

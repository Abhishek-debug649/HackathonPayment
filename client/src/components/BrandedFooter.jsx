import quickrollLogo from '../../Assets/logo192.png';
import developerPhoto from '../../Assets/WhatsApp Image 2026-03-13 at 11.51.31 PM.jpeg';

const BrandedFooter = () => {
    return (
        <footer>
            {/* ===== Main Footer ===== */}
            <div style={{
                background: 'linear-gradient(180deg, #0c1222 0%, #0a0f1c 100%)',
                padding: '48px 24px 40px',
                borderTop: '1px solid rgba(56, 63, 104, 0.25)',
            }}>
                <div style={{
                    maxWidth: '960px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                    gap: '20px',
                }}>

                    {/* ═══════ QuickRoll Card ═══════ */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(17, 24, 45, 0.95) 0%, rgba(15, 20, 38, 0.9) 100%)',
                        border: '1px solid rgba(67, 76, 124, 0.2)',
                        borderRadius: '16px',
                        padding: '32px 30px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        {/* Subtle top glow */}
                        <div style={{
                            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                            width: '200px', height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)',
                        }} />

                        {/* Logo + Title */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            marginBottom: '8px',
                        }}>
                            <div style={{
                                width: '48px', height: '48px',
                                borderRadius: '14px',
                                background: 'rgba(99, 102, 241, 0.08)',
                                border: '1px solid rgba(99, 102, 241, 0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                padding: '6px',
                            }}>
                                <img
                                    src={quickrollLogo}
                                    alt="QuickRoll"
                                    style={{
                                        width: '100%', height: '100%',
                                        borderRadius: '10px',
                                        objectFit: 'contain',
                                    }}
                                />
                            </div>
                            <div>
                                <h3 style={{
                                    fontSize: '18px', fontWeight: '700',
                                    color: '#e2e8f0', margin: 0,
                                    letterSpacing: '-0.02em',
                                    fontFamily: "'Inter', sans-serif",
                                }}>QuickRoll</h3>
                                <span style={{
                                    display: 'inline-block', marginTop: '5px',
                                    fontSize: '9.5px', fontWeight: '700',
                                    color: '#22d3ee',
                                    background: 'rgba(34, 211, 238, 0.08)',
                                    border: '1px solid rgba(34, 211, 238, 0.15)',
                                    padding: '2.5px 9px', borderRadius: '4px',
                                    letterSpacing: '0.1em', textTransform: 'uppercase',
                                    fontFamily: "'Inter', sans-serif",
                                }}>Attendance System</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p style={{
                            fontSize: '13px', color: 'rgba(148, 163, 184, 0.85)',
                            lineHeight: '1.8', margin: '18px 0 24px',
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: '0.01em',
                        }}>
                            QuickRoll is a modern attendance management system
                            designed to streamline tracking in educational institutions —
                            combining cutting-edge technology with user-friendly design
                            for real-time, reliable solutions.
                        </p>

                        {/* CTA Buttons */}
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <a
                                href="https://app.quickrollattendance.live/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '7px',
                                    padding: '9px 20px', borderRadius: '9px',
                                    background: 'linear-gradient(135deg, #0891b2, #06b6d4)',
                                    color: '#fff', fontSize: '12px', fontWeight: '600',
                                    textDecoration: 'none', fontFamily: "'Inter', sans-serif",
                                    transition: 'all 0.25s ease',
                                    boxShadow: '0 2px 12px rgba(6, 182, 212, 0.2)',
                                    border: 'none',
                                }}
                                onMouseOver={e => {
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(6, 182, 212, 0.35)';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(6, 182, 212, 0.2)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                                Visit QuickRoll
                            </a>
                            <a
                                href="https://app.quickrollattendance.live/about"
                                style={{
                                    display: 'inline-flex', alignItems: 'center',
                                    padding: '9px 20px', borderRadius: '9px',
                                    background: 'transparent',
                                    color: 'rgba(148, 163, 184, 0.8)',
                                    fontSize: '12px', fontWeight: '600',
                                    textDecoration: 'none', fontFamily: "'Inter', sans-serif",
                                    border: '1px solid rgba(100, 116, 139, 0.2)',
                                    transition: 'all 0.25s ease',
                                }}
                                onMouseOver={e => {
                                    e.currentTarget.style.color = '#e2e8f0';
                                    e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.4)';
                                    e.currentTarget.style.background = 'rgba(100, 116, 139, 0.06)';
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.color = 'rgba(148, 163, 184, 0.8)';
                                    e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.2)';
                                    e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                About Us
                            </a>
                        </div>
                    </div>

                    {/* ═══════ Developer Card ═══════ */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(17, 24, 45, 0.95) 0%, rgba(15, 20, 38, 0.9) 100%)',
                        border: '1px solid rgba(67, 76, 124, 0.2)',
                        borderRadius: '16px',
                        padding: '32px 30px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        {/* Subtle top glow */}
                        <div style={{
                            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                            width: '200px', height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)',
                        }} />

                        {/* Photo + Title */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            marginBottom: '8px',
                        }}>
                            <div style={{
                                width: '56px', height: '56px',
                                borderRadius: '50%',
                                background: 'rgba(99, 102, 241, 0.08)',
                                border: '2px solid rgba(99, 102, 241, 0.18)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                padding: '2px',
                            }}>
                                <img
                                    src={developerPhoto}
                                    alt="Abhishek Negi"
                                    style={{
                                        width: '100%', height: '100%',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        objectPosition: 'top',
                                    }}
                                />
                            </div>
                            <div>
                                <h3 style={{
                                    fontSize: '18px', fontWeight: '700',
                                    color: '#e2e8f0', margin: 0,
                                    letterSpacing: '-0.02em',
                                    fontFamily: "'Inter', sans-serif",
                                }}>Abhishek Negi</h3>
                                <span style={{
                                    display: 'inline-block', marginTop: '5px',
                                    fontSize: '9.5px', fontWeight: '700',
                                    color: '#4ade80',
                                    background: 'rgba(74, 222, 128, 0.08)',
                                    border: '1px solid rgba(74, 222, 128, 0.15)',
                                    padding: '2.5px 9px', borderRadius: '4px',
                                    letterSpacing: '0.1em', textTransform: 'uppercase',
                                    fontFamily: "'Inter', sans-serif",
                                }}>Developer</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p style={{
                            fontSize: '13px', color: 'rgba(148, 163, 184, 0.85)',
                            lineHeight: '1.8', margin: '18px 0 24px',
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: '0.01em',
                        }}>
                            Full Stack Developer — passionate about
                            building scalable, production-grade applications with modern
                            technologies and pixel-perfect interfaces.
                        </p>

                        {/* Social Icons + Portfolio */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                            {[
                                {
                                    href: 'https://github.com/Abhishek-debug649',
                                    icon: (
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    ),
                                },
                                {
                                    href: 'https://linkedin.com/in/abhisheknegi05',
                                    icon: (
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    ),
                                },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        width: '40px', height: '40px',
                                        borderRadius: '11px',
                                        background: 'rgba(30, 41, 59, 0.5)',
                                        border: '1px solid rgba(71, 85, 105, 0.2)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'rgba(148, 163, 184, 0.7)',
                                        textDecoration: 'none',
                                        transition: 'all 0.25s ease',
                                    }}
                                    onMouseOver={e => {
                                        e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                                        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.25)';
                                        e.currentTarget.style.color = '#c7d2fe';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseOut={e => {
                                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
                                        e.currentTarget.style.borderColor = 'rgba(71, 85, 105, 0.2)';
                                        e.currentTarget.style.color = 'rgba(148, 163, 184, 0.7)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    {social.icon}
                                </a>
                            ))}

                            {/* Portfolio Button */}
                            <a
                                href="https://abhishek-negi-dev.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '7px',
                                    padding: '9px 18px', borderRadius: '9px',
                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    color: '#fff', fontSize: '12px', fontWeight: '600',
                                    textDecoration: 'none', fontFamily: "'Inter', sans-serif",
                                    transition: 'all 0.25s ease',
                                    boxShadow: '0 2px 12px rgba(99, 102, 241, 0.25)',
                                    border: 'none',
                                    marginLeft: '2px',
                                }}
                                onMouseOver={e => {
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(99, 102, 241, 0.25)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                </svg>
                                Portfolio
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== Bottom Bar ===== */}
            <div style={{
                background: '#080c16',
                borderTop: '1px solid rgba(56, 63, 104, 0.15)',
                padding: '14px 24px',
            }}>
                <div style={{
                    maxWidth: '960px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px',
                }}>
                    {/* Left */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '24px', height: '24px', borderRadius: '7px',
                            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(99, 102, 241, 0.25)',
                            flexShrink: 0,
                        }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                        </div>
                        <span style={{
                            fontSize: '12.5px', color: 'rgba(100, 116, 139, 0.8)',
                            fontFamily: "'Inter', sans-serif",
                        }}>
                            <span style={{ fontWeight: '600', color: 'rgba(203, 213, 225, 0.9)' }}>
                                Hack-O-Holic 4.0
                            </span>
                            <span style={{ margin: '0 6px', color: 'rgba(71, 85, 105, 0.5)' }}>—</span>
                            A Product by{' '}
                            <span style={{ fontWeight: '500', color: 'rgba(203, 213, 225, 0.7)' }}>QuickRoll</span>
                        </span>
                    </div>

                    {/* Right */}
                    <p style={{
                        fontSize: '11.5px', color: 'rgba(71, 85, 105, 0.7)', margin: 0,
                        fontFamily: "'Inter', sans-serif",
                    }}>
                        © 2026 QuickRoll. Crafted with{' '}
                        <span style={{ color: '#f87171', fontSize: '12px' }}>❤</span>
                        {' by '}
                        <a
                            href="https://github.com/Abhishek-debug649"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: 'rgba(34, 211, 238, 0.75)',
                                textDecoration: 'none',
                                fontWeight: '500',
                                transition: 'color 0.2s',
                            }}
                            onMouseOver={e => { e.currentTarget.style.color = '#22d3ee'; e.currentTarget.style.textDecoration = 'underline'; }}
                            onMouseOut={e => { e.currentTarget.style.color = 'rgba(34, 211, 238, 0.75)'; e.currentTarget.style.textDecoration = 'none'; }}
                        >
                            Abhishek Negi
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default BrandedFooter;

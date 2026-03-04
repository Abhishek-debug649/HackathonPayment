import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStudent } from './context/StudentContext';
import VerifyForm from './components/VerifyForm';
import StudentDashboard from './components/StudentDashboard';
import HostLogin from './components/HostLogin';
import HostDashboard from './components/HostDashboard';
import AttendanceDashboard from './components/AttendanceDashboard';

function StudentPage() {
    const { student } = useStudent();

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 16px',
        }}>
            {/* Header */}
            <div className="animate-fade-in-up" style={{ textAlign: 'center', marginBottom: '32px' }}>
                <p style={{
                    fontSize: '12px', fontWeight: '600', color: '#6b7280',
                    letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px',
                }}>
                    Payment Verification
                </p>
                <h1 style={{
                    fontSize: 'clamp(22px, 5vw, 32px)',
                    fontWeight: '700', color: '#111827',
                    letterSpacing: '-0.025em', lineHeight: '1.2',
                }}>
                    Hack-O-Holic 4.0
                </h1>
            </div>

            {student ? <StudentDashboard /> : <VerifyForm />}

            {/* Footer */}
            <div className="animate-fade-in-up" style={{
                marginTop: '40px', textAlign: 'center',
                animationDelay: '0.25s',
                background: '#111827', borderRadius: '12px',
                padding: '20px 24px', width: '100%', maxWidth: '440px',
            }}>
                <p style={{ fontSize: '12px', color: '#d1d5db', lineHeight: '1.6' }}>
                    Facing any issues? Mail us at{' '}
                    <a href="mailto:support@hackoholic.com" style={{
                        color: '#ffffff', fontWeight: '600', textDecoration: 'underline',
                        textUnderlineOffset: '2px',
                    }}>
                        support@hackoholic.com
                    </a>
                </p>
                <p style={{
                    fontSize: '11px', color: '#6b7280', marginTop: '8px',
                }}>
                    © 2026 Hack-O-Holic 4.0 · All rights reserved
                </p>
            </div>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StudentPage />} />
                <Route path="/host-login" element={<HostLogin />} />
                <Route path="/host-dashboard" element={<HostDashboard />} />
                <Route path="/host-dashboard/attendance" element={<AttendanceDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

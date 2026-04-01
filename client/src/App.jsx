import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStudent } from './context/StudentContext';
import VerifyForm from './components/VerifyForm';
import StudentDashboard from './components/StudentDashboard';
import HostLogin from './components/HostLogin';
import HostDashboard from './components/HostDashboard';
import AttendanceDashboard from './components/AttendanceDashboard';
import BrandedFooter from './components/BrandedFooter';

function StudentPage() {
    const { student } = useStudent();

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Main Content */}
            <div style={{
                flex: 1,
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

            </div>

            {/* Branded Footer */}
            <BrandedFooter />
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

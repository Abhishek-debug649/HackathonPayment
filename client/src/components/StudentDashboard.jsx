import { useStudent } from '../context/StudentContext';
import UploadSection from './UploadSection';

const StudentDashboard = () => {
    const { student, logoutStudent } = useStudent();

    return (
        <div className="animate-fade-in-up" style={{ width: '100%', maxWidth: '440px', animationDelay: '0.1s' }}>
            <div className="card" style={{ padding: '28px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div>
                        <h2 style={{ fontSize: '17px', fontWeight: '600', color: '#111827' }}>
                            Welcome, {student.name}
                        </h2>
                        <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>
                            Submit your payment details below
                        </p>
                    </div>
                    <button
                        onClick={logoutStudent}
                        style={{
                            fontSize: '12px', color: '#dc2626', padding: '6px 12px',
                            borderRadius: '6px', border: '1px solid #fecaca',
                            background: '#fef2f2', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                            fontWeight: '500', transition: 'all 0.15s',
                        }}
                        onMouseOver={e => { e.target.style.background = '#fee2e2'; }}
                        onMouseOut={e => { e.target.style.background = '#fef2f2'; }}
                    >
                        Sign out
                    </button>
                </div>

                {/* Info Row */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <div style={{
                        flex: 1, background: '#f9fafb', borderRadius: '8px', padding: '12px 14px',
                        border: '1px solid #f3f4f6',
                    }}>
                        <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>ID</p>
                        <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{student.studentId}</p>
                    </div>
                    <div style={{
                        flex: 1, background: '#f9fafb', borderRadius: '8px', padding: '12px 14px',
                        border: '1px solid #f3f4f6',
                    }}>
                        <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Team</p>
                        <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{student.teamName}</p>
                    </div>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: '#f3f4f6', marginBottom: '20px' }} />

                <UploadSection />
            </div>
        </div>
    );
};

export default StudentDashboard;

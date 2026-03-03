import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchHostStudents, updateStudentStatus } from '../services/api';
import toast from 'react-hot-toast';

const statusConfig = {
    pending: { label: 'Pending', color: '#ca8a04', bg: '#fefce8', border: '#fef08a' },
    verified: { label: 'Verified', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
    rejected: { label: 'Rejected', color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
};

const HostDashboard = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [expandedRow, setExpandedRow] = useState(null);
    const navigate = useNavigate();

    const hostEmail = localStorage.getItem('hostEmail') || 'Host';

    useEffect(() => {
        const isAuth = localStorage.getItem('hostAuthenticated');
        if (!isAuth) { navigate('/host-login'); return; }
        loadStudents();
    }, [navigate]);

    const loadStudents = async () => {
        try {
            setLoading(true);
            const data = await fetchHostStudents();
            if (data.success) setStudents(data.students);
        } catch (err) {
            toast.error('Failed to load students', { id: 'load-err' });
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (studentId, newStatus) => {
        setUpdatingId(studentId);
        try {
            const data = await updateStudentStatus(studentId, newStatus);
            if (data.success) {
                toast.success(`Status updated to ${newStatus}`, { id: 'status-ok' });
                setStudents((prev) =>
                    prev.map((s) => s._id === studentId ? { ...s, isApproved: newStatus } : s)
                );
            }
        } catch (err) {
            toast.error('Failed to update status', { id: 'status-err' });
        } finally {
            setUpdatingId(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('hostAuthenticated');
        localStorage.removeItem('hostEmail');
        toast.success('Logged out', { id: 'logout' });
        navigate('/host-login');
    };

    const filteredStudents = students.filter((s) => {
        if (filterStatus !== 'all' && s.isApproved !== filterStatus) return false;
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            return (
                s.name?.toLowerCase().includes(q) ||
                s.email?.toLowerCase().includes(q) ||
                s.studentId?.toLowerCase().includes(q) ||
                s.teamName?.toLowerCase().includes(q) ||
                s.utrCode?.toLowerCase().includes(q) ||
                s.phoneNumber?.toLowerCase().includes(q)
            );
        }
        return true;
    });

    const stats = {
        total: students.length,
        pending: students.filter((s) => s.isApproved === 'pending').length,
        verified: students.filter((s) => s.isApproved === 'verified').length,
        rejected: students.filter((s) => s.isApproved === 'rejected').length,
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="spinner" style={{ width: 32, height: 32, borderWidth: 3, borderColor: '#e2e8f0', borderTopColor: '#1e293b', margin: '0 auto' }}></div>
                    <p style={{ color: '#64748b', marginTop: '12px', fontSize: '13px' }}>Loading students...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f1f5f9', padding: '0' }}>

            {/* ===== TOP NAV ===== */}
            <div style={{
                background: '#ffffff', borderBottom: '1px solid #e2e8f0',
                padding: '14px 24px', display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
                position: 'sticky', top: 0, zIndex: 50,
            }}>
                <div>
                    <h1 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                        Hack-O-Holic 4.0 Payment Verification Portal
                    </h1>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: 0, marginTop: '2px' }}>
                        Logged in as <span style={{ color: '#1e293b', fontWeight: '600' }}>{hostEmail}</span>
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button onClick={loadStudents} style={{
                        padding: '7px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '500',
                        cursor: 'pointer', border: '1px solid #e2e8f0', background: '#fff',
                        color: '#475569', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
                    }}>
                        Refresh
                    </button>
                    <button onClick={handleLogout} style={{
                        padding: '7px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '500',
                        cursor: 'pointer', border: '1px solid #fecaca', background: '#fef2f2',
                        color: '#dc2626', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
                    }}>
                        Sign out
                    </button>
                </div>
            </div>

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 20px 40px' }}>

                {/* ===== STATS ===== */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                    {[
                        { label: 'Total', value: stats.total, color: '#475569', bg: '#f8fafc', border: '#e2e8f0' },
                        { label: 'Pending', value: stats.pending, color: '#ca8a04', bg: '#fefce8', border: '#fef08a' },
                        { label: 'Verified', value: stats.verified, color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
                        { label: 'Rejected', value: stats.rejected, color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
                    ].map((s) => (
                        <div key={s.label} style={{
                            background: s.bg, border: `1px solid ${s.border}`,
                            borderRadius: '10px', padding: '16px 18px',
                        }}>
                            <p style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>{s.label}</p>
                            <p style={{ fontSize: '28px', fontWeight: '700', color: s.color, margin: 0, lineHeight: 1.2, marginTop: '4px' }}>{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* ===== SEARCH ===== */}
                <div style={{
                    background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px',
                    padding: '14px 16px', marginBottom: '12px',
                }}>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Search by name, email, student ID, phone, or UTR..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ fontSize: '13px' }}
                    />
                </div>

                {/* ===== FILTER BUTTONS ===== */}
                <div style={{
                    display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap',
                }}>
                    {['all', 'pending', 'verified', 'rejected'].map((f) => {
                        const isActive = filterStatus === f;
                        const cfg = f !== 'all' ? statusConfig[f] : null;
                        return (
                            <button
                                key={f}
                                onClick={() => setFilterStatus(f)}
                                style={{
                                    padding: '8px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: '600',
                                    cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                                    transition: 'all 0.15s',
                                    background: isActive ? (cfg ? cfg.bg : '#f1f5f9') : '#fff',
                                    color: isActive ? (cfg ? cfg.color : '#1e293b') : '#64748b',
                                    border: isActive
                                        ? `1.5px solid ${cfg ? cfg.border : '#cbd5e1'}`
                                        : '1.5px solid #e2e8f0',
                                }}
                            >
                                {f === 'all' ? `All (${stats.total})` : `${cfg.label} (${stats[f]})`}
                            </button>
                        );
                    })}
                </div>

                {/* ===== TABLE ===== */}
                {filteredStudents.length === 0 ? (
                    <div style={{
                        background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px',
                        padding: '60px 20px', textAlign: 'center',
                    }}>
                        <p style={{ fontSize: '24px', marginBottom: '8px' }}>🔍</p>
                        <p style={{ color: '#475569', fontSize: '14px', fontWeight: '600' }}>No matching student found</p>
                        <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>Try a different search term or change the filter</p>
                    </div>
                ) : (
                    <div style={{
                        background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px',
                        overflow: 'hidden',
                    }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                <thead>
                                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                        <th style={thStyle}>#</th>
                                        <th style={thStyle}>Student</th>
                                        <th style={thStyle}>ID</th>
                                        <th style={thStyle}>Team</th>
                                        <th style={thStyle}>Phone</th>
                                        <th style={thStyle}>UTR</th>
                                        <th style={thStyle}>Screenshot</th>
                                        <th style={thStyle}>Status</th>
                                        <th style={{ ...thStyle, textAlign: 'center' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map((student, index) => {
                                        const cfg = statusConfig[student.isApproved] || statusConfig.pending;
                                        const isUpdating = updatingId === student._id;

                                        return (
                                            <tr
                                                key={student._id}
                                                style={{
                                                    borderBottom: '1px solid #f1f5f9',
                                                    transition: 'background 0.1s',
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = '#fafbfd'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <td style={tdStyle}>
                                                    <span style={{ color: '#64748b', fontWeight: '500', fontSize: '12px' }}>{index + 1}</span>
                                                </td>
                                                <td style={tdStyle}>
                                                    <p style={{ fontWeight: '600', color: '#1e293b', margin: 0, fontSize: '13px' }}>{student.name}</p>
                                                    <p style={{ fontSize: '11px', color: '#64748b', margin: 0, marginTop: '1px' }}>{student.email}</p>
                                                </td>
                                                <td style={tdStyle}>
                                                    <span style={{
                                                        background: '#f1f5f9', color: '#475569',
                                                        padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500',
                                                    }}>{student.studentId}</span>
                                                </td>
                                                <td style={tdStyle}>
                                                    <span style={{ color: '#334155', fontWeight: '500', fontSize: '13px' }}>{student.teamName}</span>
                                                </td>
                                                <td style={tdStyle}>
                                                    <span style={{ color: '#475569', fontSize: '12px' }}>
                                                        {student.phoneNumber || '—'}
                                                    </span>
                                                </td>
                                                <td style={tdStyle}>
                                                    {student.utrCode ? (
                                                        <span style={{
                                                            fontFamily: "'Menlo', 'Consolas', monospace",
                                                            background: '#f8fafc', color: '#475569',
                                                            padding: '3px 8px', borderRadius: '4px', fontSize: '12px',
                                                            border: '1px solid #e2e8f0',
                                                        }}>{student.utrCode}</span>
                                                    ) : (
                                                        <span style={{ color: '#94a3b8', fontSize: '11px', fontStyle: 'italic' }}>Not uploaded</span>
                                                    )}
                                                </td>
                                                <td style={tdStyle}>
                                                    {student.screenshotUrl ? (
                                                        <a
                                                            href={student.screenshotUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            style={{
                                                                color: '#3b82f6', fontSize: '12px', fontWeight: '500',
                                                                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px',
                                                            }}
                                                        >
                                                            View ↗
                                                        </a>
                                                    ) : (
                                                        <span style={{ color: '#94a3b8', fontSize: '11px', fontStyle: 'italic' }}>Not uploaded</span>
                                                    )}
                                                </td>
                                                <td style={tdStyle}>
                                                    <span style={{
                                                        background: cfg.bg, color: cfg.color,
                                                        border: `1px solid ${cfg.border}`,
                                                        padding: '3px 10px', borderRadius: '20px',
                                                        fontSize: '11px', fontWeight: '600',
                                                        textTransform: 'capitalize',
                                                    }}>
                                                        {cfg.label}
                                                    </span>
                                                </td>
                                                <td style={{ ...tdStyle, textAlign: 'center' }}>
                                                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}
                                                        onClick={(e) => e.stopPropagation()}>
                                                        {student.isApproved !== 'verified' && (
                                                            <button
                                                                onClick={() => handleStatusUpdate(student._id, 'verified')}
                                                                disabled={isUpdating}
                                                                style={{
                                                                    ...actionBtn,
                                                                    background: '#f0fdf4', color: '#16a34a',
                                                                    border: '1px solid #bbf7d0',
                                                                    opacity: isUpdating ? 0.4 : 1,
                                                                }}
                                                            >Approve</button>
                                                        )}
                                                        {student.isApproved !== 'rejected' && (
                                                            <button
                                                                onClick={() => handleStatusUpdate(student._id, 'rejected')}
                                                                disabled={isUpdating}
                                                                style={{
                                                                    ...actionBtn,
                                                                    background: '#fef2f2', color: '#dc2626',
                                                                    border: '1px solid #fecaca',
                                                                    opacity: isUpdating ? 0.4 : 1,
                                                                }}
                                                            >Reject</button>
                                                        )}
                                                        {student.isApproved !== 'pending' && (
                                                            <button
                                                                onClick={() => handleStatusUpdate(student._id, 'pending')}
                                                                disabled={isUpdating}
                                                                style={{
                                                                    ...actionBtn,
                                                                    background: '#fefce8', color: '#ca8a04',
                                                                    border: '1px solid #fef08a',
                                                                    opacity: isUpdating ? 0.4 : 1,
                                                                }}
                                                            >Pending</button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer */}
                        <div style={{
                            padding: '10px 16px', borderTop: '1px solid #f1f5f9',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                                Showing {filteredStudents.length} of {students.length} students
                            </p>
                            <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>
                                Sorted: Pending → Verified → Rejected
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const thStyle = {
    padding: '10px 14px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#64748b',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
};

const tdStyle = {
    padding: '12px 14px',
    verticalAlign: 'middle',
};

const actionBtn = {
    padding: '4px 10px',
    borderRadius: '5px',
    fontSize: '11px',
    fontWeight: '500',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.15s',
};

export default HostDashboard;

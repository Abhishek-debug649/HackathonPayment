import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTeams, updateMemberAttendance } from '../services/api';
import toast from 'react-hot-toast';
import BrandedFooter from './BrandedFooter';

const AttendanceDashboard = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingKey, setUpdatingKey] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isAuth = localStorage.getItem('hostAuthenticated');
        if (!isAuth) { navigate('/host-login'); return; }
        loadTeams();
    }, [navigate]);

    const loadTeams = async () => {
        try {
            setLoading(true);
            const data = await fetchTeams();
            if (data.success) setTeams(data.teams);
        } catch (err) {
            toast.error('Failed to load teams', { id: 'load-teams-err' });
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAttendance = async (teamId, memberIndex, currentStatus) => {
        const key = `${teamId}-${memberIndex}`;
        setUpdatingKey(key);
        try {
            const data = await updateMemberAttendance(teamId, memberIndex, !currentStatus);
            if (data.success) {
                toast.success(data.message, { id: 'attend-ok' });
                setTeams((prev) =>
                    prev.map((t) =>
                        t._id === teamId
                            ? {
                                ...t,
                                members: t.members.map((m, i) =>
                                    i === memberIndex ? { ...m, isPresent: !currentStatus } : m
                                ),
                            }
                            : t
                    )
                );
            }
        } catch (err) {
            toast.error('Failed to update attendance', { id: 'attend-err' });
        } finally {
            setUpdatingKey(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('hostAuthenticated');
        localStorage.removeItem('hostEmail');
        toast.success('Logged out', { id: 'logout' });
        navigate('/host-login');
    };

    // Filter teams: if any member (or team name) matches, show the entire team
    const filteredTeams = teams.filter((team) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        if (team.teamName?.toLowerCase().includes(q)) return true;
        if (String(team.serialNumber).includes(q)) return true;
        return team.members.some(
            (m) =>
                m.name?.toLowerCase().includes(q) ||
                m.email?.toLowerCase().includes(q) ||
                m.studentId?.toLowerCase().includes(q) ||
                String(m.phoneNumber || '').includes(q)
        );
    });

    // Compute stats from all teams (not filtered)
    const stats = {
        totalTeams: teams.length,
        totalMembers: teams.reduce((acc, t) => acc + t.members.length, 0),
        present: teams.reduce((acc, t) => acc + t.members.filter((m) => m.isPresent).length, 0),
        absent: teams.reduce((acc, t) => acc + t.members.filter((m) => !m.isPresent).length, 0),
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="spinner" style={{ width: 32, height: 32, borderWidth: 3, borderColor: '#e2e8f0', borderTopColor: '#1e293b', margin: '0 auto' }}></div>
                    <p style={{ color: '#64748b', marginTop: '12px', fontSize: '13px' }}>Loading teams...</p>
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
                        Attendance Management
                    </h1>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: 0, marginTop: '2px' }}>
                        Hack-O-Holic 4.0 · Track team attendance
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button onClick={() => navigate('/host-dashboard')} style={{
                        padding: '7px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '500',
                        cursor: 'pointer', border: '1px solid #c7d2fe', background: '#eef2ff',
                        color: '#4f46e5', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
                    }}>
                        ← Dashboard
                    </button>
                    <button onClick={loadTeams} style={{
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
                        { label: 'Teams', value: stats.totalTeams, color: '#4f46e5', bg: '#eef2ff', border: '#c7d2fe' },
                        { label: 'Total Members', value: stats.totalMembers, color: '#475569', bg: '#f8fafc', border: '#e2e8f0' },
                        { label: 'Present', value: stats.present, color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
                        { label: 'Absent', value: stats.absent, color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
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
                    padding: '14px 16px', marginBottom: '20px',
                }}>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Search by team name, member name, student ID, phone, or serial number..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ fontSize: '13px' }}
                    />
                </div>

                {/* ===== TEAMS ===== */}
                {filteredTeams.length === 0 ? (
                    <div style={{
                        background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px',
                        padding: '60px 20px', textAlign: 'center',
                    }}>
                        <p style={{ fontSize: '24px', marginBottom: '8px' }}>🔍</p>
                        <p style={{ color: '#475569', fontSize: '14px', fontWeight: '600' }}>No matching team found</p>
                        <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>Try a different search term</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {filteredTeams.map((team) => {
                            const presentCount = team.members.filter((m) => m.isPresent).length;
                            const totalCount = team.members.length;

                            return (
                                <div key={team._id} style={{
                                    background: '#fff', border: '1px solid #e2e8f0',
                                    borderRadius: '12px', overflow: 'hidden',
                                }}>
                                    {/* Team Header */}
                                    <div style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '16px 20px', borderBottom: '1px solid #f1f5f9',
                                        background: '#f8fafc',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{
                                                background: '#4f46e5', color: '#fff',
                                                width: '32px', height: '32px', borderRadius: '8px',
                                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '13px', fontWeight: '700', flexShrink: 0,
                                            }}>
                                                {team.serialNumber}
                                            </span>
                                            <div>
                                                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a', margin: 0 }}>
                                                    {team.teamName}
                                                </h3>
                                                <p style={{ fontSize: '11px', color: '#64748b', margin: 0, marginTop: '2px' }}>
                                                    {totalCount} member{totalCount !== 1 ? 's' : ''}
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: '8px',
                                        }}>
                                            <span style={{
                                                fontSize: '12px', fontWeight: '600',
                                                color: presentCount === totalCount ? '#16a34a' : presentCount > 0 ? '#ca8a04' : '#dc2626',
                                                background: presentCount === totalCount ? '#f0fdf4' : presentCount > 0 ? '#fefce8' : '#fef2f2',
                                                border: `1px solid ${presentCount === totalCount ? '#bbf7d0' : presentCount > 0 ? '#fef08a' : '#fecaca'}`,
                                                padding: '4px 12px', borderRadius: '20px',
                                            }}>
                                                {presentCount}/{totalCount} present
                                            </span>
                                        </div>
                                    </div>

                                    {/* Members Table */}
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                            <thead>
                                                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                    <th style={thStyle}></th>
                                                    <th style={thStyle}>Name</th>
                                                    <th style={thStyle}>Student ID</th>
                                                    <th style={thStyle}>Phone</th>
                                                    <th style={thStyle}>Email</th>
                                                    <th style={{ ...thStyle, textAlign: 'center' }}>Attendance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {team.members.map((member, idx) => {
                                                    const key = `${team._id}-${idx}`;
                                                    const isUpdating = updatingKey === key;

                                                    return (
                                                        <tr
                                                            key={idx}
                                                            style={{
                                                                borderBottom: idx < team.members.length - 1 ? '1px solid #f8fafc' : 'none',
                                                                transition: 'background 0.1s',
                                                            }}
                                                            onMouseEnter={(e) => e.currentTarget.style.background = '#fafbfd'}
                                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                                        >
                                                            <td style={tdStyle}>
                                                                {member.isLeader ? (
                                                                    <span title="Team Leader" style={{
                                                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                                                        width: '24px', height: '24px', borderRadius: '50%',
                                                                        background: '#fef3c7', fontSize: '14px',
                                                                    }}>
                                                                        👑
                                                                    </span>
                                                                ) : (
                                                                    <span style={{
                                                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                                                        width: '24px', height: '24px', borderRadius: '50%',
                                                                        background: '#f1f5f9', color: '#64748b', fontSize: '11px', fontWeight: '600',
                                                                    }}>
                                                                        {idx + 1}
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td style={tdStyle}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                    <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '13px' }}>
                                                                        {member.name}
                                                                    </span>
                                                                    {member.isLeader && (
                                                                        <span style={{
                                                                            fontSize: '10px', fontWeight: '600', color: '#b45309',
                                                                            background: '#fef3c7', padding: '1px 6px', borderRadius: '4px',
                                                                            border: '1px solid #fde68a',
                                                                        }}>
                                                                            LEADER
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td style={tdStyle}>
                                                                <span style={{
                                                                    background: '#f1f5f9', color: '#475569',
                                                                    padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500',
                                                                }}>
                                                                    {member.studentId}
                                                                </span>
                                                            </td>
                                                            <td style={tdStyle}>
                                                                <span style={{ color: '#475569', fontSize: '12px' }}>
                                                                    {member.phoneNumber || '—'}
                                                                </span>
                                                            </td>
                                                            <td style={tdStyle}>
                                                                <span style={{ color: '#64748b', fontSize: '12px' }}>
                                                                    {member.email}
                                                                </span>
                                                            </td>
                                                            <td style={{ ...tdStyle, textAlign: 'center' }}>
                                                                <button
                                                                    onClick={() => handleToggleAttendance(team._id, idx, member.isPresent)}
                                                                    disabled={isUpdating}
                                                                    style={{
                                                                        padding: '5px 14px', borderRadius: '6px', fontSize: '11px',
                                                                        fontWeight: '600', cursor: isUpdating ? 'not-allowed' : 'pointer',
                                                                        fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
                                                                        border: `1px solid ${member.isPresent ? '#bbf7d0' : '#fecaca'}`,
                                                                        background: member.isPresent ? '#f0fdf4' : '#fef2f2',
                                                                        color: member.isPresent ? '#16a34a' : '#dc2626',
                                                                        opacity: isUpdating ? 0.5 : 1,
                                                                        minWidth: '80px',
                                                                    }}
                                                                >
                                                                    {isUpdating ? '...' : member.isPresent ? '✓ Present' : '✗ Absent'}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Footer count */}
                {filteredTeams.length > 0 && (
                    <div style={{
                        marginTop: '16px', padding: '10px 16px',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                            Showing {filteredTeams.length} of {teams.length} teams
                        </p>
                        <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>
                            Sorted by serial number
                        </p>
                    </div>
                )}
            </div>
            <BrandedFooter />
        </div>
    );
};

const thStyle = {
    padding: '8px 14px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#64748b',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
};

const tdStyle = {
    padding: '10px 14px',
    verticalAlign: 'middle',
};

export default AttendanceDashboard;

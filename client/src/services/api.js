import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Verify student using email and unique code
export const verifyStudent = async (email, uniqueCode) => {
    const response = await api.post('/api/verify', { email, uniqueCode });
    return response.data;
};

// Submit payment with screenshot and UTR
export const submitPayment = async (email, uniqueCode, utr, screenshotFile) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('uniqueCode', uniqueCode);
    formData.append('utr', utr);
    formData.append('screenshot', screenshotFile);

    const response = await api.post('/api/submit-payment', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

// ==================== HOST APIs ====================

// Host login
export const hostLogin = async (email, password) => {
    const response = await api.post('/api/host-login', { email, password });
    return response.data;
};

// Fetch all students (host dashboard)
export const fetchHostStudents = async () => {
    const response = await api.get('/api/host/students');
    return response.data;
};

// Update student approval status
export const updateStudentStatus = async (studentId, status) => {
    const response = await api.put(`/api/host/student/${studentId}/status`, { status });
    return response.data;
};

// ==================== ATTENDANCE APIs ====================

// Fetch all teams sorted by serial number
export const fetchTeams = async () => {
    const response = await api.get('/api/host/teams');
    return response.data;
};

// Update a member's attendance status
export const updateMemberAttendance = async (teamId, memberIndex, isPresent) => {
    const response = await api.put(`/api/host/team/${teamId}/member/${memberIndex}/attendance`, { isPresent });
    return response.data;
};

// Fetch attendance summary stats
export const fetchAttendanceStats = async () => {
    const response = await api.get('/api/host/teams/stats');
    return response.data;
};

export default api;

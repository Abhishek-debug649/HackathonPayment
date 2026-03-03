import { createContext, useContext, useState, useEffect } from 'react';

const StudentContext = createContext(null);

export const useStudent = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
    const [student, setStudent] = useState(() => {
        try {
            const saved = localStorage.getItem('hackoholic_student');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (student) {
            localStorage.setItem('hackoholic_student', JSON.stringify(student));
        } else {
            localStorage.removeItem('hackoholic_student');
        }
    }, [student]);

    const loginStudent = (studentData) => {
        setStudent(studentData);
    };

    const markPaymentDone = () => {
        setStudent((prev) => ({ ...prev, paymentSubmitted: true }));
    };

    const logoutStudent = () => {
        setStudent(null);
    };

    return (
        <StudentContext.Provider value={{ student, loginStudent, markPaymentDone, logoutStudent }}>
            {children}
        </StudentContext.Provider>
    );
};

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { StudentProvider } from './context/StudentContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <StudentProvider>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#ffffff',
                        color: '#111827',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    },
                    success: {
                        iconTheme: { primary: '#16a34a', secondary: '#ffffff' },
                    },
                    error: {
                        iconTheme: { primary: '#dc2626', secondary: '#ffffff' },
                    },
                }}
            />
            <App />
        </StudentProvider>
    </React.StrictMode>,
)

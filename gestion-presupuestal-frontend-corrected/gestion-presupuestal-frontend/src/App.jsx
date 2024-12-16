import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ActivitiesPanel from './pages/ActivitiesPanel';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <Router>
            <Routes>
                {/* Redirige al Login al iniciar */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Rutas de acceso libre */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/departments/:departmentId/activities" element={<ActivitiesPanel />} />

                {/* Rutas de Login y Registro */}
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<Register />} />

                {/* Ruta 404 */}
                <Route
                    path="*"
                    element={<h1 style={{ textAlign: 'center', marginTop: '20px' }}>404 - Página no encontrada</h1>}
                />
            </Routes>
        </Router>
    );
};

export default App;

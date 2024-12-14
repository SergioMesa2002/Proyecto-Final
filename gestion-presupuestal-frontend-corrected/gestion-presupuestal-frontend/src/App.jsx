import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token'); // Verifica si hay un token almacenado

    return (
        <Router>
            <Routes>
                {/* Redirigir a Login si no está autenticado */}
                <Route
                    path="/"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Ruta protegida: solo muestra Dashboard si está autenticado */}
                <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;

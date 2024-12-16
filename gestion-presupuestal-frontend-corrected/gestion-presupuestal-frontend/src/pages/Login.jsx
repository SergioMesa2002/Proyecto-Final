import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import '../styles/login.css'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response.token);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-login-gradient from-login-bg-light via-login-gradient-start to-login-gradient-end">
      <div className="bg-white shadow-login-card rounded-login-card max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-login-primary mb-4 text-center">
          Bienvenido de nuevo
        </h1>
        <p className="text-login-text-light text-center mb-6">
          Ingresa tus credenciales para continuar.
        </p>

        {errorMessage && (
          <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-lg mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-login-text-light">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@correo.com"
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-login-input shadow-sm focus:outline-none focus:ring-2 focus:ring-login-primary focus:border-login-primary transition-login"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-login-text-light">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-login-input shadow-sm focus:outline-none focus:ring-2 focus:ring-login-primary focus:border-login-primary transition-login"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-login-primary text-white rounded-login-button shadow-login-button hover:bg-login-primary-light hover:shadow-login-button-hover transition-login transform hover:-translate-y-1"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-login-text-light">
          ¿No tienes una cuenta?{' '}
          <a
            href="/register"
            className="text-login-secondary font-medium hover:text-login-primary-light hover:underline transition-login"
          >
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
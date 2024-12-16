import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Iniciando sesión con los datos:', formData);

      const response = await loginUser(formData);

      // Guardar el token
      localStorage.setItem('token', response.token);
      console.log('Token guardado:', response.token);

      setIsAuthenticated(true); // Actualizar el estado global de autenticación
      navigate('/dashboard', { replace: true }); // Redirigir al Dashboard
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage(error.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
      <div>
        <h1>Iniciar Sesión</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Correo Electrónico:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Contraseña:
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </label>
          <br />
          <button type="submit">Ingresar</button>
        </form>
        <p>
          ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
  );
};

export default Login;

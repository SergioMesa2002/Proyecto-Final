import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response.token); // Guarda el token en el almacenamiento local
      navigate('/dashboard'); // Redirige al Dashboard
    } catch (error) {
      alert(error.response.data.error || 'Error al iniciar sesión');
    }
  };

  return (
      <div>
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Correo Electrónico:
            <input type="email" name="email" onChange={handleChange} required />
          </label>
          <br />
          <label>
            Contraseña:
            <input type="password" name="password" onChange={handleChange} required />
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

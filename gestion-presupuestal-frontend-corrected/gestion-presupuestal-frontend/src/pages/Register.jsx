import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            alert('Usuario registrado con éxito');
            navigate('/login'); // Redirige a Login después de registrarse
        } catch (error) {
            alert(error.response.data.error || 'Error al registrar usuario');
        }
    };

    return (
        <div>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" name="name" onChange={handleChange} required />
                </label>
                <br />
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
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;

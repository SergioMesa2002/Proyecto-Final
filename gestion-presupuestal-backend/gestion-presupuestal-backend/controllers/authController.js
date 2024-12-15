const User = require('../models/User'); // Modelo de usuario
const bcrypt = require('bcrypt'); // Para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Para generar tokens
require('dotenv').config(); // Para acceder a variables de entorno

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado con éxito.', userId: newUser._id });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// Iniciar sesión
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
        }

        // Generar un token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Inicio de sesión exitoso.', token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

module.exports = { registerUser, loginUser };

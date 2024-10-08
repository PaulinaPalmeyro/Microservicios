// src/controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'El nombre de usuario ya existe.' });
        }

        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'Usuario registrado con éxito.' });
    } catch (error) {
        console.error('Error registrando usuario:', error);
        res.status(500).json({ error: 'Error registrando el usuario.' });
    }
};

// Iniciar sesión
const login = async (req, res) => {
    console.log('Datos recibidos para login:', req.body);
    try {
        const { username, password } = req.body;

        // Buscar el usuario por nombre de usuario
        const user = await User.findOne({ username });
        if (!user) {
            console.log('Usuario no encontrado:', username);
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        // Comparar la contraseña proporcionada con la almacenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta.' });
        }

        // Generar el token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.json({ token });
    } catch (error) {
        console.error('Error iniciando sesión:', error);
        res.status(500).json({ error: 'Error iniciando sesión.' });
    }
};


module.exports = { register, login };

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config();

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const [users] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

        if (users.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const user = users[0];

        // Check password (In production, use bcrypt.compare)
        let isMatch = false;
        if (user.password_hash.startsWith('$2a$')) {
            isMatch = await bcrypt.compare(password, user.password_hash);
        } else {
            isMatch = (password === user.password_hash);
        }

        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        if (!user.active) {
            return res.status(403).json({ message: 'Usuario inactivo. Contacte al administrador.' });
        }

        // Create Token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const getMe = async (req, res) => {
    // Middleware should attach user to req
    res.json(req.user);
};

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

// Datos de usuario simulados
const mockUser = {
  username: 'usuarioEjemplo',
  password: 'passwordSeguro'
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Valida las credenciales
  if (username === mockUser.username && password === mockUser.password) {
    // Genera un token JWT
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ success: true, token });
  } else {
    return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
  }
});

module.exports = router;

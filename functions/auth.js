const jwt = require('jsonwebtoken'); // Necesitarás instalar jsonwebtoken para emitir tokens
require('dotenv').config();

// Simulación de datos de usuario (en producción, deberías validar contra una base de datos)
const mockUser = {
  username: 'usuarioEjemplo',
  password: 'passwordSeguro'
};

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: 'OK',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Método no permitido' }),
    };
  }

  try {
    const { username, password } = JSON.parse(event.body);

    // Valida las credenciales
    if (username === mockUser.username && password === mockUser.password) {
      // Genera un token JWT
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, token }),
      };
    } else {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ success: false, message: 'Credenciales incorrectas' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

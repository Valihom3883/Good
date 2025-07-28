const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const pool = new Pool({
  host: 'db',
  user: 'user',
  password: 'password',
  database: 'ecommerce',
});

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get('/products', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE tenant_id = $1', [req.user.tenantId]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/products', authenticateToken, async (req, res) => {
  const { name, description, category_id } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Product name is required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO products (tenant_id, name, description, category_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.tenantId, name, description, category_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Product service listening at http://localhost:${port}`);
});

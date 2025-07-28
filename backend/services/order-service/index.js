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

app.get('/orders', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders WHERE tenant_id = $1', [req.user.tenantId]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/orders', authenticateToken, async (req, res) => {
  const { line_items } = req.body;

  if (!line_items || !Array.isArray(line_items) || line_items.length === 0) {
    return res.status(400).json({ error: 'Line items are required' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    let total = 0;
    for (const item of line_items) {
      total += item.price * item.quantity;
    }

    const orderResult = await client.query(
      'INSERT INTO orders (tenant_id, user_id, total) VALUES ($1, $2, $3) RETURNING *',
      [req.user.tenantId, req.user.userId, total]
    );
    const order = orderResult.rows[0];

    for (const item of line_items) {
      await client.query(
        'INSERT INTO line_items (order_id, tenant_id, product_id, quantity, price) VALUES ($1, $2, $3, $4, $5)',
        [order.id, req.user.tenantId, item.product_id, item.quantity, item.price]
      );
    }

    await client.query('COMMIT');

    res.status(201).json(order);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Order service listening at http://localhost:${port}`);
});

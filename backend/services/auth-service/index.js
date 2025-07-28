const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
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

app.post('/register', async (req, res) => {
  const { tenantName, email, password } = req.body;

  if (!tenantName || !email || !password) {
    return res.status(400).json({ error: 'Tenant name, email, and password are required' });
  }

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const tenantResult = await client.query('INSERT INTO tenants (name) VALUES ($1) RETURNING id', [tenantName]);
      const tenantId = tenantResult.rows[0].id;

      const passwordHash = await bcrypt.hash(password, 10);

      const userResult = await client.query(
        'INSERT INTO users (tenant_id, email, password_hash) VALUES ($1, $2, $3) RETURNING id, email, role',
        [tenantId, email, passwordHash]
      );

      await client.query('COMMIT');

      res.status(201).json(userResult.rows[0]);
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, tenantId: user.tenant_id, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, role FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const port = 5000;
app.listen(port, () => {
  console.log(`Auth service listening at http://localhost:${port}`);
});

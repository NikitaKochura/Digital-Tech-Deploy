import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbQuery, dbRun } from './db.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const JWT_SECRET = 'digital-tech-coursework-secret';

// User Analytics Tracking Middleware (For "перешедшие" users)
app.use(async (req, res, next) => {
  if (req.method === 'GET' && req.path === '/api/products') {
     const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
     await dbRun(`INSERT INTO visitors (ip, user_agent) VALUES (?, ?)`, [ip, req.headers['user-agent']]);
  }
  next();
});

// --- AUTH API ---
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await dbRun('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashed]);
    const token = jwt.sign({ id: result.lastID, email, name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: result.lastID, name, email } });
  } catch (err) {
    if (err.message.includes('UNIQUE')) return res.status(400).json({ error: 'Пользователь уже существует' });
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await dbQuery('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(400).json({ error: 'Пользователь не найден' });
    
    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Неверный пароль' });
    
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- PRODUCTS API ---
app.get('/api/products', async (req, res) => {
  try {
    const rows = await dbQuery('SELECT * FROM products');
    // Decode JSON strings for frontend usage
    const parsed = rows.map(r => ({
      ...r, 
      inStock: Boolean(r.inStock),
      specs: JSON.parse(r.specs || '{}'),
      images: JSON.parse(r.images || '[]')
    }));
    res.json(parsed);
  } catch(err) { res.status(500).json({ error: err.message }); }
});

// Admin endpoint to sync/override DB array efficiently
app.post('/api/products/sync', async (req, res) => {
  const products = req.body;
  try {
    await dbRun('DELETE FROM products');
    const stmt = "INSERT INTO products (id, name, category, brand, price, description, inStock, specs, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    for (const p of products) {
       await dbRun(stmt, [p.id, p.name, p.category, p.brand, Number(p.price) || 0, p.description, p.inStock ? 1 : 0, JSON.stringify(p.specs), JSON.stringify(p.images)]);
    }
    res.json({ success: true });
  } catch(err) { res.status(500).json({ error: err.message }); }
});

// Analytics (For coursework stats)
app.get('/api/admin/analytics', async (req, res) => {
  try {
    const visitors = await dbQuery('SELECT * FROM visitors ORDER BY visited_at DESC');
    res.json({ visitorsCount: visitors.length, visitors });
  } catch(err) { res.status(500).json({ error: err.message }); }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Backend Express API starts on http://localhost:${PORT}`));

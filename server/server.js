import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { dbQuery, dbRun } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const JWT_SECRET = 'digital-tech-coursework-secret';

// User Analytics Tracking Middleware
app.use(async (req, res, next) => {
  if (req.method === 'GET' && req.path === '/api/products') {
     const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
     try {
       await dbRun(`INSERT INTO visitors (ip, user_agent) VALUES (?, ?)`, [ip, req.headers['user-agent']]);
     } catch(e) { /* ignore analytics errors */ }
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

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const rows = await dbQuery('SELECT * FROM products ORDER BY id DESC');
    const parsed = rows.map(r => ({
      ...r, 
      inStock: Boolean(r.inStock),
      specs: JSON.parse(r.specs || '{}'),
      images: JSON.parse(r.images || '[]')
    }));
    res.json(parsed);
  } catch(err) { res.status(500).json({ error: err.message }); }
});

// GET single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const rows = await dbQuery('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Товар не найден' });
    const r = rows[0];
    res.json({
      ...r,
      inStock: Boolean(r.inStock),
      specs: JSON.parse(r.specs || '{}'),
      images: JSON.parse(r.images || '[]')
    });
  } catch(err) { res.status(500).json({ error: err.message }); }
});

// POST — add single product
app.post('/api/products', async (req, res) => {
  const p = req.body;
  try {
    const result = await dbRun(
      `INSERT INTO products (name, category, brand, price, description, inStock, specs, images) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [p.name, p.category, p.brand, Number(p.price) || 0, p.description, p.inStock ? 1 : 0, 
       JSON.stringify(p.specs || {}), JSON.stringify(p.images || [])]
    );
    res.json({ success: true, id: result.lastID });
  } catch(err) { 
    console.error('POST /api/products error:', err);
    res.status(500).json({ error: err.message }); 
  }
});

// PUT — update single product
app.put('/api/products/:id', async (req, res) => {
  const p = req.body;
  try {
    await dbRun(
      `UPDATE products SET name=?, category=?, brand=?, price=?, description=?, inStock=?, specs=?, images=? WHERE id=?`,
      [p.name, p.category, p.brand, Number(p.price) || 0, p.description, p.inStock ? 1 : 0,
       JSON.stringify(p.specs || {}), JSON.stringify(p.images || []), req.params.id]
    );
    res.json({ success: true });
  } catch(err) { 
    console.error('PUT /api/products/:id error:', err);
    res.status(500).json({ error: err.message }); 
  }
});

// DELETE — remove single product
app.delete('/api/products/:id', async (req, res) => {
  try {
    await dbRun('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch(err) { 
    console.error('DELETE /api/products/:id error:', err);
    res.status(500).json({ error: err.message }); 
  }
});

// LEGACY sync endpoint (kept for backward compat but not recommended)
app.post('/api/products/sync', async (req, res) => {
  const products = req.body;
  try {
    await dbRun('DELETE FROM products');
    const stmt = "INSERT INTO products (name, category, brand, price, description, inStock, specs, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    for (const p of products) {
       await dbRun(stmt, [p.name, p.category, p.brand, Number(p.price) || 0, p.description, p.inStock ? 1 : 0, JSON.stringify(p.specs || {}), JSON.stringify(p.images || [])]);
    }
    res.json({ success: true });
  } catch(err) { res.status(500).json({ error: err.message }); }
});

// Analytics
app.get('/api/admin/analytics', async (req, res) => {
  try {
    const visitors = await dbQuery('SELECT * FROM visitors ORDER BY visited_at DESC');
    res.json({ visitorsCount: visitors.length, visitors });
  } catch(err) { res.status(500).json({ error: err.message }); }
});

// --- SERVE STATIC FRONTEND (PRODUCTION) ---
// In production, Express serves the Vite-built dist folder
const distPath = path.resolve(__dirname, '..', 'dist');
app.use(express.static(distPath));

// SPA fallback — all non-API routes return index.html
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'));
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Backend + Static on http://localhost:${PORT}`));

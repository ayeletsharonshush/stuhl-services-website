import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, saveEstimateRequest } from './db.js';
import { sendNotificationEmail } from './email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.NODE_ENV === 'production' ? 5000 : 3001;

app.use(cors());
app.use(express.json());

app.post('/api/estimate', async (req, res) => {
  try {
    const { name, email, phone, projectType, message } = req.body;

    if (!name || !email || !projectType || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const saved = await saveEstimateRequest({ name, email, phone, projectType, message });

    sendNotificationEmail({ name, email, phone, projectType, message }).catch(err => {
      console.error('Email notification failed:', err.message);
    });

    res.json({ success: true, id: saved.id });
  } catch (err: any) {
    console.error('Error saving estimate request:', err);
    res.status(500).json({ error: 'Failed to save estimate request' });
  }
});

app.get('/api/estimates', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM estimate_requests ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err: any) {
    console.error('Error fetching estimates:', err);
    res.status(500).json({ error: 'Failed to fetch estimates' });
  }
});

const distPath = path.resolve(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('/{*path}', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

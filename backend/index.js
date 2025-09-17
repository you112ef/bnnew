const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database setup
const dbPath = process.env.DATABASE_PATH || './dish_agent.db';
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS analyses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT,
      result TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Dish Agent Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

app.post('/api/analyze', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  // Load ML model
  const mobilenet = require('@tensorflow-models/mobilenet');
  const tfnode = require('@tensorflow/tfjs-node');
  const sharp = require('sharp');

  // Preprocess image
  const imageBuffer = await sharp(req.file.path)
    .resize(224, 224)
    .toBuffer();
  const tfimage = tfnode.node.decodeImage(imageBuffer);

  // Load model and classify
  const model = await mobilenet.load();
  const predictions = await model.classify(tfimage);

  // Mock medical mapping (for demo)
  const topPrediction = predictions[0];
  const medicalDiagnosis = topPrediction.className.includes('normal') ? 'Normal' : 'Potential Abnormality';

  const result = {
    diagnosis: medicalDiagnosis,
    confidence: topPrediction.probability,
    details: `Detected: ${topPrediction.className}`,
    timestamp: new Date().toISOString()
  };

  // Save to database
  db.run(`INSERT INTO analyses (filename, result) VALUES (?, ?)`,
    [req.file.filename, JSON.stringify(result)], function(err) {
      if (err) {
        console.error('Error saving to database:', err);
        return res.status(500).json({ error: 'Failed to save analysis' });
      }
      res.json({
        id: this.lastID,
        filename: req.file.filename,
        ...result
      });
    });
});

app.get('/api/analyses', (req, res) => {
  db.all(`SELECT * FROM analyses ORDER BY timestamp DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch analyses' });
    }
    res.json(rows.map(row => ({
      ...row,
      result: JSON.parse(row.result)
    })));
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong!' 
      : err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Dish Agent Backend server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`CORS origin: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});
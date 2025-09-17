const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock data for sandbox environment
const mockAnalyses = [
  {
    id: 1,
    filename: 'sample-xray.jpg',
    result: {
      diagnosis: 'Normal',
      confidence: 0.92,
      details: 'No abnormalities detected in the chest X-ray.',
      timestamp: new Date().toISOString()
    }
  },
  {
    id: 2,
    filename: 'sample-mri.jpg',
    result: {
      diagnosis: 'Mild Inflammation',
      confidence: 0.78,
      details: 'Possible inflammation detected in the soft tissues.',
      timestamp: new Date().toISOString()
    }
  }
];

// Sandbox API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Dish Agent Sandbox is running' });
});

app.get('/api/analyses', (req, res) => {
  res.json(mockAnalyses);
});

app.get('/api/analysis/:id', (req, res) => {
  const analysis = mockAnalyses.find(a => a.id === parseInt(req.params.id));
  if (!analysis) {
    return res.status(404).json({ error: 'Analysis not found' });
  }
  res.json(analysis);
});

app.post('/api/mock-analysis', (req, res) => {
  const { filename, diagnosis, confidence } = req.body;
  
  if (!filename || !diagnosis || !confidence) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newAnalysis = {
    id: mockAnalyses.length + 1,
    filename,
    result: {
      diagnosis,
      confidence: parseFloat(confidence),
      details: 'This is a mock analysis result from the sandbox environment.',
      timestamp: new Date().toISOString()
    }
  };

  mockAnalyses.push(newAnalysis);
  res.status(201).json(newAnalysis);
});

// Serve sandbox UI
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Dish Agent Sandbox server running on port ${PORT}`);
  console.log(`Sandbox UI: http://localhost:${PORT}`);
});
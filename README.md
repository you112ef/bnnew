# Dish Agent - Medical Image Analysis Platform

A comprehensive AI-powered platform for medical image analysis with intelligent agents, SDK, CLI tools, and sandbox environment.

## Architecture Overview

Dish Agent is a full-stack platform designed for medical image analysis with the following components:

### 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │     Database    │
│   (React/Vite)  │◄──►│   (Node.js)     │◄──►│   (SQLite)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│      SDK        │    │   Agent CLI     │    │    Sandbox      │
│   (Node.js)     │    │   (Terminal)    │    │  (Environment)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
dish-agent/
├── frontend/          # React/Vite frontend application
├── backend/           # Node.js Express backend API
├── sdk/              # SDK for integration with external applications
├── agent-cli/        # Command-line interface for agent interaction
├── sandbox/          # Sandbox environment for testing
└── README.md         # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd dish-agent
```

2. Install dependencies for all components
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

# SDK
cd ../sdk
npm install

# Agent CLI
cd ../agent-cli
npm install

# Sandbox
cd ../sandbox
npm install
```

## 🖥️ Frontend

The frontend is a React/Vite application with a modern UI built with Tailwind CSS and ShadCN UI components.

### Features
- Medical image upload interface
- Analysis results display
- Interactive dashboard
- Responsive design

### Running the Frontend
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🔄 Backend

The backend is a Node.js Express server that handles API requests, file uploads, and database operations.

### Features
- RESTful API for medical image analysis
- File upload handling with Multer
- SQLite database for data persistence
- Agent session management

### API Endpoints
- `GET /api/health` - Health check
- `POST /api/analyze` - Upload and analyze medical image
- `GET /api/analyses` - Get all analyses
- `POST /api/agent/create` - Create agent session
- `POST /api/agent/command` - Send command to agent

### Running the Backend
```bash
cd backend
npm start
```

The backend will be available at `http://localhost:3001`

## 🔧 SDK

The SDK provides a convenient way to integrate Dish Agent functionality into external applications.

### Features
- Easy-to-use JavaScript client
- Promise-based API
- Comprehensive error handling
- Agent session management

### Usage Example
```javascript
const DishAgentSDK = require('./sdk');

const sdk = new DishAgentSDK('http://localhost:3001');

// Check health
const health = await sdk.healthCheck();

// Analyze image
const result = await sdk.analyzeImage('/path/to/image.jpg');

// Create agent session
const session = await sdk.createAgent();
```

## 💻 Agent CLI

The Agent CLI provides a command-line interface for interacting with the Dish Agent.

### Features
- Interactive terminal interface
- Agent session management
- Image analysis commands
- Command history
- Built-in help system

### Commands
- `help` - Show help message
- `health` - Check backend health
- `analyze <path>` - Analyze medical image
- `history` - Show analysis history
- `create` - Create new agent session
- `session <id>` - Switch to agent session
- `clear` - Clear screen
- `exit` - Exit CLI

### Running the CLI
```bash
cd agent-cli
npm start
```

### Making CLI Globally Available
```bash
cd agent-cli
npm link
```

## 🧪 Sandbox

The sandbox provides a safe environment for testing and exploring the Dish Agent API without affecting production data.

### Features
- Mock API endpoints
- Sample medical image data
- Interactive web interface
- API testing tools

### Running the Sandbox
```bash
cd sandbox
npm start
```

The sandbox will be available at `http://localhost:3002`

## 🗄️ Database

The platform uses SQLite as the default database for simplicity and ease of deployment.

### Database Schema
```sql
CREATE TABLE analyses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT,
  result TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Deployment

The Dish Agent platform is ready for production deployment using modern hosting services.

### Quick Deployment

1. **Automated Script**: Run the deployment helper
   ```bash
   ./deploy.sh
   ```

2. **Manual Deployment**: Follow the detailed guide
   ```bash
   # See DEPLOYMENT.md for complete instructions
   ```

### Hosting Recommendations

- **Frontend**: Vercel (recommended) or Netlify
- **Backend**: Heroku, Railway, or DigitalOcean App Platform
- **Database**: SQLite (included) or PostgreSQL for production
- **File Storage**: Local storage or AWS S3/Cloudinary

### Environment Variables

Set these environment variables for production:

**Backend (Heroku)**:
```env
NODE_ENV=production
PORT=
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Frontend (Vercel)**:
```env
VITE_API_URL=https://your-backend-url.herokuapp.com
```

For complete deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 🔧 Configuration

### Development Environment Variables

#### Backend
- `PORT` - Backend server port (default: 3001)
- `DATABASE_URL` - Database connection string

#### Sandbox
- `PORT` - Sandbox server port (default: 3002)

### Development Mode
For development, you can run all components simultaneously using the following commands:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Terminal 3 - Sandbox
cd sandbox
npm run dev
```

## 🌟 Features

### Core Features
- **Medical Image Analysis**: AI-powered analysis of medical images
- **Agent System**: Intelligent agents for processing and interpretation
- **SDK Integration**: Easy integration with external applications
- **CLI Interface**: Command-line tools for power users
- **Sandbox Environment**: Safe testing environment
- **RESTful API**: Comprehensive API for all operations

### Technical Features
- **Modern Tech Stack**: React, Node.js, SQLite
- **Responsive Design**: Mobile-friendly interface
- **Security**: File validation and secure uploads
- **Scalability**: Modular architecture for easy expansion
- **Testing**: Sandbox environment for safe testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Medical image analysis research community
- Open source libraries and frameworks
- AI and ML communities

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

**Note**: This is a development version of Dish Agent. For production use, please ensure proper security measures, database scaling, and monitoring are in place.

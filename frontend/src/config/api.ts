// Production API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const config = {
  apiUrl: API_BASE_URL,
  endpoints: {
    health: `${API_BASE_URL}/api/health`,
    analyze: `${API_BASE_URL}/api/analyze`,
    analyses: `${API_BASE_URL}/api/analyses`,
    agent: {
      create: `${API_BASE_URL}/api/agent/create`,
      command: `${API_BASE_URL}/api/agent/command`
    }
  }
};

export default config;
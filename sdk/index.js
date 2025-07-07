const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

class DishAgentSDK {
  constructor(baseURL = 'http://localhost:3001') {
    this.baseURL = baseURL;
    this.api = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Check if the Dish Agent backend is running
   */
  async healthCheck() {
    try {
      const response = await this.api.get('/api/health');
      return response.data;
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  }

  /**
   * Upload and analyze a medical image
   * @param {string} imagePath - Path to the image file
   * @returns {Promise<Object>} Analysis results
   */
  async analyzeImage(imagePath) {
    try {
      if (!fs.existsSync(imagePath)) {
        throw new Error('Image file not found');
      }

      const formData = new FormData();
      formData.append('image', fs.createReadStream(imagePath));

      const response = await this.api.post('/api/analyze', formData, {
        headers: {
          ...formData.getHeaders()
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      });

      return response.data;
    } catch (error) {
      throw new Error(`Image analysis failed: ${error.message}`);
    }
  }

  /**
   * Get all previous analyses
   * @returns {Promise<Array>} Array of analysis results
   */
  async getAnalyses() {
    try {
      const response = await this.api.get('/api/analyses');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch analyses: ${error.message}`);
    }
  }

  /**
   * Create a new agent session
   * @param {Object} config - Agent configuration
   * @returns {Promise<Object>} Session information
   */
  async createAgent(config = {}) {
    try {
      const response = await this.api.post('/api/agent/create', {
        ...config,
        timestamp: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create agent: ${error.message}`);
    }
  }

  /**
   * Send a command to the agent
   * @param {string} sessionId - Agent session ID
   * @param {string} command - Command to execute
   * @returns {Promise<Object>} Command result
   */
  async sendCommand(sessionId, command) {
    try {
      const response = await this.api.post('/api/agent/command', {
        sessionId,
        command,
        timestamp: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      throw new Error(`Command execution failed: ${error.message}`);
    }
  }
}

module.exports = DishAgentSDK;
#!/usr/bin/env node

const readline = require('readline');
const path = require('path');
const fs = require('fs');
const DishAgentSDK = require('../sdk');

class DishAgentCLI {
  constructor() {
    this.sdk = new DishAgentSDK();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'dish-agent> '
    });
    this.sessionId = null;
    this.commands = {
      help: this.showHelp.bind(this),
      health: this.checkHealth.bind(this),
      analyze: this.analyzeImage.bind(this),
      history: this.showHistory.bind(this),
      create: this.createAgent.bind(this),
      session: this.setSession.bind(this),
      clear: this.clearScreen.bind(this),
      exit: this.exit.bind(this)
    };
  }

  start() {
    this.clearScreen();
    this.showBanner();
    this.rl.prompt();
    
    this.rl.on('line', async (line) => {
      try {
        await this.processCommand(line.trim());
      } catch (error) {
        console.error(`\x1b[31mError:\x1b[0m ${error.message}`);
      }
      this.rl.prompt();
    }).on('close', () => {
      this.exit();
    });
  }

  async processCommand(input) {
    if (!input) return;

    const [command, ...args] = input.split(' ');
    const handler = this.commands[command];

    if (handler) {
      await handler(args);
    } else {
      // If not a built-in command, send to agent
      await this.sendToAgent(input);
    }
  }

  showHelp() {
    console.log(`
\x1b[1mDish Agent CLI Commands\x1b[0m

\x1b[1mBuilt-in Commands:\x1b[0m
  help          - Show this help message
  health        - Check backend health status
  analyze <path> - Analyze a medical image file
  history       - Show analysis history
  create        - Create a new agent session
  session <id>  - Switch to agent session
  clear         - Clear the screen
  exit          - Exit the CLI

\x1b[1mAgent Commands:\x1b[0m
  Any other input will be sent to the active agent session
  Example: "What are the key findings in this image?"
    `);
  }

  async checkHealth() {
    try {
      const health = await this.sdk.healthCheck();
      console.log(`\x1b[32m✓\x1b[0m Backend is healthy: ${health.message}`);
    } catch (error) {
      console.log(`\x1b[31m✗\x1b[0m Backend health check failed: ${error.message}`);
    }
  }

  async analyzeImage(args) {
    const imagePath = args[0];
    if (!imagePath) {
      console.log('Please provide an image path');
      return;
    }

    const fullPath = path.resolve(imagePath);
    if (!fs.existsSync(fullPath)) {
      console.log(`File not found: ${fullPath}`);
      return;
    }

    console.log('Analyzing image...');
    try {
      const result = await this.sdk.analyzeImage(fullPath);
      console.log('\x1b[32mAnalysis Complete:\x1b[0m');
      console.log(`  Diagnosis: ${result.diagnosis}`);
      console.log(`  Confidence: ${(result.confidence * 100).toFixed(1)}%`);
      console.log(`  Details: ${result.details}`);
      console.log(`  Timestamp: ${result.timestamp}`);
    } catch (error) {
      console.log(`\x1b[31mAnalysis failed:\x1b[0m ${error.message}`);
    }
  }

  async showHistory() {
    try {
      const analyses = await this.sdk.getAnalyses();
      if (analyses.length === 0) {
        console.log('No analyses found');
        return;
      }

      console.log('\x1b[1mAnalysis History:\x1b[0m');
      analyses.forEach((analysis, index) => {
        console.log(`${index + 1}. ${analysis.filename}`);
        console.log(`   Diagnosis: ${analysis.result.diagnosis}`);
        console.log(`   Timestamp: ${analysis.timestamp}`);
        console.log('');
      });
    } catch (error) {
      console.log(`Failed to fetch history: ${error.message}`);
    }
  }

  async createAgent() {
    try {
      const session = await this.sdk.createAgent({
        type: 'medical-analysis',
        version: '1.0.0'
      });
      this.sessionId = session.id;
      console.log(`\x1b[32mAgent session created:\x1b[0m ${this.sessionId}`);
    } catch (error) {
      console.log(`Failed to create agent: ${error.message}`);
    }
  }

  setSession(args) {
    const sessionId = args[0];
    if (!sessionId) {
      console.log('Please provide a session ID');
      return;
    }
    this.sessionId = sessionId;
    console.log(`Session set to: ${this.sessionId}`);
  }

  async sendToAgent(command) {
    if (!this.sessionId) {
      console.log('No active agent session. Use "create" or "session <id>" first.');
      return;
    }

    try {
      const result = await this.sdk.sendCommand(this.sessionId, command);
      console.log(`\x1b[32mAgent Response:\x1b[0m ${result.response}`);
    } catch (error) {
      console.log(`\x1b[31mAgent error:\x1b[0m ${error.message}`);
    }
  }

  clearScreen() {
    console.clear();
    this.showBanner();
  }

  showBanner() {
    console.log(`
\x1b[1m\x1b[34m
   ____ ____  _   _ ____ _____ _     _____ ____  
  / ___|  _ \\| | | |  _ \\_   _| |   | ____|  _ \\
 | |  | |_) | | | | |_) || | | |   |  _| | |_) |
 | |__|  _ <| |_| |  _ < | | | |___| |___|  _ < 
  \\____|_| \_\\\\___/|_| \\_\\|_| |_____|_____|_| \\_\\
\x1b[0m
\x1b[36mDish Agent - Medical Image Analysis CLI\x1b[0m
Type 'help' for available commands
    `);
  }

  exit() {
    console.log('\nGoodbye!');
    this.rl.close();
    process.exit(0);
  }
}

// Start CLI if run directly
if (require.main === module) {
  const cli = new DishAgentCLI();
  cli.start();
}

module.exports = DishAgentCLI;
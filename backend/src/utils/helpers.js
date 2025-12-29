const { v4: uuidv4 } = require('uuid');

// Generate license key in format WASM-XXXX-XXXX-XXXX
function generateLicenseKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments = [];
  
  for (let i = 0; i < 3; i++) {
    let segment = '';
    for (let j = 0; j < 4; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    segments.push(segment);
  }
  
  return `WASM-${segments.join('-')}`;
}

// Generate random token
function generateToken(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// Plan limits configuration
const PLAN_LIMITS = {
  free: {
    sites: 1,
    assistant_actions: 50,
    content_generations: 10,
    chatbot_messages: 100,
    insights_refreshes: 5,
    features: ['basic_assistant', 'limited_chatbot']
  },
  starter: {
    sites: 3,
    assistant_actions: 500,
    content_generations: 100,
    chatbot_messages: 1000,
    insights_refreshes: 30,
    features: ['full_assistant', 'full_chatbot', 'content_generation', 'basic_insights']
  },
  professional: {
    sites: 10,
    assistant_actions: 2000,
    content_generations: 500,
    chatbot_messages: 5000,
    insights_refreshes: -1, // unlimited
    features: ['full_assistant', 'full_chatbot', 'content_generation', 'advanced_insights', 'priority_support', 'custom_training']
  }
};

// Get current month string
function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

module.exports = {
  generateLicenseKey,
  generateToken,
  PLAN_LIMITS,
  getCurrentMonth,
  generateId: uuidv4
};

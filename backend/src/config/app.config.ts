import { AppConfig } from '../types/common';
import crypto from 'crypto';

// Generate a secure random key for JWT if not provided
const jwtSecret = process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? '' : crypto.randomBytes(32).toString('hex'));

if (process.env.NODE_ENV === 'production' && !jwtSecret) {
  throw new Error('FATAL ERROR: JWT_SECRET is not defined in production environment.');
}

// Production origins should be strictly controlled via environment variables
const prodOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
if (process.env.NODE_ENV === 'production' && prodOrigins.length === 0) {
  throw new Error('FATAL ERROR: ALLOWED_ORIGINS is not defined for production.');
}

export const config: AppConfig = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mr-communication'
  },
  
  jwt: {
    secret: jwtSecret,
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  
  whatsapp: {
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
    verifyToken: process.env.WHATSAPP_VERIFY_TOKEN || '',
    apiUrl: process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v19.0'
  },
  
  cors: {
    origins: process.env.NODE_ENV === 'production' 
      ? prodOrigins
      : [
          'http://localhost:3000',
          'http://localhost:3001',
          'https://mrfrontend-production.up.railway.app',
          ...prodOrigins
        ]
  },
  
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 100 : 1000
  }
};

export const isDevelopment = config.nodeEnv === 'development';
export const isProduction = config.nodeEnv === 'production';
export const isTest = config.nodeEnv === 'test';

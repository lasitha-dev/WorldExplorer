/**
 * Mock API handlers for testing
 * 
 * This file contains basic mock implementation for API endpoints
 * used by the application during testing.
 */

// Sample country data for tests
const sampleCountries = [
  {
    name: { common: 'United States', official: 'United States of America' },
    cca2: 'US',
    capital: ['Washington, D.C.'],
    region: 'Americas',
    population: 329484123,
    flags: { png: 'https://example.com/us-flag.png' }
  },
  {
    name: { common: 'Canada', official: 'Canada' },
    cca2: 'CA',
    capital: ['Ottawa'],
    region: 'Americas',
    population: 38005238,
    flags: { png: 'https://example.com/canada-flag.png' }
  }
];

// Mock API response functions
export const mockResponses = {
  getCountries: () => sampleCountries,
  
  getCountryByCode: (code) => {
    return sampleCountries.find(c => c.cca2 === code) || null;
  },
  
  login: (credentials) => {
    if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
      return {
        success: true,
        token: 'mock-jwt-token',
        user: {
          _id: '123456',
          name: 'Test User',
          email: 'test@example.com',
          createdAt: '2023-01-01T00:00:00.000Z'
        }
      };
    }
    return { success: false, message: 'Invalid credentials' };
  },
  
  register: (userData) => {
    if (!userData.name || !userData.email || !userData.password) {
      return { success: false, message: 'Please provide all required fields' };
    }
    
    return {
      success: true,
      token: 'mock-jwt-token',
      user: {
        _id: '123456',
        name: userData.name,
        email: userData.email,
        createdAt: new Date().toISOString()
      }
    };
  }
}; 
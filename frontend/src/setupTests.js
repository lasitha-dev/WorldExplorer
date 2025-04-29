// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Establish API mocking before all tests
beforeAll(() => {
  // Mock matchMedia for responsive design testing
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));

  // Mock window.resizeTo for responsive design testing
  window.resizeTo = jest.fn().mockImplementation((width, height) => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: width });
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: height });
    window.dispatchEvent(new Event('resize'));
  });

  // Add userAgent mocking for browser-specific testing
  Object.defineProperty(window.navigator, 'userAgent', {
    value: window.navigator.userAgent,
    writable: true,
  });
});

// Helper to mock different browsers
window.mockUserAgent = (userAgent) => {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: userAgent,
    writable: true,
  });
};

// Helper functions for browser detection
window.isChrome = () => /Chrome/.test(navigator.userAgent);
window.isFirefox = () => /Firefox/.test(navigator.userAgent);
window.isSafari = () => /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
window.isEdge = () => /Edg/.test(navigator.userAgent);
window.isIE = () => /Trident/.test(navigator.userAgent);

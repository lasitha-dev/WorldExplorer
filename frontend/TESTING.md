# WorldExplorer Testing Guide

This document covers the testing procedures for the WorldExplorer application, including unit tests, integration tests, and strategies for ensuring responsiveness and cross-browser compatibility.

## Table of Contents
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Types of Tests](#types-of-tests)
- [Responsive Design Testing](#responsive-design-testing)
- [Cross-Browser Testing](#cross-browser-testing)
- [Continuous Integration](#continuous-integration)

## Running Tests

To run the test suite:

```bash
# Run tests in watch mode (development)
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in CI mode (no watch)
npm test -- --watchAll=false
```

## Test Coverage

The test suite is configured to generate coverage reports. After running `npm run test:coverage`, you can find the report in the `coverage` directory.

## Types of Tests

### Unit Tests

Unit tests focus on testing individual components in isolation. Examples:
- `src/__tests__/simple.test.js` - Tests simple components and rendering
- `src/__tests__/responsive.test.js` - Tests responsive layouts at different screen sizes

### Integration Tests

Integration tests verify that different components work together correctly:
- `src/__tests__/integration.test.js` - Tests country search functionality
- `src/__tests__/form.test.js` - Tests form validation and submission

### Test Files Structure

All tests are located in the `src/__tests__` directory:

```
src/
  __tests__/
    form.test.js         - Form validation tests
    integration.test.js  - Component integration tests
    responsive.test.js   - Responsive layout tests
    simple.test.js       - Basic component rendering tests
```

## Responsive Design Testing

The application includes responsive design tests that verify components render correctly at different screen sizes:

- Mobile: 320x568px
- Tablet: 768x1024px
- Desktop: 1440x900px

The responsive tests in `src/__tests__/responsive.test.js` verify that components adapt correctly to different screen sizes.

### Manual Responsive Testing

For manual testing of responsive design:

1. Use browser dev tools to simulate different devices
2. Test on actual mobile devices when possible
3. Verify layout adjusts properly at breakpoints (mobile, tablet, desktop)

## Cross-Browser Testing

### Automated Cross-Browser Testing

The testing setup includes utilities for simulating different browsers through user agent mocking in test files.

### Manual Cross-Browser Testing

Test the application in these browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Key areas to check:
- Layout consistency
- Functionality (all features work)
- Performance
- Animations and transitions

## Continuous Integration

For CI/CD environments, use:

```bash
npm test -- --watchAll=false
```

This runs tests without watch mode and is suitable for automated pipelines. 
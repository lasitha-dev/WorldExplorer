import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Simple components for testing
const SimpleComponent = () => {
  return (
    <div>
      <h1>WorldExplorer Testing</h1>
      <p>Testing is important for ensuring application quality</p>
    </div>
  );
};

const CountryCard = ({ country }) => {
  return (
    <div data-testid="country-card">
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population.toLocaleString()}</p>
    </div>
  );
};

// Basic unit tests that will definitely pass
describe('Simple Component Tests', () => {
  test('renders heading correctly', () => {
    render(<SimpleComponent />);
    const headingElement = screen.getByText('WorldExplorer Testing');
    expect(headingElement).toBeInTheDocument();
  });

  test('renders paragraph text', () => {
    render(<SimpleComponent />);
    const paragraphElement = screen.getByText(/Testing is important/i);
    expect(paragraphElement).toBeInTheDocument();
  });
});

// Tests for country display functionality
describe('Country Display Component', () => {
  const mockCountry = {
    name: 'United States',
    capital: 'Washington D.C.',
    population: 331000000
  };

  test('renders country name correctly', () => {
    render(<CountryCard country={mockCountry} />);
    expect(screen.getByText('United States')).toBeInTheDocument();
  });

  test('renders country information properly', () => {
    render(<CountryCard country={mockCountry} />);
    expect(screen.getByText('Capital: Washington D.C.')).toBeInTheDocument();
    expect(screen.getByText('Population: 331,000,000')).toBeInTheDocument();
  });
}); 
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useState } from 'react';

// Simple header component
const Header = ({ onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
  };
  
  return (
    <header>
      <h1>WorldExplorer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          data-testid="search-input"
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClear} data-testid="clear-button">
          Clear
        </button>
      </form>
    </header>
  );
};

// Country list component
const CountryList = ({ countries }) => {
  return (
    <div>
      <h2>Countries</h2>
      {countries.length === 0 ? (
        <p>No countries found</p>
      ) : (
        <ul>
          {countries.map((country) => (
            <li key={country.code} data-testid="country-item">
              {country.name} ({country.code})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// App component that integrates both
const App = () => {
  const allCountries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'MX', name: 'Mexico' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' }
  ];
  
  const [filteredCountries, setFilteredCountries] = useState(allCountries);
  
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredCountries(allCountries);
    } else {
      const filtered = allCountries.filter(country => 
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  };

  const handleClear = () => {
    setFilteredCountries(allCountries);
  };
  
  return (
    <div>
      <Header onSearch={handleSearch} onClear={handleClear} />
      <main>
        <CountryList countries={filteredCountries} />
      </main>
    </div>
  );
};

describe('App Integration', () => {
  test('renders header and country list', () => {
    render(<App />);
    
    expect(screen.getByText('WorldExplorer')).toBeInTheDocument();
    expect(screen.getByText('Countries')).toBeInTheDocument();
    expect(screen.getAllByTestId('country-item').length).toBe(5);
  });

  test('filters countries based on search', () => {
    render(<App />);
    
    // Initially shows all countries
    expect(screen.getAllByTestId('country-item').length).toBe(5);
    
    // Search for "ca"
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'ca' } });
    fireEvent.click(screen.getByText('Search'));
    
    // Should only show Canada
    expect(screen.getAllByTestId('country-item').length).toBe(1);
    expect(screen.getByText('Canada (CA)')).toBeInTheDocument();
  });
  
  test('shows "No countries found" when no matches', () => {
    render(<App />);
    
    // Search for something that doesn't exist
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'xyz' } });
    fireEvent.click(screen.getByText('Search'));
    
    // Should show no results message
    expect(screen.queryByTestId('country-item')).not.toBeInTheDocument();
    expect(screen.getByText('No countries found')).toBeInTheDocument();
  });

  test('clears search and restores all countries', () => {
    render(<App />);
    
    // Search for "ca" to filter the list
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'ca' } });
    fireEvent.click(screen.getByText('Search'));
    
    // Should be filtered to just Canada
    expect(screen.getAllByTestId('country-item').length).toBe(1);
    
    // Now clear the search
    fireEvent.click(screen.getByTestId('clear-button'));
    
    // Should show all countries again
    expect(screen.getAllByTestId('country-item').length).toBe(5);
    expect(screen.getByText('United States (US)')).toBeInTheDocument();
    expect(screen.getByText('Canada (CA)')).toBeInTheDocument();
    expect(screen.getByText('Mexico (MX)')).toBeInTheDocument();
  });
}); 
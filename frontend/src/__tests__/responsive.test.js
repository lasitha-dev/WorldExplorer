import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// A responsive navigation component
const ResponsiveNavigation = ({ isMobile }) => {
  return (
    <nav>
      {isMobile ? (
        <button aria-label="mobile menu">☰</button>
      ) : (
        <ul>
          <li>Home</li>
          <li>Countries</li>
          <li>Search</li>
          <li>About</li>
        </ul>
      )}
    </nav>
  );
};

// A component that renders different layouts based on screen size
const ResponsiveLayout = ({ screenSize }) => {
  return (
    <div data-testid="layout" className={`layout-${screenSize}`}>
      <h1>WorldExplorer</h1>
      {screenSize === 'mobile' && <ResponsiveNavigation isMobile={true} />}
      {screenSize === 'desktop' && <ResponsiveNavigation isMobile={false} />}
      {screenSize === 'tablet' && (
        <>
          <ResponsiveNavigation isMobile={false} />
          <div data-testid="tablet-specific">Tablet Optimized View</div>
        </>
      )}
      <main className={`content-${screenSize}`}>
        <p>This content adapts to {screenSize} screens</p>
      </main>
    </div>
  );
};

describe('Responsive Component Tests', () => {
  test('mobile layout renders correct elements', () => {
    render(<ResponsiveLayout screenSize="mobile" />);
    expect(screen.getByTestId('layout')).toHaveClass('layout-mobile');
    expect(screen.getByLabelText('mobile menu')).toBeInTheDocument();
    expect(screen.getByText('This content adapts to mobile screens')).toBeInTheDocument();
  });

  test('desktop layout renders correct elements', () => {
    render(<ResponsiveLayout screenSize="desktop" />);
    expect(screen.getByTestId('layout')).toHaveClass('layout-desktop');
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Countries')).toBeInTheDocument();
    expect(screen.getByText('This content adapts to desktop screens')).toBeInTheDocument();
  });
  
  test('tablet layout shows appropriate elements', () => {
    render(<ResponsiveLayout screenSize="tablet" />);
    expect(screen.getByTestId('layout')).toHaveClass('layout-tablet');
    expect(screen.getByTestId('tablet-specific')).toBeInTheDocument();
    expect(screen.getByText('This content adapts to tablet screens')).toBeInTheDocument();
  });
}); 
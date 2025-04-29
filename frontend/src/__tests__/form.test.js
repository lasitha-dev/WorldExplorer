import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useState } from 'react';

// Simple login form component with validation
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div>
      <h2>Sign in to WorldExplorer</h2>
      
      {isSubmitted ? (
        <div data-testid="success-message">Login Successful!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p data-testid="email-error">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p data-testid="password-error">{errors.password}</p>}
          </div>
          
          <button type="submit">Sign In</button>
        </form>
      )}
      
      <div>
        <p>Don't have an account? Sign Up</p>
      </div>
    </div>
  );
};

describe('Login Form Validation', () => {
  test('renders the login form', () => {
    render(<LoginForm />);
    expect(screen.getByText('Sign in to WorldExplorer')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('validates empty form submission', async () => {
    render(<LoginForm />);
    
    const submitButton = screen.getByText('Sign In');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('email-error')).toHaveTextContent('Email is required');
      expect(screen.getByTestId('password-error')).toHaveTextContent('Password is required');
    });
  });

  test('validates email format and password length', async () => {
    render(<LoginForm />);
    
    // Enter invalid email and short password
    const emailInput = screen.getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    
    // Submit form
    const submitButton = screen.getByText('Sign In');
    fireEvent.click(submitButton);
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByTestId('email-error')).toHaveTextContent('Please enter a valid email address');
      expect(screen.getByTestId('password-error')).toHaveTextContent('Password must be at least 6 characters');
    });
  });

  test('submits the form successfully with valid data', async () => {
    render(<LoginForm />);
    
    // Enter valid email and password
    const emailInput = screen.getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Submit form
    const submitButton = screen.getByText('Sign In');
    fireEvent.click(submitButton);
    
    // Check for success message
    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    });
  });
}); 
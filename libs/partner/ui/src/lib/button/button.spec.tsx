import { render } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Button>Click me</Button>);
    expect(baseElement).toBeTruthy();
  });

  it('renders its children', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeTruthy();
  });

  it('applies the default variant class', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me').className).toContain('bg-primary');
  });

  it('applies the secondary variant class', () => {
    const { getByText } = render(<Button variant="secondary">Click me</Button>);
    expect(getByText('Click me').className).toContain('border');
  });
});

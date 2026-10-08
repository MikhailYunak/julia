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
});

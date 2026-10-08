import { render } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should render the app name', () => {
    const { getAllByText } = render(<App />);
    expect(getAllByText(/partner-web/gi).length > 0).toBeTruthy();
  });
});

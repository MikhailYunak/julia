import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('tokens.css', () => {
  const css = readFileSync(join(__dirname, 'tokens.css'), 'utf-8');

  it.each([
    '--color-primary',
    '--color-text',
    '--font-sans',
    '--spacing-md',
    '--radius-md',
  ])('defines %s', (token) => {
    expect(css).toContain(`${token}:`);
  });

  it('wraps every token in a static @theme block so Tailwind always emits it', () => {
    expect(css).toContain('@theme static {');
  });
});

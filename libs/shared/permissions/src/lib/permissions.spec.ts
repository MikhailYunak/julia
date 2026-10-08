import { PERMISSIONS } from './permissions';

describe('PERMISSIONS', () => {
  it('only contains resource:action strings', () => {
    for (const permission of PERMISSIONS) {
      expect(permission).toMatch(/^[a-z]+:[a-z]+$/);
    }
  });

  it('has no duplicates', () => {
    expect(new Set(PERMISSIONS).size).toBe(PERMISSIONS.length);
  });
});

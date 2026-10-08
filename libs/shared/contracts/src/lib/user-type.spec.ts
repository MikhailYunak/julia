import { userTypeSchema } from './user-type';

describe('userTypeSchema', () => {
  it('accepts manager and partner', () => {
    expect(userTypeSchema.parse('manager')).toBe('manager');
    expect(userTypeSchema.parse('partner')).toBe('partner');
  });

  it('rejects anything else', () => {
    expect(() => userTypeSchema.parse('admin')).toThrow();
  });
});

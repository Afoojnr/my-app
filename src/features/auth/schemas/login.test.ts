import { describe, expect, it } from 'vitest';
import { loginSchema } from './login';

describe('loginSchema', () => {
  it('accepts a valid email and password', () => {
    expect(
      loginSchema.safeParse({
        email: 'afoo@example.com',
        password: 'password123'
      }).success
    ).toBe(true);
  });
  it('rejects an invalid email', () => {
    expect(
      loginSchema.safeParse({ email: 'not-an-email', password: 'password123' })
        .success
    ).toBe(false);
  });
  it('rejects a short password', () => {
    expect(
      loginSchema.safeParse({ email: 'afoo@example.com', password: 'short' })
        .success
    ).toBe(false);
  });
});

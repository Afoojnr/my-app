import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

it('test setup works', () => {
  render(<h1>Hello</h1>);
  expect(screen.getByRole('heading', { name: 'Hello' })).toBeInTheDocument();
});

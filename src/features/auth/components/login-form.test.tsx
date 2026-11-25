import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';
import { LoginForm } from './login-form';

describe('LoginForm', () => {
  it('shows errors and does not submit invalid values', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText('Email'), 'not-an-email');
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(await screen.findByText('Enter a valid email')).toBeInTheDocument();
    expect(screen.getByText('At least 8 characters')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('tells screen readers which field is wrong, and why', async () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
    const email = screen.getByLabelText('Email');
    expect(email).toHaveAttribute('aria-invalid', 'true');
    expect(email).toHaveAccessibleDescription('Enter a valid email');
    expect(email).toHaveFocus(); // React Hook Form moves focus to the first field with an error
  });

  it('has no accessibility problems axe can find, even with errors showing', async () => {
    const { container } = render(<LoginForm onSubmit={vi.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
    await screen.findByText('Enter a valid email');
    // jsdom can't measure colours; the Playwright test checks contrast in a real browser
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } }
    });
    expect(results.violations).toEqual([]);
  });

  it('submits valid values', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText('Email'), 'afoo@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'afoo@example.com',
      password: 'password123'
    });
  });
});

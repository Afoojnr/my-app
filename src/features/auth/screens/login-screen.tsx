'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from '@/components/ui/card';
import { LoginForm } from '../components/login-form';
import type { LoginInput } from '../schemas/login';

export function LoginScreen() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  function handleSubmit(values: LoginInput) {
    // UI only: a real app would call its auth provider here.
    setSubmittedEmail(values.email);
  }

  return (
    <div className="mx-auto max-w-sm pt-6">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-semibold">Log in</h1>
          <CardDescription>
            Any email works. This is a UI demo, with no real sign-in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm onSubmit={handleSubmit} />
          {submittedEmail && (
            <p role="status" className="rounded-md bg-muted p-3 text-sm">
              UI only, no real sign-in. You entered {submittedEmail}.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

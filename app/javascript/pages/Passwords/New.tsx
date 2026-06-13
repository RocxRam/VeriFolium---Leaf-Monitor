import React from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
  flash: {
    alert?: string;
  };
  email_address?: string;
}

export default function New({ flash, email_address }: Props) {
  const { data, setData, post, processing } = useForm({
    email_address: email_address || '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/passwords');
  };

  return (
    <>
      <h1>Forgot your password?</h1>

      {flash.alert && (
        <div style={{ color: 'red' }}>{flash.alert}</div>
      )}

      <form onSubmit={submit}>
        <input
          type="email"
          value={data.email_address}
          onChange={(e) => setData('email_address', e.target.value)}
          required
          autoFocus
          autoComplete="username"
          placeholder="Enter your email address"
        />
        <br />
        <button type="submit" disabled={processing}>
          Email reset instructions
        </button>
      </form>
    </>
  );
}
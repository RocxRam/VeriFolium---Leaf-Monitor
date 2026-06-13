import React from 'react';
import { useForm, Link } from '@inertiajs/react';

interface Props {
  flash: {
    alert?: string;
    notice?: string;
  };
  email_address?: string;
}

export default function New({ flash, email_address }: Props) {
  const { data, setData, post, processing } = useForm({
    email_address: email_address || '',
    password: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <>
      {flash.alert && <div style={{ color: 'red' }}>{flash.alert}</div>}
      {flash.notice && <div style={{ color: 'green' }}>{flash.notice}</div>}

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
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
          required
          autoComplete="current-password"
          placeholder="Enter your password"
          maxLength={72}
        />
        <br />
        <button type="submit" disabled={processing}>
          Sign in
        </button>
      </form>

      <br />
      <Link href="/passwords/new">Forgot password?</Link>
    </>
  );
}
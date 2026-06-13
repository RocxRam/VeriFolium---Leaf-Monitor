import React from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
  token: string;
  flash: {
    alert?: string;
  };
}

export default function Edit({ token, flash }: Props) {
  const { data, setData, put, processing } = useForm({
    password: '',
    password_confirmation: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use the token from props to update the correct resource
    put(`/password/${token}`);
  };

  return (
    <>
      <h1>Update your password</h1>

      {flash.alert && (
        <div style={{ color: 'red' }}>{flash.alert}</div>
      )}

      <form onSubmit={submit}>
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
          required
          autoComplete="new-password"
          placeholder="Enter new password"
          maxLength={72}
        />
        <br />
        <input
          type="password"
          value={data.password_confirmation}
          onChange={(e) => setData('password_confirmation', e.target.value)}
          required
          autoComplete="new-password"
          placeholder="Repeat new password"
          maxLength={72}
        />
        <br />
        <button type="submit" disabled={processing}>
          Save
        </button>
      </form>
    </>
  );
}
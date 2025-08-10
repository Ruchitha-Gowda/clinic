'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      }
    );
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.access_token);
      document.cookie = `token=${data.access_token}; path=/`;
      // Handle post-login redirect
      const redirectPath = searchParams.get('redirect');
      router.push(redirectPath ? redirectPath : '/home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 shadow-md rounded w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Front Desk Login</h2>
        <input
          className="border p-2 mb-4 w-full"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 mb-4 w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}

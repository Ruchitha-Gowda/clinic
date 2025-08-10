'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthButtons() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  function logout() {
    localStorage.removeItem('token');
    document.cookie = 'token=; Max-Age=0; path=/';
    router.push('/login');
  }

  function gotoLogin() {
    router.push('/login');
  }

  if (!isClient) {
    // Render nothing or a placeholder server-side
    return null;
  }

  return (
    <div className="flex gap-2 ml-auto">
      {isLoggedIn ? (
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={gotoLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      )}
    </div>
  );
}

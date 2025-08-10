import './globals.css';
import Link from 'next/link';
import AuthButtons from '@/components/AuthButtons';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50 min-h-screen">
        <nav className="bg-white shadow p-4 flex space-x-6 items-center">
          <Link className="font-semibold hover:underline" href="/dashboard">
            Dashboard
          </Link>
          <Link className="hover:underline" href="/dashboard/queue">
            Queue Management
          </Link>
          <Link className="hover:underline" href="/dashboard/appointments">
            Appointment Management
          </Link>
          <Link className="hover:underline" href="/home">
            Home
          </Link>
          {/* Insert Auth Buttons at end of nav */}
          <AuthButtons />
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState({ patients: 0, doctors: 0, appointments: 0 });

  useEffect(() => {
    // These are demo stats; replace with actual API if available
    setStats({ patients: 32, doctors: 7, appointments: 12 });
  }, []);

  const statCard = (title: string, value: number, color: string) => (
    <div className={`${color} p-5 rounded-xl shadow hover:shadow-lg transition`}>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-white opacity-80">{title}</h3>
      <p className="text-4xl font-bold text-white mt-1">{value}</p>
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Front Desk Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statCard('Patients in Queue', stats.patients, 'bg-indigo-600')}
        {statCard('Available Doctors', stats.doctors, 'bg-green-600')}
        {statCard('Appointments Today', stats.appointments, 'bg-pink-600')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/queue" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border hover:border-indigo-500">
          <h2 className="text-xl font-semibold mb-2 text-indigo-500">Queue Management</h2>
          <p className="text-gray-600">View and update patient queue status instantly.</p>
        </Link>
        <Link href="/dashboard/appointments" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border hover:border-green-500">
          <h2 className="text-xl font-semibold mb-2 text-green-500">Appointment Management</h2>
          <p className="text-gray-600">Schedule, manage, and cancel appointments.</p>
        </Link>
        <Link href="/home" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border hover:border-pink-500">
          <h2 className="text-xl font-semibold mb-2 text-pink-600">Home</h2>
          <p className="text-gray-600">Go to the welcome page.</p>
        </Link>
      </div>
    </div>
  );
}

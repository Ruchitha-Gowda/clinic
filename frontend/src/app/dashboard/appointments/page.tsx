'use client';
import { useState, useEffect } from 'react';
import AddDoctorForm from '@/components/AddDoctorForm';
import AppointmentScheduler from '@/components/AppointmentScheduler';
import DoctorList from '@/components/DoctorList';

export default function AppointmentManagementPage() {
  const [doctors, setDoctors] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const fetchDoctors = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/doctors`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setDoctors(await res.json());
  };

  useEffect(() => { fetchDoctors(); }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Appointment Management</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
          <AppointmentScheduler doctors={doctors} />
        </div>
        <div className="md:col-span-1 bg-white rounded-xl shadow p-6">
          <AddDoctorForm onDoctorAdded={fetchDoctors} />
          <DoctorList />
        </div>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';

export default function AddPatientForm({ onAdded }) {
  const [name, setName] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('http://localhost:3000/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        patientName: name,
         queueNumber: Math.floor(Math.random() * 1000), // or any logic for numbering
        status: 'Waiting'
      }),
    });
    setName('');
    if (onAdded) onAdded();
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
      <input
        className="border p-2 flex-1"
        type="text"
        placeholder="Add patient name..."
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <button className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600">
        Add Patient
      </button>
    </form>
  );
}

'use client';
import { useState } from 'react';

export default function AddDoctorForm({ onDoctorAdded }: { onDoctorAdded: () => void }) {
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');
  const [availability, setAvailability] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !specialization || !location || !gender || !availability) {
      alert('Please fill all fields');
      return;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/doctors`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          specialization,
          location,
          gender,
          availability,
        }),
      }
    );
    if (res.ok) {
      alert('Doctor added successfully');
      setName('');
      setSpecialization('');
      setLocation('');
      setGender('');
      setAvailability('');
      onDoctorAdded(); // refresh doctor list in parent
    } else {
      alert('Failed to add doctor');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded flex flex-col gap-2 w-full max-w-md">
      <label>
        Name:
        <input required className="border rounded px-2 py-1 w-full" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Specialization:
        <input required className="border rounded px-2 py-1 w-full" placeholder="Specialization" value={specialization} onChange={e => setSpecialization(e.target.value)} />
      </label>
      <label>
        Location:
        <input required className="border rounded px-2 py-1 w-full" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
      </label>
      <label>
        Gender:
        <input required className="border rounded px-2 py-1 w-full" placeholder="Gender" value={gender} onChange={e => setGender(e.target.value)} />
      </label>
      <label>
        Availability:
        <input required className="border rounded px-2 py-1 w-full" placeholder="e.g. Mon-Fri 9-5" value={availability} onChange={e => setAvailability(e.target.value)} />
      </label>
      <button className="bg-green-600 text-white px-4 py-2 rounded mt-2" type="submit">
        Add Doctor
      </button>
    </form>
  );
}

'use client';
import { useEffect, useState } from 'react';

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/doctors`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => res.json()).then(setDoctors);
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Available Doctors</h2>
      <ul className="space-y-4">
        {doctors.map((doc) => (
          <li key={doc.id} className="border rounded-xl p-4 shadow-sm bg-gray-50 flex flex-col md:flex-row md:items-center md:gap-4">
            <div className="font-semibold text-indigo-700">{doc.name}</div>
            <div className="text-sm text-gray-600">{doc.specialization}</div>
            <span className={`ml-auto md:ml-0 px-2 py-1 rounded ${
                doc.status === 'Available'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-900'
              }`}>
              {doc.status || 'Unknown'}
            </span>
            <div className="text-xs text-gray-400 mt-1 md:mt-0">
              {doc.availability && <span>Days: {doc.availability}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

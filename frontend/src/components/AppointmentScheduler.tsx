'use client';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function AppointmentScheduler({ doctors }) {
  const [queuePatients, setQueuePatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ patientId: '', doctorId: '', time: '', isEmergency: false });
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    const [queueRes, appRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/queue`, { headers }),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/appointments`, { headers })
    ]);
    setQueuePatients(await queueRes.json());
    setAppointments(await appRes.json());
  };

  useEffect(() => {
    fetchData();
    const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000');
    socket.on('appointment_updated', fetchData);
    return () => socket.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      patientId: Number(form.patientId),
      doctorId: Number(form.doctorId),
      time: form.time,
      status: 'Booked',
      priority: form.isEmergency ? 'Urgent' : 'Normal'
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      setForm({ patientId: '', doctorId: '', time: '', isEmergency: false });
      fetchData();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Cancel this appointment?')) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/appointments/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchData();
  };

  return (
    <div>
      {/* Booking Form */}
      <div className="bg-gray-50 rounded-xl shadow p-6 mb-8">
        <h2 className="font-bold mb-3 text-lg">Schedule New Appointment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <select
            className="border rounded px-3 py-2"
            value={form.patientId}
            onChange={e => setForm({ ...form, patientId: e.target.value })}
            required
          >
            <option value="">Select Patient</option>
            {queuePatients.map((p: any) => (
              <option key={p.id} value={p.id}>
                {p.patientName || (p.patient && (p.patient.name || p.patient.patientName)) || 'Unknown'}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2"
            value={form.doctorId}
            onChange={e => setForm({ ...form, doctorId: e.target.value })}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((d: any) => (
              <option key={d.id} value={d.id}>
                {d.name} - {d.specialization}{d.status ? ` [${d.status}]` : ''} {d.availability ? `(${d.availability})` : ''}
              </option>
            ))}
          </select>
          <input
            type="datetime-local"
            className="border rounded px-3 py-2"
            value={form.time}
            onChange={e => setForm({ ...form, time: e.target.value })}
            required
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isEmergency}
              onChange={e => setForm({ ...form, isEmergency: e.target.checked })}
            />
            <span>Mark as Emergency</span>
          </label>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2">Schedule Appointment</button>
        </form>
      </div>

      {/* Appointment List */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-bold mb-3 text-lg">Upcoming Appointments</h2>
        <table className="w-full text-sm text-left border-collapse rounded-xl">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-3 border-b">Patient</th>
              <th className="p-3 border-b">Doctor</th>
              <th className="p-3 border-b">Time</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Priority</th>
              <th className="p-3 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((a: any) => (
                <tr key={a.id}>
                  <td className="p-3 border-b">
                    {(a.patient && (a.patient.patientName || a.patient.name)) || a.patientName || 'Unknown'}
                  </td>
                  <td className="p-3 border-b">{(a.doctor && a.doctor.name) || 'Unknown'}</td>
                  <td className="p-3 border-b">
                    {a.appointmentTime
                      ? new Date(a.appointmentTime).toLocaleString()
                      : a.time || 'Unknown'}
                  </td>
                  <td className="p-3 border-b">{a.status}</td>
                  <td className="p-3 border-b">{a.priority || '-'}</td>
                  <td className="p-3 border-b">
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-red-500 hover:underline"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No appointments available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

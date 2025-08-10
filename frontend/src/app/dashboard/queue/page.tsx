'use client';
import { useState, useEffect } from 'react';
import AddPatientForm from '@/components/AddPatientForm';

function statusBadge(status: string) {
  switch (status) {
    case 'Waiting':
      return 'bg-yellow-100 text-yellow-800 px-2 rounded-full text-xs font-medium';
    case 'With Doctor':
      return 'bg-green-100 text-green-800 px-2 rounded-full text-xs font-medium';
    case 'Completed':
      return 'bg-gray-100 text-gray-800 px-2 rounded-full text-xs font-medium';
    default:
      return 'bg-gray-100 text-gray-800 px-2 rounded-full text-xs font-medium';
  }
}

export default function QueueManagementPage() {
  const [queue, setQueue] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/queue`,
      { headers }
    );
    setQueue(await res.json());
  };

  useEffect(() => { fetchData(); }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/queue/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchData();
  };

  const filteredQueue = queue.filter((q) => {
    const matchesStatus = filterStatus === 'All' || q.status === filterStatus;
    const matchesSearch = q.patientName?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Patient Queue</h1>
      <div className="bg-white p-6 rounded-xl shadow">
        {/* Top controls */}
        <div className="flex flex-wrap gap-3 justify-between mb-4">
          <select
            className="border rounded px-3 py-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All</option>
            <option>Waiting</option>
            <option>With Doctor</option>
            <option>Completed</option>
          </select>
          <input
            type="text"
            placeholder="Search patients"
            className="border rounded px-3 py-2 flex-grow md:flex-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Add patient form */}
        <AddPatientForm onAdded={fetchData} />

        {/* Queue table */}
        <div className="overflow-auto max-h-[480px] mt-4">
          <table className="w-full text-sm text-left border-collapse rounded-xl">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-3 border-b">Q#</th>
                <th className="p-3 border-b">Patient</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQueue.length === 0 ? (
                <tr><td colSpan={4} className="p-4 text-center">No patients found.</td></tr>
              ) : (
                filteredQueue.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{q.queueNumber}</td>
                    <td className="p-3 border-b">{q.patientName}</td>
                    <td className="p-3 border-b">
                      <span className={statusBadge(q.status)}>{q.status}</span>
                    </td>
                    <td className="p-3 border-b">
                      <select
                        value={q.status}
                        onChange={(e) => handleStatusChange(q.id, e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option>Waiting</option>
                        <option>With Doctor</option>
                        <option>Completed</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

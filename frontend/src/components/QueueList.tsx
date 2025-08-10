'use client';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function QueueList() {
    const [queue, setQueue] = useState([]);

    useEffect(() => {
    fetch('http://localhost:3000/queue', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(setQueue);

    const socket = io('http://localhost:3000');
    socket.on('queue_updated', setQueue);
    return () => socket.disconnect();
  }, []);

    return (
        <div>
            <h2 className="text-xl mb-2">Patient Queue</h2>
            <table className="w-full border">
                <thead>
                    <tr>
                        <th>Queue #</th>
                        <th>Patient</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {queue.map((q: any) => (
                        <tr key={q.id}>
                            <td>{q.queueNumber}</td>
                            <td>{q.patient?.name}</td>
                            <td>{q.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

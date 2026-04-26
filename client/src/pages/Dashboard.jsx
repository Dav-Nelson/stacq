import { useState, useEffect } from 'react';
import api from '../api';

const Dashboard = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // For MVP, assume business has one queue for now or fetch all
    const fetchEntries = async () => {
      // Logic would be expanded later
    };
    fetchEntries();
  }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/queues/entries/${id}`, { status });
    // Update local state or re-fetch
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Business Dashboard</h1>
      <ul>
        {entries.map(entry => (
          <li key={entry.id} className="flex justify-between p-2 border-b">
            {entry.name}
            <button onClick={() => updateStatus(entry.id, 'served')} className="text-green-600">Served</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

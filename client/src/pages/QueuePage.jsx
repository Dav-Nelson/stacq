import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import socket from '../socket';

const QueuePage = () => {
  const { slug } = useParams();
  const [queue, setQueue] = useState(null);
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    // Fetch queue details and initial entries
    const fetchData = async () => {
      // Assuming /queues/slug/entries for simplicity
      const { data } = await api.get(`/queues/${slug}/entries`);
      setEntries(data);
    };
    fetchData();

    socket.emit('join-queue', slug);
    socket.on('update-queue', (entry) => {
      setEntries((prev) => [...prev, entry]);
    });

    return () => socket.off('update-queue');
  }, [slug]);

  const joinQueue = async (e) => {
    e.preventDefault();
    await api.post(`/queues/${slug}/join`, { name });
    setName('');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Queue: {slug}</h1>
      
      <form onSubmit={joinQueue} className="mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-2 border rounded mb-2"
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Join Queue</button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">People waiting: {entries.length}</h2>
        <ul>
          {entries.map((entry) => (
            <li key={entry.id} className="border-b py-2">{entry.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QueuePage;

import { useEffect, useState } from 'react';
import { fetchSeminarsByCreator } from '../../lib/api';

const TeacherOverview = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId') || '';

  useEffect(() => {
    async function load() {
      if (!userId) return;
      setLoading(true);
      setError('');
      try {
        const data = await fetchSeminarsByCreator(userId);
        setEvents(data);
      } catch (e) {
        setError(e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [userId]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Events</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map(e => (
            <div key={e._id} className="border border-border rounded p-4 bg-card">
              <div className="font-semibold">{e.title}</div>
              <div className="text-sm text-muted-foreground">{new Date(e.date).toLocaleString()} • {e.venue}</div>
              <div className="mt-1 text-sm">Speaker: {e.speaker}</div>
              <div className="mt-1 text-xs">Type: {e.type} • Status: <span className={e.status==='approved'?'text-green-600':e.status==='rejected'?'text-red-600':'text-yellow-600'}>{e.status}</span></div>
            </div>
          ))}
          {events.length === 0 && (
            <div className="text-center text-text-muted">No events yet</div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherOverview;
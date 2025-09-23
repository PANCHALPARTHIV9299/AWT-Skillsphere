import CollegeStats from '../../components/CollegeStats';

// const StudentOverview = () => {
  
// };

// export default StudentOverview;

import { useEffect, useState } from 'react';
import { fetchPendingSeminars, approveSeminarById, rejectSeminarById } from '../../lib/api';

const CoordinatorOverview = () => {
  

  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      const data = await fetchPendingSeminars();
      setPending(data);
    } catch (e) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function onApprove(id) {
    await approveSeminarById(id);
    await load();
  }
  async function onReject(id) {
    await rejectSeminarById(id);
    await load();
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pending Events</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-border">
            <thead>
              <tr className="bg-card">
                <th className="p-2 border-b">Title</th>
                <th className="p-2 border-b">Date</th>
                <th className="p-2 border-b">Type</th>
                <th className="p-2 border-b">Speaker</th>
                <th className="p-2 border-b">Venue</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map(p => (
                <tr key={p._id} className="odd:bg-muted/30">
                  <td className="p-2 border-b">{p.title}</td>
                  <td className="p-2 border-b">{new Date(p.date).toLocaleString()}</td>
                  <td className="p-2 border-b">{p.type}</td>
                  <td className="p-2 border-b">{p.speaker}</td>
                  <td className="p-2 border-b">{p.venue}</td>
                  <td className="p-2 border-b space-x-2">
                    <button onClick={() => onApprove(p._id)} className="bg-green-600 text-white px-3 py-1 rounded">Approve</button>
                    <button onClick={() => onReject(p._id)} className="bg-red-600 text-white px-3 py-1 rounded">Reject</button>
                  </td>
                </tr>
              ))}
              {pending.length === 0 && (
                <tr>
                  <td className="p-3 text-center" colSpan={6}>No pending events</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
    
  );
};

export default CoordinatorOverview;
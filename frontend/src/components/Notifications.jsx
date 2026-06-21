import React, { useEffect, useState } from 'react';

export default function Notifications({ activeZone }) {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const res = await fetch(`${apiUrl}/api/notifications?region=${activeZone}`, {
          headers: { 'x-user-region': activeZone }
        });
        setNotifs(await res.json());
      } catch (e) {
        setNotifs([
          { id: 1, type: 'SYS', message: 'Offline fallback mode.', time: 'Now' }
        ]);
      }
    };
    fetchNotifs();
  }, [activeZone]);

  return (
    <div className="glass-panel fade-in" style={{padding: '32px'}}>
      <h2 style={{marginBottom: '24px', fontWeight: 600}}>Security Event Log Stream</h2>
      {notifs.map(n => (
        <div key={n.id} className="interactive-card" style={{display: 'flex', gap: '16px', padding: '16px', marginBottom: '8px', borderBottom: '1px solid var(--border-color)', borderRadius: '8px'}}>
          <span style={{color: 'var(--accent-cyan)', fontWeight: 700}}>[{n.type}]</span>
          <span style={{flex: 1}}>{n.message}</span>
          <span style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>{n.time}</span>
        </div>
      ))}
    </div>
  );
}

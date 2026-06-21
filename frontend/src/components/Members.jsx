import React, { useEffect, useState } from 'react';

export default function Members({ activeZone }) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const res = await fetch(`${apiUrl}/api/members?region=${activeZone}`, {
          headers: { 'x-user-region': activeZone }
        });
        setMembers(await res.json());
      } catch (e) {}
    };
    fetchMembers();
  }, [activeZone]);

  return (
    <div className="glass-panel fade-in" style={{padding: '32px'}}>
      <h2 style={{marginBottom: '24px'}}>IAM Role Directory</h2>
      <table className="data-table interactive-table">
        <thead><tr><th>Identity</th><th>Assigned Region</th><th>Cryptographic Token</th><th>Access</th></tr></thead>
        <tbody>
          {members.length > 0 ? members.map((m, i) => (
            <tr key={i}>
              <td style={{fontWeight: 500}}>{m.role}</td>
              <td>{m.region}</td>
              <td><code style={{color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '4px'}}>0x{Math.random().toString(16).substr(2, 8).toUpperCase()}...</code></td>
              <td style={{color: m.access === 'Full' ? 'var(--accent-cyan)' : 'var(--text-secondary)'}}>{m.access}</td>
            </tr>
          )) : (
            <tr><td colSpan="4">Loading IAM roles...</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

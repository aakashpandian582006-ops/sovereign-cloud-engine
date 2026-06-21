import React, { useEffect, useState } from 'react';
import { getMockAnalytics } from '../mockData';

export default function Analytics({ activeZone }) {
  const [stats, setStats] = useState({ throughput: '0 GB/s', latency: '0ms', packet_loss: '0%' });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const res = await fetch(`${apiUrl}/api/analytics?region=${activeZone}`, {
          headers: { 'x-user-region': activeZone }
        });
        if (res.ok) {
          setStats(await res.json());
        } else {
          setStats(getMockAnalytics());
        }
      } catch (e) {
        setStats(getMockAnalytics());
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 2000);
    return () => clearInterval(interval);
  }, [activeZone]);

  return (
    <div className="grid-2 fade-in">
      <div className="glass-panel interactive-card" style={{padding: '24px'}}>
        <h3 className="stat-label">Throughput Capacity ({activeZone})</h3>
        <div className="stat-value">{stats.throughput}</div>
        <div style={{height: '150px', display: 'flex', alignItems: 'flex-end', gap: '8px', marginTop: '20px'}}>
          {[4,6,5,8,7,9,6,8,5,7].map((h, i) => (
            <div key={i} className="bar-anim" style={{flex: 1, background: 'var(--accent-cyan)', height: `${h * 10}%`, opacity: 0.8, borderRadius: '4px 4px 0 0', animationDelay: `${i * 0.1}s`}}></div>
          ))}
        </div>
      </div>
      <div className="glass-panel interactive-card" style={{padding: '24px'}}>
        <h3 className="stat-label">Sync Latency</h3>
        <div className="stat-value" style={{marginTop: '40px', textAlign: 'center', fontSize: '5rem', textShadow: '0 0 20px rgba(0,240,255,0.3)'}}>
          {stats.latency}
        </div>
        <div style={{textAlign: 'center', color: 'var(--text-secondary)', marginTop: '20px'}}>Packet Loss: {stats.packet_loss}</div>
      </div>
    </div>
  );
}

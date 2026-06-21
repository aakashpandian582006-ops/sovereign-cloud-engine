import React, { useState } from 'react';

export default function Settings() {
  const [encryption, setEncryption] = useState(true);
  const [syncFreq, setSyncFreq] = useState('0ms');
  const [telemetry, setTelemetry] = useState(true);

  return (
    <div className="glass-panel fade-in" style={{padding: '40px', maxWidth: '800px'}}>
      <h2 style={{marginBottom: '32px'}}>Security & Sync Configuration</h2>
      
      <div className="interactive-card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '24px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--border-color)'}}>
        <div>
          <strong style={{display: 'block', fontSize: '1.1rem', marginBottom: '8px'}}>Encryption Standard</strong>
          <span style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Force AES-256-GCM for all cross-region payloads.</span>
        </div>
        <label className="toggle-switch">
          <input type="checkbox" checked={encryption} onChange={() => setEncryption(!encryption)} />
          <span className="slider"></span>
        </label>
      </div>

      <div className="interactive-card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '24px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--border-color)'}}>
        <div>
          <strong style={{display: 'block', fontSize: '1.1rem', marginBottom: '8px'}}>Aggregated Telemetry</strong>
          <span style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Send anonymized node performance data to global observer.</span>
        </div>
        <label className="toggle-switch">
          <input type="checkbox" checked={telemetry} onChange={() => setTelemetry(!telemetry)} />
          <span className="slider"></span>
        </label>
      </div>

      <div className="interactive-card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--border-color)'}}>
        <div>
          <strong style={{display: 'block', fontSize: '1.1rem', marginBottom: '8px'}}>Data Sync Interval</strong>
          <span style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Frequency of allowed localized node replication.</span>
        </div>
        <select className="lux-input" style={{width: '200px'}} value={syncFreq} onChange={(e)=>setSyncFreq(e.target.value)}>
          <option value="0ms">Real-Time (0ms)</option>
          <option value="500ms">Batched (500ms)</option>
          <option value="disabled">Disabled (Strict Isolation)</option>
        </select>
      </div>
    </div>
  );
}

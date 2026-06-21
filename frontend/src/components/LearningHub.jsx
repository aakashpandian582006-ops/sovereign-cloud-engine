import React from 'react';

export default function LearningHub({ activeZone }) {
  return (
    <div className="glass-panel fade-in" style={{padding: '40px', lineHeight: 1.8}}>
      <h2 style={{marginBottom: '24px', color: 'var(--text-primary)'}}>Infrastructure Architecture Mapping</h2>
      <p style={{color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '24px'}}>
        The Sovereign Cloud Engine utilizes a strictly isolated, decoupled multi-region AWS topology to ensure 100% data sovereignty.
      </p>
      
      <div className="interactive-card" style={{background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)'}}>
        <h3 style={{color: 'var(--accent-cyan)', marginBottom: '16px'}}>Data Isolation Guarantee</h3>
        <p style={{color: 'var(--text-secondary)'}}>
          All payloads routed through the <code style={{color: 'var(--accent-cyan)', background: 'rgba(0,240,255,0.1)', padding: '2px 8px', borderRadius: '4px'}}>{activeZone}</code> API Gateway are intercepted by our proprietary geographic middleware. 
          The backend container strictly maps to localized LocalStack DynamoDB instances. Cross-border replication is cryptographically blocked by default.
        </p>
      </div>
    </div>
  );
}

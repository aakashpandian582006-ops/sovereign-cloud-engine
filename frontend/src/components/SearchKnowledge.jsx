import React, { useState } from 'react';

export default function SearchKnowledge() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const records = [
    'AES-256 Encryption Standard Documentation',
    'GDPR Right to be Forgotten Workflows',
    'DynamoDB Throughput Provisioning Limits',
    'VPC Peering Isolation Strategies',
    'Data Residency Audit Playbook'
  ];

  return (
    <div className="glass-panel fade-in" style={{padding: '32px'}}>
      <h2 style={{marginBottom: '24px'}}>Search Architectural Records</h2>
      <input 
        type="text" 
        className="lux-input" 
        placeholder="Search compliance frameworks or architecture logs (e.g., 'GDPR')..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{marginBottom: '24px', fontSize: '1.1rem'}}
      />
      
      <div style={{minHeight: '200px'}}>
        {searchQuery ? (
          <div style={{background: 'rgba(0,0,0,0.3)', borderRadius: '12px', overflow: 'hidden'}}>
            {records.filter(r => r.toLowerCase().includes(searchQuery.toLowerCase())).map((r,i) => (
              <div key={i} className="interactive-card" style={{padding: '16px 24px', borderBottom: '1px solid var(--border-color)', cursor: 'pointer'}}>
                <span style={{color: 'var(--accent-cyan)'}}>📄</span> {r}
              </div>
            ))}
            {records.filter(r => r.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
              <div style={{padding: '24px', color: 'var(--text-secondary)'}}>No records found matching "{searchQuery}".</div>
            )}
          </div>
        ) : (
          <div style={{color: 'var(--text-secondary)', fontStyle: 'italic'}}>Enter a query to filter records.</div>
        )}
      </div>
    </div>
  );
}

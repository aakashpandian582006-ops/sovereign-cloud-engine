import React from 'react';

export default function KnowledgeManager({ activeZone }) {
  return (
    <div className="glass-panel fade-in" style={{padding: '32px'}}>
      <h2 style={{marginBottom: '24px'}}>Regulatory Compliance Rulesets</h2>
      <table className="data-table interactive-table">
        <thead><tr><th>Framework</th><th>Region</th><th>Status</th><th>Policy Constraint</th></tr></thead>
        <tbody>
          <tr>
            <td>GDPR</td>
            <td>eu-west-1</td>
            <td style={{color: activeZone === 'eu-west-1' ? 'var(--accent-cyan)' : 'var(--text-secondary)'}}>
              {activeZone === 'eu-west-1' ? 'Enforced' : 'Inactive'}
            </td>
            <td>Strict Data Locality</td>
          </tr>
          <tr>
            <td>DPDP Act</td>
            <td>ap-south-1</td>
            <td style={{color: activeZone === 'ap-south-1' ? 'var(--accent-cyan)' : 'var(--text-secondary)'}}>
              {activeZone === 'ap-south-1' ? 'Enforced' : 'Inactive'}
            </td>
            <td>India Localized Data Sink</td>
          </tr>
          <tr>
            <td>HIPAA</td>
            <td>us-east-1</td>
            <td style={{color: 'var(--text-secondary)'}}>Offline</td>
            <td>PHI Masking Required</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

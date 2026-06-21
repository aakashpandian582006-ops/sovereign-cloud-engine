import React, { useState } from 'react';

export default function HelpCenter() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="glass-panel fade-in" style={{padding: '40px', maxWidth: '800px'}}>
      <h2 style={{marginBottom: '24px'}}>Support Ticketing Interface</h2>
      <p style={{color: 'var(--text-secondary)', marginBottom: '32px'}}>Submit an expedited priority ticket to the global cloud operations team.</p>
      
      {submitted ? (
        <div style={{padding: '24px', background: 'rgba(0,240,255,0.1)', border: '1px solid var(--accent-cyan)', borderRadius: '12px', color: 'var(--accent-cyan)', textAlign: 'center'}}>
          <h3 style={{marginBottom: '8px'}}>✅ Priority Ticket Submitted</h3>
          <p>Ops Team has been notified. Tracking ID: REQ-{Math.floor(Math.random() * 10000)}</p>
        </div>
      ) : (
        <form className="ticket-form" onSubmit={handleSubmit}>
          <input type="text" className="lux-input" placeholder="Subject / Incident Title" required />
          <select className="lux-input" required>
            <option value="">Select Category...</option>
            <option value="breach">Boundary Containment Breach</option>
            <option value="latency">High Cross-Border Latency</option>
            <option value="iam">IAM Access Revocation</option>
          </select>
          <textarea className="lux-input" placeholder="Describe the containment breach or issue..." rows={6} required></textarea>
          <button type="submit" className="ticket-btn" style={{marginTop: '16px'}}>Submit Priority Ticket</button>
        </form>
      )}
    </div>
  );
}

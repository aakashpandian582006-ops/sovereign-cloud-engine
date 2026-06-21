import React, { useState } from 'react';
import Typewriter from './Typewriter';

export default function Dashboard({ telemetry, onAudit }) {
  const [auditState, setAuditState] = useState('idle');
  const [auditReport, setAuditReport] = useState(null);
  const [typingComplete, setTypingComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAudit = async () => {
    setAuditState('scanning');
    setTypingComplete(false);
    setCopied(false);
    try {
      const data = await onAudit();
      setAuditReport(data);
      setAuditState('complete');
    } catch (e) {
      setAuditState('idle');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(auditReport, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightJSON = (json) => {
    if (!json) return '';
    const str = JSON.stringify(json, null, 2);
    return str.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'json-number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'json-key';
            } else {
                cls = 'json-string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'json-boolean';
        } else if (/null/.test(match)) {
            cls = 'json-null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
  };

  return (
    <div className="module-container fade-in">
      <button className="ai-audit-btn glass-panel" onClick={handleAudit} disabled={auditState === 'scanning'}>
        {auditState === 'scanning' ? <span className="scanning-text">SCANNING INFRASTRUCTURE FABRIC...</span> : '⚡ Execute Automated AI Infrastructure Audit'}
      </button>

      {auditState === 'complete' && auditReport && (
        <div className="ai-report-box glass-panel fade-in" style={{ position: 'relative' }}>
          {typingComplete && (
            <button className="copy-btn fade-in" onClick={copyToClipboard}>
              {copied ? '✅ COPIED' : '📋 COPY REPORT'}
            </button>
          )}
          <div className="ai-typing">
            {!typingComplete ? (
              <Typewriter 
                text={JSON.stringify(auditReport, null, 2)} 
                speed={12} 
                onComplete={() => setTypingComplete(true)}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: highlightJSON(auditReport) }} />
            )}
          </div>
        </div>
      )}

      <div className="grid-3">
        <div className="stat-card glass-panel interactive-card">
          <div className="stat-label">Active Connection Streams</div>
          <div className="stat-value">{telemetry?.activeConnections || '---'}</div>
        </div>
        <div className="stat-card glass-panel interactive-card">
          <div className="stat-label">Fabric Health</div>
          <div className="stat-value" style={{color: 'var(--accent-cyan)'}}>{telemetry?.status || 'ONLINE'}</div>
        </div>
        <div className="stat-card glass-panel interactive-card">
          <div className="stat-label">Data Sink Status</div>
          <div className="stat-value">{telemetry?.dynamoDbStatus || 'SYNCING'}</div>
        </div>
      </div>

      <div className="glass-panel interactive-card" style={{padding: '24px'}}>
        <h3 className="stat-label">Live Gateway Telemetry</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Region Lock</th>
              <th>Resource Utilization</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Edge Router</td>
              <td>{telemetry?.region || 'Global'}</td>
              <td>CPU: {telemetry?.telemetry?.cpu || '0%'}</td>
              <td style={{color: 'var(--accent-cyan)'}}>ACTIVE</td>
            </tr>
            <tr>
              <td>Database Node</td>
              <td>{telemetry?.region || 'Global'}</td>
              <td>Mem: {telemetry?.telemetry?.memory || '0%'}</td>
              <td style={{color: 'var(--accent-cyan)'}}>ACTIVE</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

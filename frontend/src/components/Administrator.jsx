import React, { useState, useRef, useEffect } from 'react';

export default function Administrator({ activeZone }) {
  const [cliLogs, setCliLogs] = useState([
    'Sovereign OS v10.0.0 (Elite-Tier) initialized.',
    'Establishing secure link to primary fabric...',
    'READY. Type "help" for commands.'
  ]);
  const [cliInput, setCliInput] = useState('');
  const cliEndRef = useRef(null);

  useEffect(() => {
    if (cliEndRef.current) cliEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [cliLogs]);

  const handleCliSubmit = (e) => {
    e.preventDefault();
    if(!cliInput.trim()) return;
    const newLogs = [...cliLogs, `root@sovereign:~# ${cliInput}`];
    
    if (cliInput === 'clear') {
      setCliLogs([]);
    } else if (cliInput === 'status') {
      newLogs.push(`REGION: ${activeZone}`, `STATUS: ONLINE_SECURE`, `COMPLIANCE: VERIFIED`);
      setCliLogs(newLogs);
    } else if (cliInput === 'help') {
      newLogs.push(`Available commands:`, `  status - Check system health`, `  clear  - Clear terminal`, `  ping   - Ping active region`, `  audit  - Trigger manual compliance scan`);
      setCliLogs(newLogs);
    } else if (cliInput === 'ping') {
      newLogs.push(`Pinging ${activeZone} gateway...`, `64 bytes from ${activeZone}.local: icmp_seq=1 ttl=119 time=12.4 ms`, `64 bytes from ${activeZone}.local: icmp_seq=2 ttl=119 time=11.8 ms`);
      setCliLogs(newLogs);
    } else if (cliInput === 'audit') {
      newLogs.push(`[${new Date().toISOString()}] WARN: Checking headers...`, `[${new Date().toISOString()}] INFO: Intercepted x-user-region: ${activeZone}`, `[${new Date().toISOString()}] INFO: Applying structural isolation policy...`, `[${new Date().toISOString()}] SUCCESS: Verified 100% Data Sovereignty Compliance.`);
      setCliLogs(newLogs);
    } else {
      newLogs.push(`Command not found: ${cliInput}`);
      setCliLogs(newLogs);
    }
    setCliInput('');
  };

  return (
    <div className="glass-panel fade-in" style={{padding: '24px'}}>
      <h2 style={{marginBottom: '24px'}}>Secure Root Terminal Emulation</h2>
      <div className="cli-window">
        {cliLogs.map((log, i) => <div key={i}>{log}</div>)}
        <form className="cli-input-line" onSubmit={handleCliSubmit}>
          <span style={{color: 'var(--accent-cyan)'}}>root@sovereign:~#</span>
          <input type="text" className="cli-input" value={cliInput} onChange={(e) => setCliInput(e.target.value)} autoFocus />
        </form>
        <div ref={cliEndRef} />
      </div>
    </div>
  );
}

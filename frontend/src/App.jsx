import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [activeZone, setActiveZone] = useState('ap-south-1');
  const [telemetry, setTelemetry] = useState(null);
  const [loading, setLoading] = useState(false);

  const zones = [
    { id: 'ap-south-1', name: 'Mumbai Hub', icon: '🇮🇳' },
    { id: 'eu-west-1', name: 'Frankfurt Hub', icon: '🇩🇪' }
  ];

  useEffect(() => {
    fetchTelemetry(activeZone);
  }, [activeZone]);

  const fetchTelemetry = async (region) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/api/status/${region}`);
      if (response.ok) {
        const data = await response.json();
        setTelemetry(data);
      } else {
        setTelemetry({ status: 'OFFLINE', region, uptime: 'N/A', activeConnections: 0 });
      }
    } catch (error) {
      console.error("Failed to fetch telemetry", error);
      setTelemetry({ status: 'ERROR', region, uptime: 'N/A', activeConnections: 0 });
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Sovereign Cloud Operations Control</h1>
        <p>Active Management Hub & Data Sovereignty Auditor Gateway</p>
      </header>
      
      <main className="dashboard-grid">
        <section className="glass-panel">
          <h3>Multi-Region Fabric Selector</h3>
          <div className="region-list">
            {zones.map(zone => (
              <button 
                key={zone.id}
                className={`region-btn ${activeZone === zone.id ? 'active' : ''}`}
                onClick={() => setActiveZone(zone.id)}
              >
                <span>{zone.icon} {zone.name}</span>
                {activeZone === zone.id && <span>● Active</span>}
              </button>
            ))}
          </div>
        </section>

        <section className="glass-panel">
          <h3>Active Node Telemetry</h3>
          {loading || !telemetry ? (
            <div className="loading">Syncing secure connection...</div>
          ) : (
            <div className="telemetry-data">
              <div className="telemetry-item">
                <span className="telemetry-label">System Boundary Status</span>
                <span className="telemetry-value">
                  <span className={`status-indicator ${telemetry.status === 'ONLINE' ? 'status-online' : 'status-offline'}`}></span>
                  {telemetry.status}
                </span>
              </div>
              <div className="telemetry-item">
                <span className="telemetry-label">Connected Infrastructure Fabric</span>
                <span className="telemetry-value">{telemetry.region}</span>
              </div>
              <div className="telemetry-item">
                <span className="telemetry-label">Gateway Uptime</span>
                <span className="telemetry-value">{telemetry.uptime}</span>
              </div>
              <div className="telemetry-item">
                <span className="telemetry-label">Active Secure Connections</span>
                <span className="telemetry-value">{telemetry.activeConnections}</span>
              </div>
              {telemetry.dynamoDbStatus && (
                <div className="telemetry-item">
                  <span className="telemetry-label">DynamoDB Sink</span>
                  <span className="telemetry-value" style={{color: telemetry.dynamoDbStatus === 'Connected' ? '#22c55e' : '#ef4444'}}>
                    {telemetry.dynamoDbStatus}
                  </span>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

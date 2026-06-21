import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [activeZone, setActiveZone] = useState('ap-south-1');
  const [telemetry, setTelemetry] = useState(null);

  useEffect(() => {
    fetchTelemetry(activeZone);
  }, [activeZone]);

  const fetchTelemetry = async (region) => {
    try {
      // Using relative URL so it works when deployed via Vercel or locally
      // Make sure the API_URL points to the backend
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/status?region=${region}`, {
        headers: { 'x-user-region': region }
      });
      if (response.ok) {
        const data = await response.json();
        setTelemetry(data);
      }
    } catch (error) {
      console.error("Failed to fetch telemetry", error);
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar matching the screenshot */}
      <div className="sidebar">
        <div className="logo-area">
          🐝 SovereignEngine
        </div>
        <div className="nav-menu">
          <div className="nav-item active">Dashboard</div>
          <div className="nav-item">Notifications <span style={{marginLeft: 'auto', background: '#333', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem'}}>20</span></div>
          <div className="nav-item">Knowledge Manager</div>
          <div className="nav-item">Analytics</div>
          <div className="nav-item">Learning Hub</div>
          <div className="nav-item">Search knowledge</div>
          <div className="nav-item">Members</div>
        </div>
        <div style={{marginTop: 'auto'}} className="nav-menu">
          <div className="nav-item">⚙️ Settings</div>
          <div className="nav-item">❓ Help Center</div>
          <div className="nav-item" style={{marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '20px'}}>
            👤 Administrator
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="top-bar">
          <input type="text" className="search-bar" placeholder="Search..." />
          <div className="region-selector">
            <button 
              className={`region-btn ${activeZone === 'ap-south-1' ? 'active' : ''}`}
              onClick={() => setActiveZone('ap-south-1')}
            >
              Mumbai Hub (AP)
            </button>
            <button 
              className={`region-btn ${activeZone === 'eu-west-1' ? 'active' : ''}`}
              onClick={() => setActiveZone('eu-west-1')}
            >
              Frankfurt Hub (EU)
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-title">Active Secure Connections</div>
            <div className="stat-value">
              {telemetry ? telemetry.activeConnections.toLocaleString() : '---'}
              <span className="stat-change">+3.5% vs. last month</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Processed Cross-Border Requests</div>
            <div className="stat-value">
              {telemetry ? telemetry.telemetry.requests.toLocaleString() : '---'}
              <span className="stat-change">+5% vs. last month</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Gateway Uptime</div>
            <div className="stat-value">{telemetry ? telemetry.uptime : '---'}</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          <div className="chart-card">
            <div className="chart-title">Data Locality Compliance</div>
            <div className="donut-container">
              <div className="donut-arc"></div>
              <div className="donut-inner">
                <h2>{telemetry ? telemetry.complianceLevel.replace('_', ' ') : 'SYNC'}</h2>
                <div style={{fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px'}}>Policy Enforced</div>
              </div>
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-title">Traffic Engagement History</div>
            <div className="bar-chart-container">
              {[40, 70, 45, 90, 60, 80, 50, 100, 75, 85, 65, 95, 70, 80].map((h, i) => (
                <div key={i} className="bar" style={{height: `${h}%`}}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Node Telemetry Table */}
        <div className="chart-card">
          <div className="chart-title">Active Node Telemetry</div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Component / Tool</th>
                <th>Status</th>
                <th>Fabric Region</th>
                <th>Resource Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>System Boundary</td>
                <td className="status-online">{telemetry?.status || 'OFFLINE'}</td>
                <td>{telemetry?.region || '---'}</td>
                <td>CPU: {telemetry?.telemetry?.cpu || '0%'}</td>
              </tr>
              <tr>
                <td>DynamoDB Data Sink</td>
                <td className={telemetry?.dynamoDbStatus === 'Connected' ? 'status-online' : 'status-offline'}>
                  {telemetry?.dynamoDbStatus || 'Disconnected'}
                </td>
                <td>{telemetry?.region || '---'}</td>
                <td>Mem: {telemetry?.telemetry?.memory || '0%'}</td>
              </tr>
              <tr>
                <td>Gateway API Router</td>
                <td className="status-online">ONLINE</td>
                <td>Local Machine</td>
                <td>---</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default App;

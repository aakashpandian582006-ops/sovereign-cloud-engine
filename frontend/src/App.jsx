import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Notifications from './components/Notifications';
import KnowledgeManager from './components/KnowledgeManager';
import Analytics from './components/Analytics';
import LearningHub from './components/LearningHub';
import SearchKnowledge from './components/SearchKnowledge';
import Members from './components/Members';
import Settings from './components/Settings';
import HelpCenter from './components/HelpCenter';
import Administrator from './components/Administrator';
import { getMockTelemetry, getMockAudit } from './mockData';

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [activeZone, setActiveZone] = useState('ap-south-1');
  const [telemetry, setTelemetry] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const layoutRef = useRef(null);

  // Ambient Cursor Glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (layoutRef.current) {
        layoutRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
        layoutRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fetch Telemetry Data globally for Dashboard
  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const res = await fetch(`${apiUrl}/api/status?region=${activeZone}`, {
          headers: { 'x-user-region': activeZone }
        });
        if (res.ok) {
          setTelemetry(await res.json());
        } else {
          setTelemetry(getMockTelemetry(activeZone));
        }
      } catch (e) {
        setTelemetry(getMockTelemetry(activeZone));
      }
    };
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 3000);
    return () => clearInterval(interval);
  }, [activeZone]);

  const handleAudit = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await fetch(`${apiUrl}/api/audit?region=${activeZone}`, {
        headers: { 'x-user-region': activeZone }
      });
      if (res.ok) return await res.json();
      return getMockAudit(activeZone);
    } catch (e) {
      return getMockAudit(activeZone);
    }
  };

  const handleTabClick = (item) => {
    setActiveTab(item);
    setIsMobileMenuOpen(false); // Close menu on mobile after selection
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'Dashboard': return <Dashboard telemetry={telemetry} onAudit={handleAudit} />;
      case 'Notifications': return <Notifications activeZone={activeZone} />;
      case 'Knowledge Manager': return <KnowledgeManager activeZone={activeZone} />;
      case 'Analytics': return <Analytics activeZone={activeZone} />;
      case 'Learning Hub': return <LearningHub activeZone={activeZone} />;
      case 'Search knowledge': return <SearchKnowledge />;
      case 'Members': return <Members activeZone={activeZone} />;
      case 'Settings': return <Settings />;
      case 'Help Center': return <HelpCenter />;
      case 'Administrator': return <Administrator activeZone={activeZone} />;
      default: return <div>Select a module.</div>;
    }
  };

  const navItemsTop = ['Dashboard', 'Notifications', 'Knowledge Manager', 'Analytics', 'Learning Hub', 'Search knowledge', 'Members'];
  const navItemsBottom = ['Settings', 'Help Center', 'Administrator'];

  return (
    <div className="dashboard-layout" ref={layoutRef}>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar glass-panel ${isMobileMenuOpen ? 'open' : ''}`} style={{borderTop: 'none', borderBottom: 'none', borderLeft: 'none', borderRadius: 0}}>
        <div className="logo">
          <div className="logo-dot"></div>
          Sovereign<span style={{fontWeight: 300}}>OS</span>
        </div>
        
        <div className="nav-menu">
          {navItemsTop.map(item => (
            <div 
              key={item} 
              className={`nav-item ${activeTab === item ? 'active' : ''}`}
              onClick={() => handleTabClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
        
        <div className="nav-menu" style={{marginTop: 'auto', flex: 'none', overflowY: 'visible'}}>
          {navItemsBottom.map(item => (
            <div 
              key={item} 
              className={`nav-item ${activeTab === item ? 'active' : ''}`}
              onClick={() => handleTabClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="top-header">
          <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
            <button className="hamburger-btn" onClick={() => setIsMobileMenuOpen(true)}>
              ☰
            </button>
            <h1 className="page-title">{activeTab}</h1>
          </div>
          
          <div className="region-selector">
            <button 
              className={`region-btn ${activeZone === 'ap-south-1' ? 'active' : ''}`}
              onClick={() => setActiveZone('ap-south-1')}
            >
              AP-SOUTH-1
            </button>
            <button 
              className={`region-btn ${activeZone === 'eu-west-1' ? 'active' : ''}`}
              onClick={() => setActiveZone('eu-west-1')}
            >
              EU-WEST-1
            </button>
          </div>
        </div>

        {renderContent()}

      </div>
    </div>
  );
}

export default App;

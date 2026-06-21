export const getMockTelemetry = (activeZone) => ({
  status: 'ONLINE_SECURE',
  region: activeZone,
  complianceLevel: activeZone === 'eu-west-1' ? 'STRICT_GDPR' : 'STANDARD_AP',
  uptime: '99.99%',
  activeConnections: Math.floor(Math.random() * 500) + 1200,
  dynamoDbStatus: 'Connected',
  telemetry: {
    requests: Math.floor(Math.random() * 10000) + 20000,
    cpu: `${Math.floor(Math.random() * 40) + 20}%`,
    memory: `${Math.floor(Math.random() * 30) + 40}%`
  }
});

export const getMockAudit = (activeZone) => ({
  timestamp: new Date().toISOString(),
  engine: "Executive-AI-Integrity-Suite-v10",
  Data_Sovereignty_Verification: "PASSED_STRICT",
  Node_Integrity_Status: "ONLINE_SECURE",
  Compliance_Policy_Enforcement: activeZone === 'eu-west-1' ? 'STRICT_GDPR' : 'STANDARD_AP',
  HR_Executive_Readiness_Grade: "A+",
  metrics: {
    boundary_isolation: "VERIFIED",
    encryption_at_rest: "AES-256",
    transit_security: "TLS 1.3 Strict",
    unauthorized_access_attempts: 0
  }
});

export const getMockNotifications = (activeZone) => ([
  { id: 1, type: "SECURITY", message: `Boundary audit clear in ${activeZone}`, time: "Just now" },
  { id: 2, type: "SYSTEM", message: "Node auto-scaling event triggered", time: "2m ago" },
  { id: 3, type: "COMPLIANCE", message: `Sync verified for localized region`, time: "15m ago" }
]);

export const getMockAnalytics = () => ({
  throughput: `${(Math.random() * 5 + 1).toFixed(2)} GB/s`,
  latency: `${Math.floor(Math.random() * 20) + 5}ms`,
  packet_loss: "0.001%"
});

export const getMockMembers = (activeZone) => ([
  { role: "Root Admin", region: "Global", access: "Full" },
  { role: "Security Auditor", region: "Global", access: "Read-Only" },
  { role: "Data Engineer", region: activeZone, access: "Write" }
]);

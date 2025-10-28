import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLogStats, getLogs, type LogStats, type SendLog } from '../Logs/LogsService';
import "./Home.css";

export default function Home() {
  const [stats, setStats] = useState<LogStats | null>(null);
  const [recentLogs, setRecentLogs] = useState<SendLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, logsData] = await Promise.all([
        getLogStats(),
        getLogs()
      ]);
      setStats(statsData);
      // Get last 5 logs
      setRecentLogs(logsData.slice(0, 5));
    } catch {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <span className="status-badge success">SENT</span>;
      case 'failed':
        return <span className="status-badge error">FAILED</span>;
      case 'verified':
        return <span className="status-badge verified">VERIFIED</span>;
      case 'pending':
        return <span className="status-badge pending">PENDING</span>;
      default:
        return <span className="status-badge">{status.toUpperCase()}</span>;
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h2>Dashboard Overview</h2>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📧</div>
          <div className="stat-content">
            <h3>{stats?.sentToday || 0}</h3>
            <p>OTPs Sent Today</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>{stats?.templateCount || 0}</h3>
            <p>Templates</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔧</div>
          <div className="stat-content">
            <h3>{stats?.smtpCount || 0}</h3>
            <p>SMTP Configs</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔑</div>
          <div className="stat-content">
            <h3>{stats?.apiKeyCount || 0}</h3>
            <p>API Keys</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <Link to="/test-otp" className="action-btn primary">
            🚀 Send Test OTP
          </Link>
          <Link to="/templates/create" className="action-btn secondary">
            ➕ Create Template
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <div className="activity-header">
          <h3>Recent Activity</h3>
          <Link to="/logs" className="view-all-link">View All</Link>
        </div>

        {recentLogs.length === 0 ? (
          <div className="empty-activity">
            <p>No recent activity yet. Start by sending your first OTP!</p>
          </div>
        ) : (
          <div className="activity-list">
            {recentLogs.map((log) => (
              <div key={log.id} className="activity-item">
                <div className="activity-info">
                  <div className="activity-primary">
                    <span className="recipient">{log.recipient}</span>
                    <span className="subject">• {log.subject}</span>
                  </div>
                  <div className="activity-secondary">
                    <span className="timestamp">
                      {new Date(log.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="activity-status">
                  {getStatusBadge(log.currentStatus || 'pending')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

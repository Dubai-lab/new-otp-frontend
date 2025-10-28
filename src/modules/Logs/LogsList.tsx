import { useState, useEffect } from 'react';
import { getLogs, getLogStats, type SendLog, type LogStats } from './LogsService';
import "./LogsList.css";

export default function LogsList() {
  const [logs, setLogs] = useState<SendLog[]>([]);
  const [stats, setStats] = useState<LogStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'sent' | 'failed' | 'verified'>('all');

  useEffect(() => {
    fetchLogs();
    fetchStats();
  }, []);

  const fetchLogs = async () => {
    try {
      const data = await getLogs();
      setLogs(data);
    } catch {
      setError('Failed to load logs');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getLogStats();
      setStats(data);
    } catch {
      // Ignore stats fetch errors
    }
  };



  const getStatusTimeline = (log: SendLog) => {
    // Handle new format with statuses array
    if (log.statuses && log.statuses.length > 0) {
      return (
        <div className="status-timeline">
          {log.statuses.map((statusItem, index) => (
            <div key={index} className="status-item">
              <span className={`status-dot ${statusItem.status}`}></span>
              <span className="status-text">{statusItem.status.toUpperCase()}</span>
              <span className="status-time">
                {new Date(statusItem.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      );
    }

    // Handle old format with single status
    const status = log.currentStatus || 'pending';
    return (
      <div className="status-timeline">
        <div className="status-item">
          <span className={`status-dot ${status}`}></span>
          <span className="status-text">{status.toUpperCase()}</span>
          <span className="status-time">
            {new Date(log.createdAt).toLocaleTimeString()}
          </span>
        </div>
      </div>
    );
  };

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    return log.currentStatus === filter;
  });

  if (loading) return <div className="loading">Loading logs...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h2>Send Logs</h2>
        <div className="filter-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="sent">Sent</option>
            <option value="failed">Failed</option>
            <option value="verified">Verified</option>
          </select>
        </div>
      </div>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.sentToday}</h3>
            <p>Sent Today</p>
          </div>
          <div className="stat-card">
            <h3>{stats.failedCount}</h3>
            <p>Failed</p>
          </div>
          <div className="stat-card">
            <h3>{stats.smtpCount}</h3>
            <p>SMTP Configs</p>
          </div>
          <div className="stat-card">
            <h3>{stats.templateCount}</h3>
            <p>Templates</p>
          </div>
          <div className="stat-card">
            <h3>{stats.apiKeyCount}</h3>
            <p>API Keys</p>
          </div>
        </div>
      )}

      {filteredLogs.length === 0 ? (
        <div className="empty-state">
          <h3>No logs found</h3>
          <p>{filter === 'all' ? 'No send logs yet.' : `No ${filter} logs found.`}</p>
        </div>
      ) : (
        <div className="logs-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Subject</th>
                <th>OTP</th>
                <th>Provider</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.recipient}</td>
                  <td>{log.subject}</td>
                  <td>
                    {log.otp ? (
                      <code className="otp-code">{log.otp}</code>
                    ) : (
                      <span className="no-otp">-</span>
                    )}
                  </td>
                  <td>{log.provider}</td>
                  <td>{getStatusTimeline(log)}</td>
                  <td>{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

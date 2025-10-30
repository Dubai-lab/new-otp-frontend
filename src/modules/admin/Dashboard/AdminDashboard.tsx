import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../api/axios';
import Loader from '../../../components/UI/Loader';

interface SystemStats {
  users: number;
  smtpConfigs: number;
  apiKeys: number;
  templates: number;
  totalLogs: number;
  sentToday: number;
  failedCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="admin-actions">
        <Link to="/admin/plans" className="admin-action-btn">
          Manage Plans
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-number">{stats?.users || 0}</p>
        </div>

        <div className="stat-card">
          <h3>SMTP Configurations</h3>
          <p className="stat-number">{stats?.smtpConfigs || 0}</p>
        </div>

        <div className="stat-card">
          <h3>API Keys</h3>
          <p className="stat-number">{stats?.apiKeys || 0}</p>
        </div>

        <div className="stat-card">
          <h3>Templates</h3>
          <p className="stat-number">{stats?.templates || 0}</p>
        </div>

        <div className="stat-card">
          <h3>Total Logs</h3>
          <p className="stat-number">{stats?.totalLogs || 0}</p>
        </div>

        <div className="stat-card">
          <h3>Sent Today</h3>
          <p className="stat-number">{stats?.sentToday || 0}</p>
        </div>

        <div className="stat-card">
          <h3>Failed Count</h3>
          <p className="stat-number">{stats?.failedCount || 0}</p>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import Loader from '../../../components/UI/Loader';
import { useAuth } from '../../../context/AuthContext';

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
  const { logout } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/admin/plans" className="action-card">
            <h3>Manage Plans</h3>
            <p>Create, update, and delete subscription plans</p>
          </Link>
          <Link to="/admin/users" className="action-card">
            <h3>Manage Users</h3>
            <p>View, edit, and manage user accounts</p>
          </Link>
        </div>
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

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import Loader from '../../../components/UI/Loader';
import { useAuth } from '../../../context/AuthContext';
import '../../../styles/admin.css';

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
  const [assigningPlans, setAssigningPlans] = useState(false);
  const [assignMessage, setAssignMessage] = useState<string | null>(null);
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

  const handleAssignDefaultPlans = async () => {
    setAssigningPlans(true);
    setAssignMessage(null);
    try {
      const response = await axios.post('/api/admin/assign-default-plans');
      setAssignMessage(response.data.message || 'Default plans assigned successfully!');
      // Refresh stats to show updated data
      await fetchStats();
    } catch (error) {
      console.error('Failed to assign default plans:', error);
      const axiosError = error as { response?: { data?: { message?: string } } };
      setAssignMessage(axiosError.response?.data?.message || 'Failed to assign default plans');
    } finally {
      setAssigningPlans(false);
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

      {/* Database Maintenance Section */}
      <div className="maintenance-section">
        <h2>Database Maintenance</h2>
        <div className="maintenance-actions">
          <div className="maintenance-card">
            <h3>Fix User Plans</h3>
            <p>Assign default plans to users with invalid plan assignments</p>
            <button
              onClick={handleAssignDefaultPlans}
              disabled={assigningPlans}
              className={`maintenance-btn ${assigningPlans ? 'loading' : ''}`}
            >
              {assigningPlans ? 'Assigning...' : 'Assign Default Plans'}
            </button>
            {assignMessage && (
              <p className={`maintenance-message ${assignMessage.includes('Failed') ? 'error' : 'success'}`}>
                {assignMessage}
              </p>
            )}
          </div>
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

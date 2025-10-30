import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard.css";

export default function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate('/pricing');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">OTP SaaS</div>
      <div className="sidebar-plan">
        <div className="plan-name">Plan: {user?.plan?.name || 'Free'}</div>
        <button className="upgrade-button" onClick={handleUpgrade}>
          Upgrade
        </button>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="">Dashboard</NavLink>
        <NavLink to="templates">Templates</NavLink>
        <NavLink to="apikeys">API Keys</NavLink>
        <NavLink to="smtp">SMTP</NavLink>
        <NavLink to="logs">Logs</NavLink>
        <NavLink to="test-otp">Test OTP</NavLink>
        <NavLink to="settings">Settings</NavLink>
      </nav>
    </aside>
  );
}

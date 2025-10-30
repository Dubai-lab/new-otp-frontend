import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { getUserPlan, type UserPlan } from "../modules/Settings/PlanService";
import "../styles/dashboard.css";

export default function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState<UserPlan | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const plan = await getUserPlan();
        setCurrentPlan(plan);
      } catch (error) {
        console.error('Failed to fetch user plan:', error);
      }
    };

    fetchPlan();
  }, []);

  const handleUpgrade = () => {
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">OTP SaaS</div>
      <nav className="sidebar-nav">
        <NavLink to="">Dashboard</NavLink>
        <NavLink to="templates">Templates</NavLink>
        <NavLink to="apikeys">API Keys</NavLink>
        <NavLink to="smtp">SMTP</NavLink>
        <NavLink to="logs">Logs</NavLink>
        <NavLink to="test-otp">Test OTP</NavLink>
        <NavLink to="settings">Settings</NavLink>
        <div className="sidebar-plan">
          <div className="plan-name">Plan: {currentPlan?.name || user?.plan?.name || 'Free'}</div>
          <button className="upgrade-button" onClick={handleUpgrade}>
            Upgrade
          </button>
        </div>
      </nav>
    </aside>
  );
}

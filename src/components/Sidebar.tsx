import { NavLink } from "react-router-dom";
import "../styles/dashboard.css";

export default function Sidebar() {
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
      </nav>
    </aside>
  );
}

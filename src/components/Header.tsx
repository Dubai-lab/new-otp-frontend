import "../styles/dashboard.css";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="dashboard-header">
      <h2>Welcome, {user?.fullName || 'User'} 👋</h2>
      <div className="header-user">
        <img
          src={`https://ui-avatars.com/api/?name=${user?.fullName || 'User'}`}
          alt="User Avatar"
          className="user-avatar"
        />
        <span className="username">{user?.fullName || 'User'}</span>
        <button onClick={logout} className="logout-btn" style={{ marginLeft: '10px', padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
    </header>
  );
}

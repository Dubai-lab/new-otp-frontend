import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log('Submitting login form for:', form.email);
      const response = await login(form.email, form.password);
      console.log('Login successful, navigating to dashboard');

      // Check if user is admin and redirect accordingly
      if (response.user.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error('Login error:', err);
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left Side - Login Form */}
      <div className="auth-form-section">
        <div className="auth-form-container">
          <div className="auth-header">
            <Link to="/" className="back-link">← Back to Home</Link>
            <h1>Welcome Back 👋</h1>
            <p>Sign in to your OTP SaaS account</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="auth-btn primary" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="auth-links">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/register" className="auth-link">
                Create one
              </Link>
            </p>
            <p>
              <Link to="/forgot-password" className="auth-link">
                Forgot your password?
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="auth-features-section">
        <div className="features-content">
          <h2>Secure OTP Delivery Made Simple</h2>
          <p className="features-subtitle">
            Join thousands of developers who trust our platform for secure authentication
          </p>

          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon">🔐</div>
              <div className="feature-text">
                <h3>Bank-Level Security</h3>
                <p>Enterprise-grade encryption and secure OTP generation</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <div className="feature-text">
                <h3>Lightning Fast</h3>
                <p>Deliver OTPs in under 2 seconds with 99.9% uptime</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🎨</div>
              <div className="feature-text">
                <h3>Custom Templates</h3>
                <p>Branded email templates with full customization</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <div className="feature-text">
                <h3>Real-Time Analytics</h3>
                <p>Track delivery status and success rates instantly</p>
              </div>
            </div>
          </div>

          <div className="stats-preview">
            <div className="stat">
              <span className="stat-number">10M+</span>
              <span className="stat-label">OTPs Delivered</span>
            </div>
            <div className="stat">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
            <div className="stat">
              <span className="stat-number">2s</span>
              <span className="stat-label">Response Time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

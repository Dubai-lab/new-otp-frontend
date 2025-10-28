import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await register(form.fullName, form.email, form.password);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left Side - Register Form */}
      <div className="auth-form-section">
        <div className="auth-form-container">
          <div className="auth-header">
            <Link to="/" className="back-link">← Back to Home</Link>
            <h1>Create Account 📝</h1>
            <p>Join thousands of developers using our OTP platform</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
              />
            </div>

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
                placeholder="Create a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="auth-btn primary" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-links">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Sign in
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

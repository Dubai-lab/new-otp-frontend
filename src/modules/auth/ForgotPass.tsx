import { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "./AuthService";
import "./Auth.css";

export default function ForgotPass() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await AuthService.forgotPassword({ email });
      setMessage(response.message);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left Side - Forgot Password Form */}
      <div className="auth-form-section">
        <div className="auth-form-container">
          <div className="auth-header">
            <Link to="/" className="back-link">← Back to Home</Link>
            <h1>Forgot Password 🔒</h1>
            <p>Enter your email to receive a password reset OTP</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-btn primary" disabled={loading}>
              {loading ? "Sending..." : "Send Reset OTP"}
            </button>

            <div className="auth-links">
              <p>
                Remember your password?{" "}
                <Link to="/login" className="auth-link">
                  Sign in
                </Link>
              </p>
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="auth-link">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
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

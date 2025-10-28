import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('javascript');

  const codeExamples = {
    javascript: `// Send OTP using JavaScript
const sendOTP = async (email, templateId) => {
  const response = await fetch('https://api.otp-saas.com/v1/otp/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      recipient: email,
      templateId: templateId,
      variables: {
        companyName: 'Your Company'
      }
    })
  });

  const result = await response.json();
  console.log('OTP sent:', result);
};

// Verify OTP
const verifyOTP = async (email, otp) => {
  const response = await fetch('https://api.otp-saas.com/v1/otp/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      recipient: email,
      otp: otp
    })
  });

  const result = await response.json();
  return result.verified;
};`,

    curl: `# Send OTP via cURL
curl -X POST https://api.otp-saas.com/v1/otp/send \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "recipient": "user@example.com",
    "templateId": "your-template-id",
    "variables": {
      "companyName": "Your Company"
    }
  }'

# Verify OTP via cURL
curl -X POST https://api.otp-saas.com/v1/otp/verify \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "recipient": "user@example.com",
    "otp": "123456"
  }'`,

    python: `# Send OTP using Python
import requests

def send_otp(email, template_id, api_key):
    url = "https://api.otp-saas.com/v1/otp/send"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    data = {
        "recipient": email,
        "templateId": template_id,
        "variables": {
            "companyName": "Your Company"
        }
    }

    response = requests.post(url, json=data, headers=headers)
    return response.json()

def verify_otp(email, otp, api_key):
    url = "https://api.otp-saas.com/v1/otp/verify"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    data = {
        "recipient": email,
        "otp": otp
    }

    response = requests.post(url, json=data, headers=headers)
    return response.json()

# Usage
result = send_otp("user@example.com", "template-123", "your-api-key")
print("OTP sent:", result)`,

    php: `<?php
// Send OTP using PHP
function sendOTP($email, $templateId, $apiKey) {
    $url = 'https://api.otp-saas.com/v1/otp/send';
    $data = [
        'recipient' => $email,
        'templateId' => $templateId,
        'variables' => [
            'companyName' => 'Your Company'
        ]
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

// Verify OTP using PHP
function verifyOTP($email, $otp, $apiKey) {
    $url = 'https://api.otp-saas.com/v1/otp/verify';
    $data = [
        'recipient' => $email,
        'otp' => $otp
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

// Usage
$result = sendOTP('user@example.com', 'template-123', 'your-api-key');
echo 'OTP sent: ' . json_encode($result);
?>`
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>OTP SaaS Platform</h1>
          <p className="hero-subtitle">
            Secure, reliable, and easy-to-use OTP (One-Time Password) service for your applications.
            Send verification codes via email with customizable templates and real-time tracking.
          </p>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate('/register')}
            >
              Get Started Free
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="code-preview">
            <div className="code-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="code-content">
              <pre>
{`POST /v1/otp/send
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "recipient": "user@example.com",
  "templateId": "welcome-template",
  "variables": {
    "companyName": "Your Company"
  }
}

✅ OTP sent successfully!`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Powerful Features for Modern Applications</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📧</div>
              <h3>Email OTP Delivery</h3>
              <p>Send secure OTP codes via email with your own SMTP configuration or our reliable delivery service.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Custom Templates</h3>
              <p>Create beautiful, branded email templates with customizable headers, bodies, and footers.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔑</div>
              <h3>API Key Management</h3>
              <p>Generate and manage API keys with different permissions and usage limits.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Real-time Analytics</h3>
              <p>Track delivery status, success rates, and view detailed logs of all OTP attempts.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Enterprise Security</h3>
              <p>Bank-level security with encrypted communications and secure OTP generation.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>High Performance</h3>
              <p>Built with NestJS and optimized for high-throughput OTP delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="code-examples">
        <div className="container">
          <h2>Easy Integration</h2>
          <p>Integrate OTP functionality into your application in minutes with our simple REST API.</p>

          <div className="code-tabs">
            <div className="tab-buttons">
              {Object.keys(codeExamples).map((lang) => (
                <button
                  key={lang}
                  className={`tab-btn ${activeTab === lang ? 'active' : ''}`}
                  onClick={() => setActiveTab(lang)}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>

            <div className="code-display">
              <pre className={`language-${activeTab}`}>
                <code>{codeExamples[activeTab as keyof typeof codeExamples]}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="use-cases">
        <div className="container">
          <h2>Perfect for Every Use Case</h2>
          <div className="use-cases-grid">
            <div className="use-case">
              <h3>🔐 User Authentication</h3>
              <p>Secure login flows with email verification codes</p>
            </div>
            <div className="use-case">
              <h3>💳 Payment Verification</h3>
              <p>Confirm transactions with OTP validation</p>
            </div>
            <div className="use-case">
              <h3>📱 Account Recovery</h3>
              <p>Password reset and account security features</p>
            </div>
            <div className="use-case">
              <h3>🏢 Enterprise SSO</h3>
              <p>Multi-factor authentication for business applications</p>
            </div>
            <div className="use-case">
              <h3>🛒 E-commerce</h3>
              <p>Order confirmation and delivery verification</p>
            </div>
            <div className="use-case">
              <h3>📋 Form Submissions</h3>
              <p>Verify user identity before processing sensitive data</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat">
              <div className="stat-number">2s</div>
              <div className="stat-label">Response Time</div>
            </div>
            <div className="stat">
              <div className="stat-number">10M+</div>
              <div className="stat-label">OTPs Delivered</div>
            </div>
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Secure Your Application?</h2>
          <p>Join thousands of developers who trust our OTP service for their authentication needs.</p>
          <div className="cta-buttons">
            <button
              className="btn-primary large"
              onClick={() => navigate('/register')}
            >
              Start Free Trial
            </button>
            <button
              className="btn-secondary large"
              onClick={() => navigate('/login')}
            >
              View Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>OTP SaaS</h3>
              <p>Secure OTP delivery for modern applications</p>
            </div>
            <div className="footer-links">
              <div className="footer-section">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#docs">Documentation</a>
              </div>
              <div className="footer-section">
                <h4>Company</h4>
                <a href="#about">About</a>
                <a href="#blog">Blog</a>
                <a href="#careers">Careers</a>
              </div>
              <div className="footer-section">
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#contact">Contact</a>
                <a href="#status">Status</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 OTP SaaS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

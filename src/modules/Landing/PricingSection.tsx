import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  smtpLimit: number;
  templateLimit: number;
  apiKeyLimit: number;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    currency: 'USD',
    period: 'month',
    smtpLimit: 100,
    templateLimit: 5,
    apiKeyLimit: 2,
    features: [
      '100 SMTP requests/month',
      '5 email templates',
      '2 API keys',
      'Basic analytics',
      'Email support'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 29,
    currency: 'USD',
    period: 'month',
    smtpLimit: 5000,
    templateLimit: 50,
    apiKeyLimit: 10,
    features: [
      '5,000 SMTP requests/month',
      '50 email templates',
      '10 API keys',
      'Advanced analytics',
      'Priority support',
      'Custom templates',
      'Webhook notifications'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    currency: 'USD',
    period: 'month',
    smtpLimit: 25000,
    templateLimit: 200,
    apiKeyLimit: 50,
    features: [
      '25,000 SMTP requests/month',
      '200 email templates',
      '50 API keys',
      'Real-time analytics',
      '24/7 phone support',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee'
    ]
  }
];

export const PricingSection: React.FC = () => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month');

  const handlePlanSelect = (plan: Plan) => {
    if (plan.price === 0) {
      navigate('/register');
    } else {
      navigate('/register', { state: { selectedPlan: plan.id } });
    }
  };

  const getDisplayPrice = (plan: Plan) => {
    if (plan.price === 0) return 'Free';
    const price = billingPeriod === 'year' ? plan.price * 10 : plan.price;
    return `$${price}`;
  };

  const getPeriodLabel = (plan: Plan) => {
    if (plan.price === 0) return '';
    return billingPeriod === 'year' ? '/year' : '/month';
  };

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="pricing-header">
          <h2>Choose Your Plan</h2>
          <p>Start free and scale as you grow. Upgrade or downgrade at any time.</p>

          <div className="billing-toggle">
            <span className={billingPeriod === 'month' ? 'active' : ''}>Monthly</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={billingPeriod === 'year'}
                onChange={() => setBillingPeriod(billingPeriod === 'month' ? 'year' : 'month')}
              />
              <span className="slider"></span>
            </label>
            <span className={billingPeriod === 'year' ? 'active' : ''}>
              Yearly <span className="discount">Save 17%</span>
            </span>
          </div>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}

              <div className="pricing-card-header">
                <h3>{plan.name}</h3>
                <div className="price">
                  <span className="amount">{getDisplayPrice(plan)}</span>
                  <span className="period">{getPeriodLabel(plan)}</span>
                </div>
              </div>

              <div className="pricing-limits">
                <div className="limit-item">
                  <span className="limit-value">{plan.smtpLimit.toLocaleString()}</span>
                  <span className="limit-label">SMTP requests</span>
                </div>
                <div className="limit-item">
                  <span className="limit-value">{plan.templateLimit}</span>
                  <span className="limit-label">Templates</span>
                </div>
                <div className="limit-item">
                  <span className="limit-value">{plan.apiKeyLimit}</span>
                  <span className="limit-label">API keys</span>
                </div>
              </div>

              <ul className="pricing-features">
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <span className="check-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className="pricing-btn"
                onClick={() => handlePlanSelect(plan)}
              >
                {plan.price === 0 ? 'Get Started Free' : 'Start Free Trial'}
              </button>
            </div>
          ))}
        </div>

        <div className="pricing-footer">
          <p>All plans include 99.9% uptime SLA, real-time analytics, and secure OTP generation.</p>
          <p>Need a custom plan? <a href="#contact">Contact us</a> for enterprise pricing.</p>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailablePlans, type UserPlan } from '../../modules/Settings/PlanService';
import { useAuth } from '../../context/AuthContext';
import './LandingPage.css';

interface Plan extends UserPlan {
  features: string[];
  popular?: boolean;
}

export const PricingSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month');
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const availablePlans = await getAvailablePlans();
        const plansWithFeatures: Plan[] = availablePlans.map(plan => ({
          ...plan,
          features: getFeaturesForPlan(plan),
          popular: plan.name === 'Professional'
        }));
        setPlans(plansWithFeatures);
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const getFeaturesForPlan = (plan: UserPlan): string[] => {
    if (plan.price === 0) {
      return [
        `${plan.smtpLimit} SMTP requests/month`,
        `${plan.templateLimit} email templates`,
        `${plan.apiKeyLimit} API keys`,
        'Basic analytics',
        'Email support'
      ];
    } else if (plan.price < 50) {
      return [
        `${plan.smtpLimit.toLocaleString()} SMTP requests/month`,
        `${plan.templateLimit} email templates`,
        `${plan.apiKeyLimit} API keys`,
        'Advanced analytics',
        'Priority support',
        'Custom templates',
        'Webhook notifications'
      ];
    } else {
      return [
        `${plan.smtpLimit.toLocaleString()} SMTP requests/month`,
        `${plan.templateLimit} email templates`,
        `${plan.apiKeyLimit} API keys`,
        'Real-time analytics',
        '24/7 phone support',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantee'
      ];
    }
  };

  const handlePlanSelect = (plan: Plan) => {
    if (user) {
      // If user is logged in, upgrade their plan
      navigate('/settings', { state: { upgradePlan: plan.id } });
    } else {
      // If not logged in, go to register with plan selection
      if (plan.price === 0) {
        navigate('/register');
      } else {
        navigate('/register', { state: { selectedPlan: plan.id } });
      }
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

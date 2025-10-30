import { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import Loader from '../../../components/UI/Loader';
import toast from 'react-hot-toast';

interface Plan {
  id: string;
  name: string;
  otpLimit: number;
  smtpLimit: number;
  templateLimit: number;
  apiKeyLimit: number;
  price: number;
  currency: string;
  isDefault: boolean;
}

export default function PlansManagement() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    otpLimit: 0,
    smtpLimit: 0,
    templateLimit: 0,
    apiKeyLimit: 0,
    price: 0,
    currency: 'USD',
    isDefault: false,
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('/api/admin/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Failed to fetch plans:', error);
      toast.error('Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPlan) {
        await axios.patch(`/api/admin/plans/${editingPlan.id}`, formData);
        toast.success('Plan updated successfully');
      } else {
        await axios.post('/api/admin/plans', formData);
        toast.success('Plan created successfully');
      }
      fetchPlans();
      resetForm();
    } catch (error) {
      console.error('Failed to save plan:', error);
      toast.error('Failed to save plan');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this plan?')) return;

    try {
      await axios.delete(`/api/admin/plans/${id}`);
      toast.success('Plan deleted successfully');
      fetchPlans();
    } catch (error) {
      console.error('Failed to delete plan:', error);
      toast.error('Failed to delete plan');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      otpLimit: 0,
      smtpLimit: 0,
      templateLimit: 0,
      apiKeyLimit: 0,
      price: 0,
      currency: 'USD',
      isDefault: false,
    });
    setEditingPlan(null);
    setShowForm(false);
  };

  const startEdit = (plan: Plan) => {
    setFormData({
      name: plan.name,
      otpLimit: plan.otpLimit,
      smtpLimit: plan.smtpLimit,
      templateLimit: plan.templateLimit,
      apiKeyLimit: plan.apiKeyLimit,
      price: plan.price,
      currency: plan.currency,
      isDefault: plan.isDefault,
    });
    setEditingPlan(plan);
    setShowForm(true);
  };

  if (loading) return <Loader />;

  return (
    <div className="plans-management">
      <div className="header">
        <h1>Plans Management</h1>
        <button
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Plan'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="plan-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>OTP Limit:</label>
              <input
                type="number"
                value={formData.otpLimit}
                onChange={(e) => setFormData({ ...formData, otpLimit: Number(e.target.value) })}
                required
              />
            </div>

            <div className="form-group">
              <label>SMTP Limit:</label>
              <input
                type="number"
                value={formData.smtpLimit}
                onChange={(e) => setFormData({ ...formData, smtpLimit: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Template Limit:</label>
              <input
                type="number"
                value={formData.templateLimit}
                onChange={(e) => setFormData({ ...formData, templateLimit: Number(e.target.value) })}
                required
              />
            </div>

            <div className="form-group">
              <label>API Key Limit:</label>
              <input
                type="number"
                value={formData.apiKeyLimit}
                onChange={(e) => setFormData({ ...formData, apiKeyLimit: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
              />
            </div>

            <div className="form-group">
              <label>Currency:</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.isDefault}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
              />
              Default Plan
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingPlan ? 'Update Plan' : 'Create Plan'}
            </button>
            <button type="button" className="btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="plans-list">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>OTP Limit</th>
              <th>SMTP Limit</th>
              <th>Template Limit</th>
              <th>API Key Limit</th>
              <th>Price</th>
              <th>Default</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.id}>
                <td>{plan.name}</td>
                <td>{plan.otpLimit}</td>
                <td>{plan.smtpLimit}</td>
                <td>{plan.templateLimit}</td>
                <td>{plan.apiKeyLimit}</td>
                <td>{plan.price} {plan.currency}</td>
                <td>{plan.isDefault ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => startEdit(plan)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(plan.id)}
                    disabled={plan.isDefault}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

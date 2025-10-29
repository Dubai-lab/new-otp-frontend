import React from 'react';

interface UsageIndicatorProps {
  current: number;
  limit: number;
  label: string;
}

export const UsageIndicator: React.FC<UsageIndicatorProps> = ({ current, limit, label }) => {
  const percentage = (current / limit) * 100;
  const isNearLimit = percentage >= 80;

  return (
    <div className="usage-indicator">
      <div className="usage-label">{label}</div>
      <div className="usage-bar">
        <div
          className={`usage-fill ${isNearLimit ? 'near-limit' : ''}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="usage-text">{current} / {limit}</div>
    </div>
  );
};

import React from 'react';

interface UpgradePromptProps {
  feature: string;
  currentPlan: string;
}

export const UpgradePrompt: React.FC<UpgradePromptProps> = ({ feature, currentPlan }) => {
  return (
    <div className="upgrade-prompt">
      <h3>Limit Reached</h3>
      <p>You've reached the {feature} limit for your {currentPlan} plan.</p>
      <button className="upgrade-button">Upgrade Plan</button>
    </div>
  );
};

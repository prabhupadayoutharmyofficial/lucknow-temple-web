
import React from 'react';

interface QuestionMarkIconProps {
  className?: string;
}

export const QuestionMarkIcon: React.FC<QuestionMarkIconProps> = ({ className }) => {
  return (
    <div className={`w-16 h-16 rounded-full bg-krishna-gold/20 flex items-center justify-center ${className}`}>
      <span className="text-krishna-gold text-4xl font-bold">?</span>
    </div>
  );
};

import React from 'react';

export function ProgressBar({
  value = 0,
  max = 100,
  label = '',
  sublabel = '',
  size = 'md',
  showPercentage = true,
  className = ''
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / (max || 1)) * 100)));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  }[size] || 'h-2.5';

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage || sublabel) && (
        <div className="flex items-center justify-between mb-1.5 text-xs">
          {label && (
            <span className="font-semibold text-charcoal-800 dark:text-warm-100 truncate pr-2">
              {label}
            </span>
          )}
          <div className="flex items-center space-x-2 ml-auto text-charcoal-500 dark:text-charcoal-400 font-mono text-[11px]">
            {sublabel && <span>{sublabel}</span>}
            {showPercentage && (
              <span className="font-bold text-forest-700 dark:text-forest-400">
                {percentage}%
              </span>
            )}
          </div>
        </div>
      )}
      <div
        className={`w-full bg-warm-200 dark:bg-charcoal-800 rounded-full overflow-hidden ${heightClasses} border border-warm-300/40 dark:border-charcoal-700/60`}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-gradient-to-r from-forest-600 via-forest-500 to-sage-500 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

import React from 'react';

export function StatCard({
  title,
  value,
  subvalue,
  icon: Icon,
  trend,
  color = 'forest',
  onClick,
  className = ''
}) {
  const iconColorStyles = {
    forest: 'bg-forest-50 text-forest-700 dark:bg-forest-950/60 dark:text-forest-300 border-forest-200/60 dark:border-forest-800/60',
    sage: 'bg-sage-50 text-sage-700 dark:bg-sage-950/60 dark:text-sage-300 border-sage-200/60 dark:border-sage-800/60',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/60',
    blue: 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200/60 dark:border-sky-800/60',
    purple: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/60'
  }[color] || 'bg-forest-50 text-forest-700 dark:bg-forest-950/60 dark:text-forest-300 border-forest-200/60 dark:border-forest-800/60';

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-charcoal-900/90 border border-warm-200 dark:border-charcoal-800 rounded-xl p-4 md:p-5 shadow-sm hover:shadow transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-forest-300 dark:hover:border-forest-700' : ''
      } ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-lg border ${iconColorStyles}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-charcoal-900 dark:text-warm-50 font-sans">
          {value}
        </div>
        {trend && (
          <span className="text-xs font-medium text-forest-600 dark:text-forest-400">
            {trend}
          </span>
        )}
      </div>

      {subvalue && (
        <div className="mt-1 text-xs text-charcoal-500 dark:text-charcoal-400">
          {subvalue}
        </div>
      )}
    </div>
  );
}

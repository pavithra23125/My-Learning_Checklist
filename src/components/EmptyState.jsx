import React from 'react';

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) {
  return (
    <div className={`text-center py-12 px-4 rounded-xl border border-dashed border-warm-300 dark:border-charcoal-700 bg-warm-50/50 dark:bg-charcoal-900/40 ${className}`}>
      {Icon && (
        <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-xl bg-forest-50 dark:bg-forest-950/60 text-forest-700 dark:text-forest-400 mb-3 border border-forest-200/50 dark:border-forest-800/50">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="text-sm font-bold text-charcoal-800 dark:text-warm-100 mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-xs text-charcoal-500 dark:text-charcoal-400 max-w-sm mx-auto mb-4">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-lg text-white bg-forest-700 hover:bg-forest-800 dark:bg-forest-600 dark:hover:bg-forest-500 transition-colors shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

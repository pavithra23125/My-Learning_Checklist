import React from 'react';

export function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const sizeClasses = size === 'xs' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  let variantClasses = 'bg-warm-200 text-charcoal-700 dark:bg-charcoal-800 dark:text-warm-200';

  switch (variant) {
    case 'Completed':
    case 'success':
      variantClasses = 'bg-forest-100 text-forest-800 dark:bg-forest-900/60 dark:text-forest-300 border border-forest-200 dark:border-forest-800';
      break;
    case 'In Progress':
    case 'warning':
      variantClasses = 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50';
      break;
    case 'Revision Needed':
    case 'purple':
      variantClasses = 'bg-purple-50 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50';
      break;
    case 'High':
    case 'danger':
      variantClasses = 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50';
      break;
    case 'Medium':
      variantClasses = 'bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50';
      break;
    case 'Low':
      variantClasses = 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 border border-stone-200 dark:border-stone-700';
      break;
    case 'Roadmap':
      variantClasses = 'bg-forest-50 text-forest-800 dark:bg-forest-900/50 dark:text-forest-200 border border-forest-200 dark:border-forest-800';
      break;
    case 'Project':
      variantClasses = 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800';
      break;
    case 'Placement':
      variantClasses = 'bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300 border border-sky-200 dark:border-sky-800';
      break;
    case 'Revision':
      variantClasses = 'bg-indigo-50 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800';
      break;
    case 'My Task':
    case 'College Assignment':
      variantClasses = 'bg-orange-50 text-orange-800 dark:bg-orange-950/40 dark:text-orange-300 border border-orange-200 dark:border-orange-800';
      break;
    default:
      variantClasses = 'bg-warm-200/70 text-charcoal-700 dark:bg-charcoal-800 dark:text-warm-300 border border-warm-300/50 dark:border-charcoal-700';
      break;
  }

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${sizeClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
}

import React from 'react';
import { Menu, Sparkles, Plus, CalendarCheck, Compass } from 'lucide-react';
import { Badge } from './Badge';

export function Header({
  activeTab,
  onOpenSidebar,
  onOpenQuickTask,
  onOpenQuickPlan,
  stats
}) {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'roadmap': return 'Learning Roadmap';
      case 'daily-planner': return 'Daily Study Planner';
      case 'my-tasks': return 'My Tasks';
      case 'projects': return 'Project Tracker';
      case 'placement': return 'Placement Preparation';
      case 'portfolio': return 'Portfolio Tracker';
      case 'notes-resources': return 'Notes & Resources';
      case 'settings': return 'Settings & Backup';
      default: return 'My AI Engineer Journey';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-charcoal-900/90 backdrop-blur-md border-b border-warm-200 dark:border-charcoal-800 px-4 md:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 -ml-2 rounded-lg text-charcoal-600 dark:text-charcoal-300 hover:bg-warm-100 dark:hover:bg-charcoal-800 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-base md:text-lg font-extrabold text-charcoal-900 dark:text-warm-50 tracking-tight flex items-center gap-2">
            {getTabTitle()}
          </h2>
          <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400 hidden sm:block">
            Targeting AI/ML Engineer Roles & Campus Placements
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Current milestone indicator */}
        <div className="hidden md:flex items-center bg-warm-100 dark:bg-charcoal-800 rounded-lg px-2.5 py-1 text-xs text-charcoal-600 dark:text-charcoal-300 border border-warm-200 dark:border-charcoal-700">
          <span className="w-2 h-2 rounded-full bg-forest-500 mr-2 animate-pulse" />
          <span className="font-semibold text-charcoal-800 dark:text-warm-100 mr-1.5">Stage {stats.currentStage?.number}:</span>
          <span className="truncate max-w-[140px]">{stats.currentStage?.title}</span>
        </div>

        {/* Quick action: Plan Today */}
        <button
          onClick={onOpenQuickPlan}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-forest-800 dark:text-forest-200 bg-forest-50 dark:bg-forest-950/60 hover:bg-forest-100 dark:hover:bg-forest-900/80 border border-forest-200 dark:border-forest-800 transition-colors"
          title="Plan today's study schedule"
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Plan Today</span>
        </button>

        {/* Quick action: Add Task */}
        <button
          onClick={onOpenQuickTask}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-white bg-forest-800 hover:bg-forest-900 dark:bg-forest-600 dark:hover:bg-forest-500 transition-colors shadow-sm"
          title="Add a manual task"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}

import React from 'react';
import {
  LayoutDashboard,
  Compass,
  CalendarCheck,
  CheckSquare,
  FolderGit2,
  GraduationCap,
  Briefcase,
  BookOpen,
  Settings,
  Sparkles,
  ChevronRight,
  Sun,
  Moon,
  Flame
} from 'lucide-react';
import { ProgressBar } from './ProgressBar';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'roadmap', label: 'Learning Roadmap', icon: Compass },
  { id: 'daily-planner', label: 'Daily Study Planner', icon: CalendarCheck },
  { id: 'my-tasks', label: 'My Tasks', icon: CheckSquare },
  { id: 'projects', label: 'Project Tracker', icon: FolderGit2 },
  { id: 'placement', label: 'Placement Prep', icon: GraduationCap },
  { id: 'portfolio', label: 'Portfolio Tracker', icon: Briefcase },
  { id: 'notes-resources', label: 'Notes & Resources', icon: BookOpen },
  { id: 'settings', label: 'Settings & Backup', icon: Settings },
];

export function Sidebar({
  activeTab,
  setActiveTab,
  stats,
  settings,
  updateSettings,
  isOpen,
  onClose
}) {
  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-charcoal-950/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 md:w-72 bg-white dark:bg-charcoal-900 border-r border-warm-200 dark:border-charcoal-800 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* App Brand Header */}
        <div className="p-5 border-b border-warm-200 dark:border-charcoal-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-forest-800 dark:bg-forest-700 text-warm-50 flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-forest-200" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-charcoal-900 dark:text-warm-50 leading-tight tracking-tight">
                AI Engineer Journey
              </h1>
              <p className="text-[11px] font-medium text-forest-700 dark:text-forest-400">
                Personal Roadmap & Tracker
              </p>
            </div>
          </div>
        </div>

        {/* Current Active Milestone Card */}
        <div className="p-4 mx-3 my-2 bg-warm-100/80 dark:bg-charcoal-800/60 rounded-xl border border-warm-200/80 dark:border-charcoal-700/60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800 dark:text-forest-300 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
              Stage {stats.currentStage?.number || 1}
            </span>
            <span className="text-[10px] font-mono text-charcoal-500 dark:text-charcoal-400">
              {stats.completedTopics}/{stats.totalRoadmapTopics} Done
            </span>
          </div>
          <p className="text-xs font-semibold text-charcoal-800 dark:text-warm-100 truncate mb-2">
            {stats.currentStage?.title || 'Python Programming'}
          </p>
          <ProgressBar
            value={stats.roadmapProgress}
            max={100}
            size="sm"
            showPercentage={true}
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onClose) onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-forest-800 text-white dark:bg-forest-700 shadow-sm'
                    : 'text-charcoal-600 dark:text-charcoal-300 hover:bg-warm-100 dark:hover:bg-charcoal-800 hover:text-charcoal-900 dark:hover:text-warm-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-forest-200' : 'text-charcoal-400 dark:text-charcoal-400'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-forest-300" />}
              </button>
            );
          })}
        </nav>

        {/* User Profile & Theme Toggle Footer */}
        <div className="p-4 border-t border-warm-200 dark:border-charcoal-800 bg-warm-50/50 dark:bg-charcoal-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-forest-200 dark:bg-forest-800 text-forest-900 dark:text-forest-100 flex items-center justify-center font-bold text-xs">
                AI
              </div>
              <div>
                <p className="text-xs font-bold text-charcoal-900 dark:text-warm-100 leading-tight">
                  Final Year CSE
                </p>
                <p className="text-[10px] text-charcoal-500 dark:text-charcoal-400">
                  Target: July 2027
                </p>
              </div>
            </div>

            {/* Dark Mode Button */}
            <button
              onClick={() => updateSettings({ darkMode: !settings.darkMode })}
              aria-label="Toggle theme mode"
              className="p-2 rounded-lg text-charcoal-500 dark:text-charcoal-300 hover:bg-warm-200 dark:hover:bg-charcoal-800 transition-colors"
              title={settings.darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {settings.darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-forest-800" />
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

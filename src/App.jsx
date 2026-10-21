import React, { useState } from 'react';
import { useAppStore, getTodayDateString } from './hooks/useAppStore';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Modal } from './components/Modal';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Roadmap } from './pages/Roadmap';
import { DailyPlanner } from './pages/DailyPlanner';
import { MyTasks } from './pages/MyTasks';
import { Projects } from './pages/Projects';
import { PlacementPrep } from './pages/PlacementPrep';
import { PortfolioTracker } from './pages/PortfolioTracker';
import { NotesResources } from './pages/NotesResources';
import { SettingsBackup } from './pages/SettingsBackup';

export function App() {
  const store = useAppStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Quick Task Modal
  const [isQuickTaskOpen, setIsQuickTaskOpen] = useState(false);
  const [quickTaskForm, setQuickTaskForm] = useState({
    title: '',
    category: 'Roadmap',
    durationMinutes: 45,
    notes: ''
  });

  const handleOpenQuickTask = () => {
    setQuickTaskForm({
      title: '',
      category: 'Roadmap',
      durationMinutes: 45,
      notes: ''
    });
    setIsQuickTaskOpen(true);
  };

  const handleSaveQuickTask = (e) => {
    e.preventDefault();
    if (!quickTaskForm.title.trim()) return;
    const today = getTodayDateString();
    store.addDailyTask(today, {
      title: quickTaskForm.title.trim(),
      category: quickTaskForm.category,
      durationMinutes: Number(quickTaskForm.durationMinutes) || 45,
      notes: quickTaskForm.notes
    });
    setIsQuickTaskOpen(false);
    setActiveTab('daily-planner');
  };

  const handleQuickPlanToday = () => {
    const today = getTodayDateString();
    store.generateTodayPlan(today);
    setActiveTab('daily-planner');
  };

  if (!store.isLoaded) {
    return (
      <div className="min-h-screen bg-warm-100 dark:bg-charcoal-950 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-forest-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-charcoal-800 dark:text-warm-100">
            Loading My AI Engineer Journey...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-warm-100 dark:bg-charcoal-950 text-charcoal-900 dark:text-warm-100 font-sans transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={store.stats}
        settings={store.settings}
        updateSettings={store.updateSettings}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header
          activeTab={activeTab}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onOpenQuickTask={handleOpenQuickTask}
          onOpenQuickPlan={handleQuickPlanToday}
          stats={store.stats}
        />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              store={store}
              setActiveTab={setActiveTab}
              onOpenQuickTask={handleOpenQuickTask}
            />
          )}

          {activeTab === 'roadmap' && (
            <Roadmap store={store} />
          )}

          {activeTab === 'daily-planner' && (
            <DailyPlanner store={store} />
          )}

          {activeTab === 'my-tasks' && (
            <MyTasks store={store} />
          )}

          {activeTab === 'projects' && (
            <Projects store={store} />
          )}

          {activeTab === 'placement' && (
            <PlacementPrep store={store} />
          )}

          {activeTab === 'portfolio' && (
            <PortfolioTracker store={store} />
          )}

          {activeTab === 'notes-resources' && (
            <NotesResources store={store} />
          )}

          {activeTab === 'settings' && (
            <SettingsBackup store={store} />
          )}
        </main>
      </div>

      {/* Quick Add Task Modal */}
      {isQuickTaskOpen && (
        <Modal
          isOpen={isQuickTaskOpen}
          onClose={() => setIsQuickTaskOpen(false)}
          title="Quick Add Study Task"
        >
          <form onSubmit={handleSaveQuickTask} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Task Title *
              </label>
              <input
                type="text"
                required
                value={quickTaskForm.title}
                onChange={(e) => setQuickTaskForm({ ...quickTaskForm, title: e.target.value })}
                placeholder="e.g. Stage 1: Functions and keyword arguments"
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                  Category
                </label>
                <select
                  value={quickTaskForm.category}
                  onChange={(e) => setQuickTaskForm({ ...quickTaskForm, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
                >
                  <option value="Roadmap">Roadmap</option>
                  <option value="Project">Project</option>
                  <option value="Placement">Placement</option>
                  <option value="Revision">Revision</option>
                  <option value="My Task">My Task</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                  Duration (Mins)
                </label>
                <input
                  type="number"
                  min="5"
                  max="240"
                  value={quickTaskForm.durationMinutes}
                  onChange={(e) => setQuickTaskForm({ ...quickTaskForm, durationMinutes: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Notes
              </label>
              <textarea
                rows={2}
                value={quickTaskForm.notes}
                onChange={(e) => setQuickTaskForm({ ...quickTaskForm, notes: e.target.value })}
                placeholder="Study goals or notes..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-warm-200 dark:border-charcoal-800">
              <button
                type="button"
                onClick={() => setIsQuickTaskOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-warm-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-warm-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-forest-800 text-white hover:bg-forest-900 dark:bg-forest-700"
              >
                Add To Today's Plan
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import {
  Settings,
  Download,
  Upload,
  RotateCcw,
  Sun,
  Moon,
  Clock,
  Calendar,
  AlertTriangle,
  Database,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';

export function SettingsBackup({ store }) {
  const {
    settings,
    updateSettings,
    exportBackupJSON,
    importBackupJSON,
    resetAllData
  } = store;

  const [importStatus, setImportStatus] = useState(null); // { success: boolean, message: string }
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetConfirmationText, setResetConfirmationText] = useState('');

  // Handle JSON file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const res = importBackupJSON(content);
        if (res.success) {
          setImportStatus({ success: true, message: "Backup successfully imported and state restored!" });
        } else {
          setImportStatus({ success: false, message: `Import failed: ${res.error}` });
        }
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmReset = () => {
    if (resetConfirmationText.trim().toLowerCase() !== 'reset') {
      alert("Please type 'RESET' exactly to confirm data reset.");
      return;
    }
    resetAllData();
    setIsResetModalOpen(false);
    setResetConfirmationText('');
    setImportStatus({ success: true, message: "All progress data has been safely reset to clean defaults." });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-charcoal-900 dark:text-warm-50 tracking-tight">
          Application Settings & Data Backup
        </h1>
        <p className="text-xs md:text-sm text-charcoal-500 dark:text-charcoal-400 mt-0.5">
          Configure study capacity, milestone targets, theme appearance, and JSON export/import.
        </p>
      </div>

      {importStatus && (
        <div className={`p-4 rounded-xl border flex items-center justify-between text-xs font-semibold ${
          importStatus.success
            ? 'bg-forest-50 dark:bg-forest-950/40 border-forest-300 text-forest-900 dark:text-forest-200'
            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-900 dark:text-rose-200'
        }`}>
          <span>{importStatus.message}</span>
          <button onClick={() => setImportStatus(null)} className="font-bold underline ml-2">Dismiss</button>
        </div>
      )}

      {/* 1. Daily Study Capacity & Allocations */}
      <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center space-x-2.5 pb-3 border-b border-warm-200 dark:border-charcoal-800">
          <Clock className="w-5 h-5 text-forest-700 dark:text-forest-400" />
          <h2 className="text-sm md:text-base font-bold text-charcoal-900 dark:text-warm-50">
            Daily Study Capacity & Time Allocation
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Total Daily Study Target (Minutes)
            </label>
            <input
              type="number"
              min="30"
              max="360"
              step="15"
              value={settings.dailyCapacityMinutes || 120}
              onChange={(e) => updateSettings({ dailyCapacityMinutes: Number(e.target.value) || 120 })}
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
            <p className="text-[11px] text-charcoal-500 mt-1">
              Default is ~120 minutes (2 hours). Adjust during college exam weeks.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Roadmap Focus Sprints (Minutes)
            </label>
            <input
              type="number"
              min="15"
              max="180"
              value={settings.allocations?.roadmapMinutes || 75}
              onChange={(e) => updateSettings({
                allocations: { ...settings.allocations, roadmapMinutes: Number(e.target.value) || 75 }
              })}
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
            <p className="text-[11px] text-charcoal-500 mt-1">
              Time dedicated to core topic learning & code exercises.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Placement Prep Sprints (Minutes)
            </label>
            <input
              type="number"
              min="15"
              max="120"
              value={settings.allocations?.placementMinutes || 30}
              onChange={(e) => updateSettings({
                allocations: { ...settings.allocations, placementMinutes: Number(e.target.value) || 30 }
              })}
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
            <p className="text-[11px] text-charcoal-500 mt-1">
              DSA problem solving, SQL queries, or core CS theory.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Revision & Documentation (Minutes)
            </label>
            <input
              type="number"
              min="10"
              max="60"
              value={settings.allocations?.revisionMinutes || 15}
              onChange={(e) => updateSettings({
                allocations: { ...settings.allocations, revisionMinutes: Number(e.target.value) || 15 }
              })}
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
            <p className="text-[11px] text-charcoal-500 mt-1">
              Flashcards, reviewing mistakes, and GitHub commit logs.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Target Milestone Dates */}
      <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center space-x-2.5 pb-3 border-b border-warm-200 dark:border-charcoal-800">
          <Calendar className="w-5 h-5 text-forest-700 dark:text-forest-400" />
          <h2 className="text-sm md:text-base font-bold text-charcoal-900 dark:text-warm-50">
            Roadmap Timelines & Checkpoints
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Roadmap Start Date
            </label>
            <input
              type="date"
              value={settings.roadmapStartDate || "2026-10-01"}
              onChange={(e) => updateSettings({ roadmapStartDate: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Placement Readiness Checkpoint
            </label>
            <input
              type="date"
              value={settings.placementCheckpointDate || "2027-01-15"}
              onChange={(e) => updateSettings({ placementCheckpointDate: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Main AI Portfolio Completion Target
            </label>
            <input
              type="date"
              value={settings.portfolioMilestoneDate || "2027-03-31"}
              onChange={(e) => updateSettings({ portfolioMilestoneDate: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Final Placement & Application Window
            </label>
            <input
              type="date"
              value={settings.targetCompletionDate || "2027-07-31"}
              onChange={(e) => updateSettings({ targetCompletionDate: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>
        </div>
      </div>

      {/* 3. Theme Appearance */}
      <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-sm md:text-base font-bold text-charcoal-900 dark:text-warm-50">
          Appearance & Theme
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-charcoal-800 dark:text-warm-100">
              {settings.darkMode ? 'Dark Forest Mode' : 'Sage & Warm Off-White Light Mode'}
            </p>
            <p className="text-[11px] text-charcoal-500">
              Toggles high-contrast developer theme with forest green accents.
            </p>
          </div>

          <button
            onClick={() => updateSettings({ darkMode: !settings.darkMode })}
            className="px-4 py-2 text-xs font-bold rounded-xl border border-warm-200 dark:border-charcoal-700 bg-warm-50 dark:bg-charcoal-800 flex items-center space-x-2"
          >
            {settings.darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-forest-800" />}
            <span>{settings.darkMode ? 'Switch to Light' : 'Switch to Dark'}</span>
          </button>
        </div>
      </div>

      {/* 4. Local Persistence & Supabase Note */}
      <div className="bg-warm-100/70 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-750 rounded-2xl p-6 space-y-3">
        <div className="flex items-center space-x-2 text-forest-800 dark:text-forest-300 font-bold text-xs uppercase tracking-wider">
          <HardDrive className="w-4 h-4" />
          <span>Local Storage & Cloud Sync Readiness</span>
        </div>
        <p className="text-xs text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
          Your learning roadmap, daily study plans, project milestones, and notes are currently stored in your browser's persistent <span className="font-mono font-bold">localStorage</span>. Data is instantly saved on every interaction and will persist across browser restarts on this machine.
        </p>
        <p className="text-xs text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
          Note: Local browser storage does not automatically synchronize across separate phones or computers without an export. The data architecture is 100% prepared for Supabase PostgreSQL integration in future releases.
        </p>
      </div>

      {/* 5. Data Backup (Export & Import JSON) */}
      <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-sm md:text-base font-bold text-charcoal-900 dark:text-warm-50">
          Data Backup & Migration
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-warm-200 dark:border-charcoal-750 bg-warm-50/50 dark:bg-charcoal-850 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 font-bold text-xs text-charcoal-900 dark:text-warm-100 mb-1">
                <Download className="w-4 h-4 text-forest-700 dark:text-forest-400" />
                <span>Export Progress Backup</span>
              </div>
              <p className="text-[11px] text-charcoal-500 mb-3">
                Download a clean, structured JSON file containing all topic statuses, completed milestones, daily plans, and notes.
              </p>
            </div>
            <button
              onClick={exportBackupJSON}
              className="w-full py-2 px-3 text-xs font-bold rounded-xl bg-forest-800 hover:bg-forest-900 dark:bg-forest-700 text-white transition-colors"
            >
              Download JSON Backup
            </button>
          </div>

          <div className="p-4 rounded-xl border border-warm-200 dark:border-charcoal-750 bg-warm-50/50 dark:bg-charcoal-850 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 font-bold text-xs text-charcoal-900 dark:text-warm-100 mb-1">
                <Upload className="w-4 h-4 text-forest-700 dark:text-forest-400" />
                <span>Restore From JSON</span>
              </div>
              <p className="text-[11px] text-charcoal-500 mb-3">
                Restore your previous backup file. Schema validation prevents corrupted files from overwriting state.
              </p>
            </div>
            <label className="w-full py-2 px-3 text-xs font-bold rounded-xl border border-warm-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-charcoal-800 dark:text-warm-100 hover:bg-warm-100 dark:hover:bg-charcoal-700 transition-colors text-center cursor-pointer">
              <span>Select Backup File</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* 6. Danger Zone: Reset All Data */}
      <div className="border border-rose-200 dark:border-rose-900/40 rounded-2xl p-6 bg-rose-50/30 dark:bg-rose-950/20 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4" />
          Danger Zone
        </h2>
        <p className="text-xs text-charcoal-600 dark:text-charcoal-400">
          Reset all roadmap progress, study logs, projects, and notes back to initial clean state.
        </p>
        <button
          onClick={() => setIsResetModalOpen(true)}
          className="px-4 py-2 text-xs font-bold rounded-xl bg-rose-700 hover:bg-rose-800 text-white transition-colors"
        >
          Reset Application Data
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {isResetModalOpen && (
        <Modal
          isOpen={isResetModalOpen}
          onClose={() => setIsResetModalOpen(false)}
          title="Confirm Complete Data Reset"
        >
          <div className="space-y-4">
            <p className="text-xs text-charcoal-700 dark:text-charcoal-300 leading-relaxed">
              This will erase all recorded roadmap checks, daily study plans, project milestones, and notes from localStorage.
            </p>
            <p className="text-xs text-charcoal-700 dark:text-charcoal-300 font-bold">
              Type <span className="text-rose-600 font-mono">RESET</span> below to confirm:
            </p>
            <input
              type="text"
              value={resetConfirmationText}
              onChange={(e) => setResetConfirmationText(e.target.value)}
              placeholder="RESET"
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-mono font-bold"
            />
            <div className="flex justify-end space-x-2 pt-3 border-t border-warm-200 dark:border-charcoal-800">
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-warm-100 dark:bg-charcoal-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-700 hover:bg-rose-800 text-white"
              >
                Permanently Reset
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

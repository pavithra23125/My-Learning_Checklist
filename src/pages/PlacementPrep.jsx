import React, { useState } from 'react';
import {
  GraduationCap,
  Code2,
  Database,
  Cpu,
  Calculator,
  UserCheck,
  Briefcase,
  Plus,
  ExternalLink,
  Check,
  CheckCircle2,
  Clock,
  RotateCcw,
  Trash2,
  Edit2
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { Modal } from '../components/Modal';
import { EmptyState } from '../components/EmptyState';
import { getTodayDateString } from '../hooks/useAppStore';

export function PlacementPrep({ store }) {
  const {
    placementTopics,
    togglePlacementModuleItem,
    dsaProblems,
    addDsaProblem,
    updateDsaProblem,
    deleteDsaProblem,
    jobApplications,
    addJobApplication,
    updateJobApplication,
    deleteJobApplication
  } = store;

  // Active section tab
  const [activeSection, setActiveSection] = useState('dsa'); // 'dsa', 'sql', 'coreCs', 'aptitude', 'interview', 'jobs'

  // Modal states
  const [isDsaModalOpen, setIsDsaModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  // Forms
  const [dsaForm, setDsaForm] = useState({
    name: '',
    topic: 'Arrays & Hashing',
    difficulty: 'Easy',
    platformUrl: '',
    status: 'Solved',
    solvedStyle: 'Independent',
    timeTakenMinutes: 30,
    category: 'Beginner',
    mistakesLearnings: '',
    revisionDate: ''
  });

  const [jobForm, setJobForm] = useState({
    company: '',
    role: '',
    applicationUrl: '',
    dateApplied: getTodayDateString(),
    status: 'Applied',
    nextAction: '',
    notes: ''
  });

  const handleSaveDsa = (e) => {
    e.preventDefault();
    if (!dsaForm.name.trim()) return;
    addDsaProblem(dsaForm);
    setIsDsaModalOpen(false);
    setDsaForm({
      name: '',
      topic: 'Arrays & Hashing',
      difficulty: 'Easy',
      platformUrl: '',
      status: 'Solved',
      solvedStyle: 'Independent',
      timeTakenMinutes: 30,
      category: 'Beginner',
      mistakesLearnings: '',
      revisionDate: ''
    });
  };

  const handleSaveJob = (e) => {
    e.preventDefault();
    if (!jobForm.company.trim() || !jobForm.role.trim()) return;
    addJobApplication(jobForm);
    setIsJobModalOpen(false);
    setJobForm({
      company: '',
      role: '',
      applicationUrl: '',
      dateApplied: getTodayDateString(),
      status: 'Applied',
      nextAction: '',
      notes: ''
    });
  };

  const calculateSectionProgress = (items = []) => {
    if (items.length === 0) return 0;
    const completed = items.filter(i => i.completed).length;
    return Math.round((completed / items.length) * 100);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-charcoal-900 dark:text-warm-50 tracking-tight">
          Campus Placement & Interview Readiness
        </h1>
        <p className="text-xs md:text-sm text-charcoal-500 dark:text-charcoal-400 mt-0.5">
          Dedicated trackers for DSA, SQL, Core CS, Aptitude, Mock Interviews, and Job Applications.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex space-x-2 border-b border-warm-200 dark:border-charcoal-800 pb-2 overflow-x-auto">
        {[
          { id: 'dsa', label: 'Python & DSA Tracker', icon: Code2, count: placementTopics.dsaModules?.length },
          { id: 'sql', label: 'SQL Interview Prep', icon: Database, count: placementTopics.sqlModules?.length },
          { id: 'coreCs', label: 'Core CS (OOP/OS/CN/DBMS)', icon: Cpu, count: placementTopics.coreCsModules?.length },
          { id: 'aptitude', label: 'Aptitude & Reasoning', icon: Calculator, count: placementTopics.aptitudeModules?.length },
          { id: 'interview', label: 'Interview Readiness', icon: UserCheck, count: placementTopics.interviewModules?.length },
          { id: 'jobs', label: 'Job Applications', icon: Briefcase, count: jobApplications?.length }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-forest-800 text-white dark:bg-forest-700 shadow-sm'
                  : 'bg-white dark:bg-charcoal-900 text-charcoal-700 dark:text-warm-200 border border-warm-200 dark:border-charcoal-800 hover:bg-warm-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-forest-950/40 text-forest-200' : 'bg-warm-200 dark:bg-charcoal-800 text-charcoal-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 1. Python & DSA Tracker */}
      {activeSection === 'dsa' && (
        <div className="space-y-6">
          {/* DSA Topic Checklist */}
          <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-charcoal-900 dark:text-warm-50">
                  DSA Fundamentals Curriculum
                </h3>
                <p className="text-xs text-charcoal-500">
                  Targeted algorithms and patterns for technical coding rounds.
                </p>
              </div>
              <div className="w-44">
                <ProgressBar
                  value={calculateSectionProgress(placementTopics.dsaModules)}
                  max={100}
                  size="sm"
                  showPercentage={true}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {placementTopics.dsaModules.map(item => (
                <div
                  key={item.id}
                  onClick={() => togglePlacementModuleItem('dsaModules', item.id)}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    item.completed
                      ? 'bg-forest-50/50 dark:bg-forest-950/30 border-forest-200 dark:border-forest-800 text-forest-900 dark:text-forest-200'
                      : 'bg-warm-50/50 dark:bg-charcoal-850 border-warm-200 dark:border-charcoal-700 text-charcoal-800 dark:text-warm-100 hover:border-forest-400'
                  }`}
                >
                  <span className="text-xs font-semibold">{item.title}</span>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ml-2 ${
                    item.completed ? 'bg-forest-700 border-forest-700 text-white' : 'border-charcoal-400'
                  }`}>
                    {item.completed && <Check className="w-3 h-3" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solved Problems Log */}
          <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-charcoal-900 dark:text-warm-50">
                  DSA Solved Problems & Learnings Log ({dsaProblems.length})
                </h3>
                <p className="text-xs text-charcoal-500">
                  Record problem approaches, time taken, and key mistakes to revise before interview rounds.
                </p>
              </div>

              <button
                onClick={() => setIsDsaModalOpen(true)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-xl text-white bg-forest-800 hover:bg-forest-900 dark:bg-forest-700"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Problem</span>
              </button>
            </div>

            <div className="space-y-3">
              {dsaProblems.map(prob => (
                <div
                  key={prob.id}
                  className="p-4 rounded-xl border border-warm-200 dark:border-charcoal-800 bg-warm-50/30 dark:bg-charcoal-850 flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-extrabold text-charcoal-900 dark:text-warm-50">
                        {prob.name}
                      </span>
                      <Badge variant={prob.difficulty === 'Easy' ? 'success' : prob.difficulty === 'Medium' ? 'warning' : 'danger'} size="xs">
                        {prob.difficulty}
                      </Badge>
                      <Badge variant="Placement" size="xs">
                        {prob.topic}
                      </Badge>
                      <span className="text-[11px] font-mono text-charcoal-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {prob.timeTakenMinutes} mins ({prob.solvedStyle})
                      </span>
                    </div>

                    {prob.mistakesLearnings && (
                      <p className="text-xs text-charcoal-600 dark:text-charcoal-400 bg-white dark:bg-charcoal-900 p-2 rounded-lg border border-warm-200/60 dark:border-charcoal-750">
                        <span className="font-bold text-forest-700 dark:text-forest-400">Mistakes & Learnings: </span>
                        {prob.mistakesLearnings}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
                    {prob.platformUrl && (
                      <a
                        href={prob.platformUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-charcoal-500 hover:text-forest-700 hover:bg-warm-100 dark:hover:bg-charcoal-800"
                        title="Open on LeetCode / GFG"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => deleteDsaProblem(prob.id)}
                      className="p-1.5 rounded-lg text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      title="Delete problem"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. SQL Tracker */}
      {activeSection === 'sql' && (
        <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-charcoal-900 dark:text-warm-50">
                SQL Technical Interview Topics
              </h3>
              <p className="text-xs text-charcoal-500">
                Schema queries, joins, window functions, and database design.
              </p>
            </div>
            <div className="w-44">
              <ProgressBar
                value={calculateSectionProgress(placementTopics.sqlModules)}
                max={100}
                size="sm"
                showPercentage={true}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {placementTopics.sqlModules.map(item => (
              <div
                key={item.id}
                onClick={() => togglePlacementModuleItem('sqlModules', item.id)}
                className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                  item.completed
                    ? 'bg-forest-50/50 dark:bg-forest-950/30 border-forest-200 dark:border-forest-800 text-forest-900 dark:text-forest-200'
                    : 'bg-warm-50/50 dark:bg-charcoal-850 border-warm-200 dark:border-charcoal-700 text-charcoal-800 dark:text-warm-100 hover:border-forest-400'
                }`}
              >
                <span className="text-xs font-semibold">{item.title}</span>
                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ml-2 ${
                  item.completed ? 'bg-forest-700 border-forest-700 text-white' : 'border-charcoal-400'
                }`}>
                  {item.completed && <Check className="w-3 h-3" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Core CS Tracker */}
      {activeSection === 'coreCs' && (
        <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-charcoal-900 dark:text-warm-50">
                Core Computer Science Subjects
              </h3>
              <p className="text-xs text-charcoal-500">
                Essential theory asked in virtually all software engineering campus interviews.
              </p>
            </div>
            <div className="w-44">
              <ProgressBar
                value={calculateSectionProgress(placementTopics.coreCsModules)}
                max={100}
                size="sm"
                showPercentage={true}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {placementTopics.coreCsModules.map(item => (
              <div
                key={item.id}
                onClick={() => togglePlacementModuleItem('coreCsModules', item.id)}
                className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                  item.completed
                    ? 'bg-forest-50/50 dark:bg-forest-950/30 border-forest-200 dark:border-forest-800 text-forest-900 dark:text-forest-200'
                    : 'bg-warm-50/50 dark:bg-charcoal-850 border-warm-200 dark:border-charcoal-700 text-charcoal-800 dark:text-warm-100 hover:border-forest-400'
                }`}
              >
                <span className="text-xs font-semibold">{item.title}</span>
                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ml-2 ${
                  item.completed ? 'bg-forest-700 border-forest-700 text-white' : 'border-charcoal-400'
                }`}>
                  {item.completed && <Check className="w-3 h-3" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Aptitude Tracker */}
      {activeSection === 'aptitude' && (
        <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-charcoal-900 dark:text-warm-50">
                Aptitude & Logical Reasoning
              </h3>
              <p className="text-xs text-charcoal-500">
                Quantitative speed, analytical patterns, and verbal screening round readiness.
              </p>
            </div>
            <div className="w-44">
              <ProgressBar
                value={calculateSectionProgress(placementTopics.aptitudeModules)}
                max={100}
                size="sm"
                showPercentage={true}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {placementTopics.aptitudeModules.map(item => (
              <div
                key={item.id}
                onClick={() => togglePlacementModuleItem('aptitudeModules', item.id)}
                className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                  item.completed
                    ? 'bg-forest-50/50 dark:bg-forest-950/30 border-forest-200 dark:border-forest-800 text-forest-900 dark:text-forest-200'
                    : 'bg-warm-50/50 dark:bg-charcoal-850 border-warm-200 dark:border-charcoal-700 text-charcoal-800 dark:text-warm-100 hover:border-forest-400'
                }`}
              >
                <span className="text-xs font-semibold">{item.title}</span>
                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ml-2 ${
                  item.completed ? 'bg-forest-700 border-forest-700 text-white' : 'border-charcoal-400'
                }`}>
                  {item.completed && <Check className="w-3 h-3" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Interview Readiness Tracker */}
      {activeSection === 'interview' && (
        <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-charcoal-900 dark:text-warm-50">
                Behavioral & Architectural Interview Milestones
              </h3>
              <p className="text-xs text-charcoal-500">
                Self-pitch, resume review, project defense, and STAR stories.
              </p>
            </div>
            <div className="w-44">
              <ProgressBar
                value={calculateSectionProgress(placementTopics.interviewModules)}
                max={100}
                size="sm"
                showPercentage={true}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {placementTopics.interviewModules.map(item => (
              <div
                key={item.id}
                onClick={() => togglePlacementModuleItem('interviewModules', item.id)}
                className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                  item.completed
                    ? 'bg-forest-50/50 dark:bg-forest-950/30 border-forest-200 dark:border-forest-800 text-forest-900 dark:text-forest-200'
                    : 'bg-warm-50/50 dark:bg-charcoal-850 border-warm-200 dark:border-charcoal-700 text-charcoal-800 dark:text-warm-100 hover:border-forest-400'
                }`}
              >
                <span className="text-xs font-semibold">{item.title}</span>
                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ml-2 ${
                  item.completed ? 'bg-forest-700 border-forest-700 text-white' : 'border-charcoal-400'
                }`}>
                  {item.completed && <Check className="w-3 h-3" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Job Applications Tracker */}
      {activeSection === 'jobs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-charcoal-900 dark:text-warm-50">
                Job & Internship Application Pipeline ({jobApplications.length})
              </h3>
              <p className="text-xs text-charcoal-500">
                Track campus drive applications, off-campus referrals, and interview stages.
              </p>
            </div>

            <button
              onClick={() => setIsJobModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold rounded-xl text-white bg-forest-800 hover:bg-forest-900 dark:bg-forest-700"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Application</span>
            </button>
          </div>

          <div className="space-y-3">
            {jobApplications.length === 0 ? (
              <EmptyState
                icon={Briefcase}
                title="No job applications recorded yet"
                description="Keep track of every campus drive and AI engineering internship application."
                actionLabel="Record Your First Application"
                onAction={() => setIsJobModalOpen(true)}
              />
            ) : (
              jobApplications.map(app => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl border border-warm-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-extrabold text-charcoal-900 dark:text-warm-50">
                        {app.company}
                      </span>
                      <span className="text-xs font-semibold text-charcoal-600 dark:text-warm-200">
                        • {app.role}
                      </span>
                      <Badge variant={app.status === 'Offer' ? 'success' : app.status === 'Rejected' ? 'danger' : 'warning'} size="xs">
                        {app.status}
                      </Badge>
                    </div>

                    <div className="text-xs text-charcoal-500 flex flex-wrap items-center gap-3">
                      <span>Applied: {app.dateApplied}</span>
                      {app.nextAction && (
                        <span className="font-semibold text-forest-700 dark:text-forest-400">
                          Next Action: {app.nextAction}
                        </span>
                      )}
                    </div>

                    {app.notes && (
                      <p className="text-xs text-charcoal-600 dark:text-charcoal-400 bg-warm-50 dark:bg-charcoal-850 p-2 rounded-lg border border-warm-200/60 dark:border-charcoal-750">
                        {app.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
                    {app.applicationUrl && (
                      <a
                        href={app.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-charcoal-500 hover:text-forest-700 hover:bg-warm-100 dark:hover:bg-charcoal-800"
                        title="Open Application Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => deleteJobApplication(app.id)}
                      className="p-1.5 rounded-lg text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      title="Delete application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Log DSA Problem Modal */}
      <Modal
        isOpen={isDsaModalOpen}
        onClose={() => setIsDsaModalOpen(false)}
        title="Log DSA Problem"
      >
        <form onSubmit={handleSaveDsa} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Problem Name *
            </label>
            <input
              type="text"
              required
              value={dsaForm.name}
              onChange={(e) => setDsaForm({ ...dsaForm, name: e.target.value })}
              placeholder="e.g. Longest Substring Without Repeating Characters"
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Topic
              </label>
              <input
                type="text"
                value={dsaForm.topic}
                onChange={(e) => setDsaForm({ ...dsaForm, topic: e.target.value })}
                placeholder="e.g. Sliding Window / Two Pointers"
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Difficulty
              </label>
              <select
                value={dsaForm.difficulty}
                onChange={(e) => setDsaForm({ ...dsaForm, difficulty: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Solved Style
              </label>
              <select
                value={dsaForm.solvedStyle}
                onChange={(e) => setDsaForm({ ...dsaForm, solvedStyle: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              >
                <option value="Independent">Independently</option>
                <option value="With Help">With Help / Hints</option>
                <option value="Editorial">After Reading Editorial</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Time Taken (Mins)
              </label>
              <input
                type="number"
                value={dsaForm.timeTakenMinutes}
                onChange={(e) => setDsaForm({ ...dsaForm, timeTakenMinutes: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Platform URL (LeetCode, GFG, HackerRank)
            </label>
            <input
              type="url"
              value={dsaForm.platformUrl}
              onChange={(e) => setDsaForm({ ...dsaForm, platformUrl: e.target.value })}
              placeholder="https://leetcode.com/problems/..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Mistakes & Key Learnings (Crucial for Revision)
            </label>
            <textarea
              rows={2}
              value={dsaForm.mistakesLearnings}
              onChange={(e) => setDsaForm({ ...dsaForm, mistakesLearnings: e.target.value })}
              placeholder="e.g. Forgot edge case with empty string or negative values..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-warm-200 dark:border-charcoal-800">
            <button
              type="button"
              onClick={() => setIsDsaModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-warm-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-warm-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-forest-800 text-white hover:bg-forest-900 dark:bg-forest-700"
            >
              Save Problem
            </button>
          </div>
        </form>
      </Modal>

      {/* Record Job Application Modal */}
      <Modal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        title="Record Job Application"
      >
        <form onSubmit={handleSaveJob} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              required
              value={jobForm.company}
              onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
              placeholder="e.g. Google, Microsoft, AI Startup"
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Role *
            </label>
            <input
              type="text"
              required
              value={jobForm.role}
              onChange={(e) => setJobForm({ ...jobForm, role: e.target.value })}
              placeholder="e.g. Associate AI Engineer / Software Engineer"
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Application Status
              </label>
              <select
                value={jobForm.status}
                onChange={(e) => setJobForm({ ...jobForm, status: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              >
                <option value="Bookmarked">Bookmarked</option>
                <option value="Applied">Applied</option>
                <option value="Screening">Online Assessment / Screening</option>
                <option value="Technical Round">Technical Interview</option>
                <option value="Offer">Offer Received</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Date Applied
              </label>
              <input
                type="date"
                value={jobForm.dateApplied}
                onChange={(e) => setJobForm({ ...jobForm, dateApplied: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Application or Portal URL
            </label>
            <input
              type="url"
              value={jobForm.applicationUrl}
              onChange={(e) => setJobForm({ ...jobForm, applicationUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Next Action / Follow-up
            </label>
            <input
              type="text"
              value={jobForm.nextAction}
              onChange={(e) => setJobForm({ ...jobForm, nextAction: e.target.value })}
              placeholder="e.g. Revise System Design on Friday before round 2"
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-warm-200 dark:border-charcoal-800">
            <button
              type="button"
              onClick={() => setIsJobModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-warm-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-warm-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-forest-800 text-white hover:bg-forest-900 dark:bg-forest-700"
            >
              Save Application
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

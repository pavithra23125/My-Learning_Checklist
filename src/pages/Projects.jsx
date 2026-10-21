import React, { useState } from 'react';
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Github,
  Play,
  AlertTriangle,
  ShieldAlert,
  Layers,
  ChevronRight,
  BookOpen,
  Sparkles,
  Edit2,
  Check
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { Modal } from '../components/Modal';
import { ROADMAP_STAGES } from '../data/roadmapData';

export function Projects({ store }) {
  const {
    projects,
    toggleProjectMilestone,
    updateProjectDetails,
    topicStates,
    getTopicState
  } = store;

  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || 'proj-1');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  // Form state for project links & notes
  const [editForm, setEditForm] = useState({
    status: currentProject?.status || 'Not Started',
    githubUrl: currentProject?.githubUrl || '',
    demoUrl: currentProject?.demoUrl || '',
    screenshotRef: currentProject?.screenshotRef || '',
    notes: currentProject?.notes || ''
  });

  const handleOpenEdit = () => {
    setEditForm({
      status: currentProject.status,
      githubUrl: currentProject.githubUrl || '',
      demoUrl: currentProject.demoUrl || '',
      screenshotRef: currentProject.screenshotRef || '',
      notes: currentProject.notes || ''
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    updateProjectDetails(currentProject.id, editForm);
    setIsEditModalOpen(false);
  };

  // Compute prerequisites status for current project
  const prereqTopics = (currentProject.prerequisiteTopicIds || []).map(id => {
    // Find topic title in roadmap
    let topicObj = null;
    let stageObj = null;
    for (const stage of ROADMAP_STAGES) {
      for (const m of stage.modules) {
        const found = m.topics.find(t => t.id === id);
        if (found) {
          topicObj = found;
          stageObj = stage;
          break;
        }
      }
      if (topicObj) break;
    }
    const state = getTopicState(id);
    return {
      id,
      title: topicObj ? topicObj.title : id,
      stageNumber: stageObj ? stageObj.number : '?',
      completed: state.status === 'Completed'
    };
  });

  const completedPrereqs = prereqTopics.filter(t => t.completed).length;

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-charcoal-900 dark:text-warm-50 tracking-tight">
          AI & Software Engineering Project Tracker
        </h1>
        <p className="text-xs md:text-sm text-charcoal-500 dark:text-charcoal-400 mt-0.5">
          Six capstone engineering projects spanning Python OOP, Data Analytics, Supervised ML, Fraud Detection, Computer Vision, and RAG.
        </p>
      </div>

      {/* Project Selector Horizontal Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {projects.map((proj, idx) => {
          const isSelected = proj.id === selectedProjectId;
          const completedM = proj.milestones.filter(m => m.completed).length;
          const pct = Math.round((completedM / proj.milestones.length) * 100);

          return (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`flex-shrink-0 text-left p-3.5 rounded-2xl border transition-all w-60 sm:w-64 ${
                isSelected
                  ? 'bg-forest-900 text-white dark:bg-forest-800 border-forest-700 shadow-md ring-2 ring-forest-500/30'
                  : 'bg-white dark:bg-charcoal-900 text-charcoal-800 dark:text-warm-100 border-warm-200 dark:border-charcoal-800 hover:border-warm-300'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] mb-1.5 font-mono">
                <span className={isSelected ? 'text-forest-200' : 'text-forest-700 dark:text-forest-400 font-bold'}>
                  Project {idx + 1}
                </span>
                <span className={`text-[10px] ${isSelected ? 'text-forest-300' : 'text-charcoal-400'}`}>
                  {proj.targetPeriod}
                </span>
              </div>
              <p className="text-xs font-bold truncate leading-snug">
                {proj.title}
              </p>
              <div className="mt-2.5">
                <div className={`h-1.5 w-full rounded-full overflow-hidden ${isSelected ? 'bg-forest-950' : 'bg-warm-200 dark:bg-charcoal-800'}`}>
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${isSelected ? 'bg-forest-400' : 'bg-forest-600'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] mt-1 font-mono">
                  <span className={isSelected ? 'text-forest-300' : 'text-charcoal-400'}>{completedM}/{proj.milestones.length} Milestones</span>
                  <span className={`font-bold ${isSelected ? 'text-forest-200' : 'text-forest-700 dark:text-forest-400'}`}>{pct}%</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Project Full Details View */}
      {currentProject && (
        <div className="space-y-6">
          {/* Main Info Card */}
          <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-warm-200 dark:border-charcoal-800">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant={currentProject.status}>
                    {currentProject.status}
                  </Badge>
                  <span className="text-xs font-semibold text-charcoal-500 font-mono">
                    Target: {currentProject.targetPeriod}
                  </span>
                  <Badge variant="Project" size="xs">
                    {currentProject.category}
                  </Badge>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-charcoal-900 dark:text-warm-50">
                  {currentProject.title}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {currentProject.githubUrl && (
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-warm-100 hover:bg-warm-200 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 text-charcoal-800 dark:text-warm-100 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub Repo</span>
                    <ExternalLink className="w-3 h-3 text-charcoal-400" />
                  </a>
                )}
                {currentProject.demoUrl && (
                  <a
                    href={currentProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-forest-50 hover:bg-forest-100 dark:bg-forest-950/60 text-forest-800 dark:text-forest-200 border border-forest-200 dark:border-forest-800 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3 text-forest-600" />
                  </a>
                )}
                <button
                  onClick={handleOpenEdit}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-forest-800 hover:bg-forest-900 dark:bg-forest-700 text-white transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Links & Notes</span>
                </button>
              </div>
            </div>

            {/* Problem Statement & Objectives */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400">
                  Problem Statement
                </h3>
                <p className="text-xs md:text-sm text-charcoal-700 dark:text-charcoal-300 leading-relaxed bg-warm-50/70 dark:bg-charcoal-850 p-4 rounded-xl border border-warm-200/80 dark:border-charcoal-750">
                  {currentProject.problemStatement}
                </p>

                <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400 pt-2">
                  Required Technical Skills
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.requiredSkills.map(s => (
                    <span
                      key={s}
                      className="px-2.5 py-1 text-xs rounded-lg font-medium bg-warm-100 dark:bg-charcoal-800 text-charcoal-800 dark:text-warm-200 border border-warm-200 dark:border-charcoal-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400">
                  Core Project Objectives
                </h3>
                <ul className="space-y-2">
                  {currentProject.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start space-x-2.5 text-xs text-charcoal-700 dark:text-charcoal-300">
                      <span className="w-4 h-4 rounded-full bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-forest-200 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>

                {currentProject.datasetInfo && (
                  <div className="mt-3 p-3 rounded-xl bg-warm-100/60 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-xs">
                    <span className="font-bold text-charcoal-800 dark:text-warm-100 block mb-0.5">Dataset & Resource Source:</span>
                    <span className="text-charcoal-600 dark:text-charcoal-300">{currentProject.datasetInfo}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Prerequisite Roadmap Status */}
          <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-charcoal-900 dark:text-warm-50 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-forest-700 dark:text-forest-400" />
                  Prerequisite Roadmap Topics
                </h3>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  You can begin project milestones anytime without waiting for all prerequisites to be 100% complete.
                </p>
              </div>
              <span className="text-xs font-bold font-mono text-forest-700 dark:text-forest-400">
                {completedPrereqs} of {prereqTopics.length} Prerequisites Done
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
              {prereqTopics.map(p => (
                <div
                  key={p.id}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                    p.completed
                      ? 'bg-forest-50/50 dark:bg-forest-950/30 border-forest-200 dark:border-forest-900/60 text-forest-900 dark:text-forest-200'
                      : 'bg-warm-50/60 dark:bg-charcoal-850 border-warm-200 dark:border-charcoal-700 text-charcoal-700 dark:text-warm-200'
                  }`}
                >
                  <span className="truncate pr-2 font-medium">{p.title}</span>
                  {p.completed ? (
                    <Badge variant="Completed" size="xs">Done</Badge>
                  ) : (
                    <Badge variant="Not Started" size="xs">Pending</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Project Milestones Checklist */}
          <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-charcoal-900 dark:text-warm-50">
                  Project Milestones Checklist
                </h3>
                <p className="text-xs text-charcoal-500">
                  Mark each milestone as you build and test your codebase.
                </p>
              </div>

              <div className="w-48">
                <ProgressBar
                  value={currentProject.milestones.filter(m => m.completed).length}
                  max={currentProject.milestones.length}
                  size="sm"
                  showPercentage={true}
                />
              </div>
            </div>

            <div className="space-y-2.5">
              {currentProject.milestones.map((m, idx) => (
                <div
                  key={m.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-start space-x-3.5 ${
                    m.completed
                      ? 'bg-forest-50/40 dark:bg-forest-950/20 border-forest-200 dark:border-forest-900/40'
                      : 'bg-white dark:bg-charcoal-850 border-warm-200 dark:border-charcoal-700'
                  }`}
                >
                  <button
                    onClick={() => toggleProjectMilestone(currentProject.id, m.id)}
                    className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                      m.completed
                        ? 'bg-forest-700 border-forest-700 text-white'
                        : 'border-charcoal-300 dark:border-charcoal-600 hover:border-forest-600 bg-white dark:bg-charcoal-800'
                    }`}
                  >
                    {m.completed && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] text-charcoal-400 uppercase font-bold">
                        Milestone {idx + 1}
                      </span>
                      <span className={`text-xs md:text-sm font-bold ${
                        m.completed ? 'line-through text-charcoal-400 dark:text-charcoal-500' : 'text-charcoal-900 dark:text-warm-50'
                      }`}>
                        {m.title}
                      </span>
                    </div>
                    {m.description && (
                      <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1">
                        {m.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testing, Limitations & Ethical Considerations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Testing Checklist */}
            <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-600 dark:text-charcoal-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-forest-700 dark:text-forest-400" />
                Testing & Evaluation Checklist
              </h3>
              <ul className="space-y-2">
                {currentProject.testingChecklist.map((tc, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-charcoal-700 dark:text-charcoal-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest-600 mt-1.5 shrink-0" />
                    <span>{tc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Limitations & Ethics */}
            <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-5 shadow-sm space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  Engineering Limitations
                </h3>
                <ul className="space-y-1.5 text-xs text-charcoal-600 dark:text-charcoal-300">
                  {currentProject.limitations.map((lim, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-warm-200 dark:border-charcoal-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-1.5 mb-2">
                  <ShieldAlert className="w-4 h-4" />
                  Ethical & Responsible AI Considerations
                </h3>
                <ul className="space-y-1.5 text-xs text-charcoal-600 dark:text-charcoal-300">
                  {currentProject.ethicalConsiderations.map((eth, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                      <span>{eth}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Links & Notes Modal */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={`Edit Project Details: ${currentProject.title}`}
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Project Status
              </label>
              <select
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Needs Revision">Needs Revision</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={editForm.githubUrl}
                onChange={(e) => setEditForm({ ...editForm, githubUrl: e.target.value })}
                placeholder="https://github.com/username/repo-name"
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Live Demo / Streamlit / API URL (Optional)
              </label>
              <input
                type="url"
                value={editForm.demoUrl}
                onChange={(e) => setEditForm({ ...editForm, demoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Demo Screenshot Reference or Notes
              </label>
              <input
                type="text"
                value={editForm.screenshotRef}
                onChange={(e) => setEditForm({ ...editForm, screenshotRef: e.target.value })}
                placeholder="e.g. docs/screenshots/dashboard_preview.png"
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Architecture Notes & Lessons Learned
              </label>
              <textarea
                rows={3}
                value={editForm.notes}
                onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                placeholder="Key implementation details, design decisions, or benchmark numbers..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-warm-200 dark:border-charcoal-800">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-warm-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-warm-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-forest-800 text-white hover:bg-forest-900 dark:bg-forest-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

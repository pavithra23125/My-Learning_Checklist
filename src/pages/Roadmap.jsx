import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Clock,
  RotateCcw,
  ExternalLink,
  Edit3,
  Calendar,
  Sparkles,
  Bookmark,
  Check,
  Undo2
} from 'lucide-react';
import { ROADMAP_STAGES } from '../data/roadmapData';
import { ProgressBar } from '../components/ProgressBar';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';

export function Roadmap({ store }) {
  const { topicStates, getTopicState, updateTopicState, toggleTopicCompletion } = store;

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStageFilter, setSelectedStageFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState('all');

  // Accordion state: expanded modules { [moduleId]: boolean }
  const [expandedModules, setExpandedModules] = useState({
    's1-m1': true,
    's1-m2': true
  });

  // Topic edit modal state
  const [editingTopic, setEditingTopic] = useState(null);
  const [editFormData, setEditFormData] = useState({
    status: 'Not Started',
    priority: 'Medium',
    targetDate: '',
    estimatedMinutes: 45,
    notes: '',
    resourceUrl: '',
    revisionNeeded: false
  });

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const expandAllModules = () => {
    const all = {};
    ROADMAP_STAGES.forEach(s => s.modules.forEach(m => { all[m.id] = true; }));
    setExpandedModules(all);
  };

  const collapseAllModules = () => {
    setExpandedModules({});
  };

  const openEditModal = (topic, stageNumber) => {
    const current = getTopicState(topic.id);
    setEditingTopic({ ...topic, stageNumber });
    setEditFormData({
      status: current.status || 'Not Started',
      priority: current.priority || topic.priority || 'Medium',
      targetDate: current.targetDate || '',
      estimatedMinutes: current.estimatedMinutes || topic.estimatedMinutes || 45,
      notes: current.notes || '',
      resourceUrl: current.resourceUrl || '',
      revisionNeeded: !!current.revisionNeeded
    });
  };

  const handleSaveTopicEdit = () => {
    if (!editingTopic) return;
    updateTopicState(editingTopic.id, editFormData);
    setEditingTopic(null);
  };

  // Filtered Stages and Topics
  const filteredStages = useMemo(() => {
    return ROADMAP_STAGES.map(stage => {
      // Stage filter
      if (selectedStageFilter !== 'all' && stage.id !== selectedStageFilter) {
        return null;
      }

      const filteredModules = stage.modules.map(mod => {
        const filteredTopics = mod.topics.filter(topic => {
          const state = getTopicState(topic.id);
          const currentStatus = state.status || 'Not Started';
          const currentPriority = state.priority || topic.priority || 'Medium';

          // Status filter
          if (selectedStatusFilter !== 'all') {
            if (selectedStatusFilter === 'Revision Needed') {
              if (currentStatus !== 'Revision Needed' && !state.revisionNeeded) return false;
            } else if (currentStatus !== selectedStatusFilter) {
              return false;
            }
          }

          // Priority filter
          if (selectedPriorityFilter !== 'all' && currentPriority !== selectedPriorityFilter) {
            return false;
          }

          // Search query
          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const matchesTitle = topic.title.toLowerCase().includes(q);
            const matchesNotes = (state.notes || '').toLowerCase().includes(q);
            const matchesModule = mod.title.toLowerCase().includes(q);
            if (!matchesTitle && !matchesNotes && !matchesModule) return false;
          }

          return true;
        });

        return { ...mod, topics: filteredTopics };
      }).filter(mod => mod.topics.length > 0);

      if (filteredModules.length === 0) return null;
      return { ...stage, modules: filteredModules };
    }).filter(Boolean);
  }, [
    selectedStageFilter,
    selectedStatusFilter,
    selectedPriorityFilter,
    searchQuery,
    topicStates,
    getTopicState
  ]);

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Header & Description */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-charcoal-900 dark:text-warm-50 tracking-tight">
            Comprehensive Learning Roadmap
          </h1>
          <p className="text-xs md:text-sm text-charcoal-500 dark:text-charcoal-400 mt-1">
            Complete curriculum from Python fundamentals to Generative AI & Placement mastery (Oct 2026 – July 2027).
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={expandAllModules}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-charcoal-800 border border-warm-200 dark:border-charcoal-700 hover:bg-warm-100 transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAllModules}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-charcoal-800 border border-warm-200 dark:border-charcoal-700 hover:bg-warm-100 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, modules, or notes (e.g., 'Inheritance', 'Pandas', 'FastAPI')..."
            className="w-full pl-9 pr-4 py-2 text-xs md:text-sm rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 focus:outline-none focus:ring-2 focus:ring-forest-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
          {/* Stage Filter */}
          <select
            value={selectedStageFilter}
            onChange={(e) => setSelectedStageFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-800 dark:text-warm-100 font-medium focus:outline-none"
          >
            <option value="all">All Stages (1 to 11)</option>
            {ROADMAP_STAGES.map(s => (
              <option key={s.id} value={s.id}>
                Stage {s.number}: {s.title}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-800 dark:text-warm-100 font-medium focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Revision Needed">Revision Needed</option>
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriorityFilter}
            onChange={(e) => setSelectedPriorityFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-800 dark:text-warm-100 font-medium focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          {(searchQuery || selectedStageFilter !== 'all' || selectedStatusFilter !== 'all' || selectedPriorityFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStageFilter('all');
                setSelectedStatusFilter('all');
                setSelectedPriorityFilter('all');
              }}
              className="px-3 py-1.5 text-xs text-rose-700 dark:text-rose-400 font-bold hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Stages List */}
      <div className="space-y-6">
        {filteredStages.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl">
            <p className="text-sm font-semibold text-charcoal-600 dark:text-charcoal-400">
              No topics match your selected search or filter criteria.
            </p>
          </div>
        ) : (
          filteredStages.map((stage) => {
            // Compute real stage completion
            const allStageTopics = stage.modules.flatMap(m => m.topics);
            const completedCount = allStageTopics.filter(t => getTopicState(t.id).status === 'Completed').length;
            const stageProgress = allStageTopics.length > 0 ? Math.round((completedCount / allStageTopics.length) * 100) : 0;

            return (
              <div
                key={stage.id}
                className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                {/* Stage Header Banner */}
                <div className="p-5 md:p-6 bg-gradient-to-r from-warm-100/90 to-warm-50 dark:from-charcoal-850 dark:to-charcoal-900 border-b border-warm-200 dark:border-charcoal-800">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-forest-800 text-white font-mono text-[11px] font-bold">
                          STAGE {stage.number}
                        </span>
                        <span className="text-xs font-semibold text-forest-700 dark:text-forest-400">
                          {stage.targetPeriod}
                        </span>
                      </div>
                      <h2 className="text-lg md:text-xl font-extrabold text-charcoal-900 dark:text-warm-50 mt-1">
                        {stage.title}
                      </h2>
                      <p className="text-xs text-charcoal-500 dark:text-charcoal-400 max-w-2xl mt-0.5">
                        {stage.description}
                      </p>
                    </div>

                    <div className="w-full md:w-56">
                      <ProgressBar
                        value={stageProgress}
                        max={100}
                        size="md"
                        label="Stage Progress"
                        sublabel={`${completedCount}/${allStageTopics.length}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Modules under Stage */}
                <div className="divide-y divide-warm-200 dark:divide-charcoal-800">
                  {stage.modules.map((mod) => {
                    const isExpanded = !!expandedModules[mod.id];
                    const modCompleted = mod.topics.filter(t => getTopicState(t.id).status === 'Completed').length;
                    const modProgress = mod.topics.length > 0 ? Math.round((modCompleted / mod.topics.length) * 100) : 0;

                    return (
                      <div key={mod.id} className="transition-colors">
                        {/* Module Accordion Header */}
                        <button
                          onClick={() => toggleModule(mod.id)}
                          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-warm-50/70 dark:hover:bg-charcoal-850/50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-1 rounded text-charcoal-400 dark:text-charcoal-500">
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4 text-forest-700 dark:text-forest-400" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-charcoal-900 dark:text-warm-100">
                                {mod.title}
                              </h3>
                              <span className="text-[11px] text-charcoal-500 dark:text-charcoal-400 font-mono">
                                {modCompleted} of {mod.topics.length} completed
                              </span>
                            </div>
                          </div>

                          <div className="w-24 sm:w-32 hidden sm:block">
                            <ProgressBar
                              value={modProgress}
                              max={100}
                              size="sm"
                              showPercentage={true}
                            />
                          </div>
                        </button>

                        {/* Topics List */}
                        {isExpanded && (
                          <div className="px-5 pb-4 pt-1 space-y-2 bg-warm-50/30 dark:bg-charcoal-950/20">
                            {mod.topics.map((topic) => {
                              const state = getTopicState(topic.id);
                              const isCompleted = state.status === 'Completed';

                              return (
                                <div
                                  key={topic.id}
                                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border transition-all ${
                                    isCompleted
                                      ? 'bg-white/80 dark:bg-charcoal-900/60 border-forest-200 dark:border-forest-900/40'
                                      : 'bg-white dark:bg-charcoal-850 border-warm-200 dark:border-charcoal-750 hover:border-warm-300'
                                  }`}
                                >
                                  {/* Left: Checkbox & Title */}
                                  <div className="flex items-start space-x-3 flex-1 min-w-0 pr-3">
                                    <button
                                      onClick={() => toggleTopicCompletion(topic.id)}
                                      className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                                        isCompleted
                                          ? 'bg-forest-700 border-forest-700 text-white'
                                          : 'border-charcoal-300 dark:border-charcoal-600 hover:border-forest-600 bg-white dark:bg-charcoal-800'
                                      }`}
                                      title={isCompleted ? "Mark incomplete" : "Mark completed"}
                                    >
                                      {isCompleted && <Check className="w-3.5 h-3.5" />}
                                    </button>

                                    <div className="min-w-0">
                                      <p className={`text-xs md:text-sm font-semibold text-charcoal-900 dark:text-warm-100 ${
                                        isCompleted ? 'line-through text-charcoal-400 dark:text-charcoal-500' : ''
                                      }`}>
                                        {topic.title}
                                      </p>

                                      {/* Sub-meta */}
                                      <div className="flex flex-wrap items-center gap-2 mt-1">
                                        <Badge variant={state.status || 'Not Started'} size="xs">
                                          {state.status || 'Not Started'}
                                        </Badge>
                                        <Badge variant={state.priority || topic.priority} size="xs">
                                          {state.priority || topic.priority}
                                        </Badge>
                                        <span className="text-[11px] font-mono text-charcoal-500 dark:text-charcoal-400 flex items-center gap-1">
                                          <Clock className="w-3 h-3" />
                                          {topic.estimatedMinutes}m
                                        </span>
                                        {state.revisionNeeded && (
                                          <Badge variant="Revision Needed" size="xs">
                                            Revision Flagged
                                          </Badge>
                                        )}
                                        {state.targetDate && (
                                          <span className="text-[11px] text-charcoal-500 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {state.targetDate}
                                          </span>
                                        )}
                                        {state.resourceUrl && (
                                          <a
                                            href={state.resourceUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[11px] text-forest-700 dark:text-forest-400 hover:underline flex items-center gap-0.5"
                                          >
                                            <ExternalLink className="w-3 h-3" />
                                            Resource
                                          </a>
                                        )}
                                      </div>

                                      {/* Notes snippet if any */}
                                      {state.notes && (
                                        <p className="text-[11px] text-charcoal-600 dark:text-charcoal-400 mt-1.5 italic bg-warm-100/70 dark:bg-charcoal-800 p-1.5 rounded-lg border border-warm-200 dark:border-charcoal-700">
                                          "{state.notes}"
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Right Actions */}
                                  <div className="flex items-center space-x-2 mt-2 sm:mt-0 sm:ml-auto shrink-0 self-end sm:self-center">
                                    <button
                                      onClick={() => openEditModal(topic, stage.number)}
                                      className="p-1.5 rounded-lg text-charcoal-500 hover:text-charcoal-900 hover:bg-warm-100 dark:text-charcoal-400 dark:hover:text-warm-100 dark:hover:bg-charcoal-700 transition-colors"
                                      title="Edit topic status, target date, notes, resource URL"
                                    >
                                      <Edit3 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Topic Edit Modal */}
      {editingTopic && (
        <Modal
          isOpen={!!editingTopic}
          onClose={() => setEditingTopic(null)}
          title={`Edit Topic: ${editingTopic.title}`}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Learning Status
              </label>
              <select
                value={editFormData.status}
                onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Revision Needed">Revision Needed</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                  Priority
                </label>
                <select
                  value={editFormData.priority}
                  onChange={(e) => setEditFormData({ ...editFormData, priority: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                  Target Date (Optional)
                </label>
                <input
                  type="date"
                  value={editFormData.targetDate}
                  onChange={(e) => setEditFormData({ ...editFormData, targetDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Resource URL (Docs, Video, Tutorial)
              </label>
              <input
                type="url"
                value={editFormData.resourceUrl}
                onChange={(e) => setEditFormData({ ...editFormData, resourceUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Personal Notes & Code Observations
              </label>
              <textarea
                rows={3}
                value={editFormData.notes}
                onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                placeholder="Key syntax takeaways, edge cases, or interview tricks..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              />
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="revCheck"
                checked={editFormData.revisionNeeded}
                onChange={(e) => setEditFormData({ ...editFormData, revisionNeeded: e.target.checked })}
                className="rounded border-charcoal-300 text-forest-700 focus:ring-forest-600 w-4 h-4"
              />
              <label htmlFor="revCheck" className="text-xs font-medium text-charcoal-700 dark:text-warm-200">
                Flag this topic for upcoming Revision Queue
              </label>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-warm-200 dark:border-charcoal-800">
              <button
                type="button"
                onClick={() => setEditingTopic(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-warm-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-warm-200 hover:bg-warm-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveTopicEdit}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-forest-800 text-white hover:bg-forest-900 dark:bg-forest-700 transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

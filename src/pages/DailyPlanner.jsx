import React, { useState } from 'react';
import {
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  Edit2,
  Trash2,
  ArrowRight,
  Check,
  Undo2,
  RotateCcw,
  MoveRight
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { Modal } from '../components/Modal';
import { EmptyState } from '../components/EmptyState';
import { getTodayDateString } from '../hooks/useAppStore';

export function DailyPlanner({ store }) {
  const {
    dailyPlans,
    getTasksForDate,
    addDailyTask,
    updateDailyTask,
    deleteDailyTask,
    toggleTaskCompletion,
    rescheduleTask,
    generateTodayPlan,
    settings
  } = store;

  const todayStr = getTodayDateString();
  const [selectedDate, setSelectedDate] = useState(todayStr);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [reschedulingTask, setReschedulingTask] = useState(null);
  const [targetRescheduleDate, setTargetRescheduleDate] = useState(todayStr);

  // Form state
  const [taskForm, setTaskForm] = useState({
    title: '',
    category: 'Roadmap',
    durationMinutes: 45,
    actualMinutes: 0,
    notes: ''
  });

  const tasksForCurrentDate = getTasksForDate(selectedDate);

  // Calculate actual metrics for this specific day
  const plannedMinutes = tasksForCurrentDate.reduce((acc, t) => acc + (Number(t.durationMinutes) || 0), 0);
  const actualMinutes = tasksForCurrentDate.reduce((acc, t) => acc + (Number(t.actualMinutes) || (t.completed ? Number(t.durationMinutes) : 0)), 0);
  const completedCount = tasksForCurrentDate.filter(t => t.completed).length;
  const remainingCount = tasksForCurrentDate.length - completedCount;
  const progressPct = tasksForCurrentDate.length > 0
    ? Math.round((completedCount / tasksForCurrentDate.length) * 100)
    : 0;

  // Date navigation
  const navigateDay = (offset) => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    dateObj.setDate(dateObj.getDate() + offset);
    const ny = dateObj.getFullYear();
    const nm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const nd = String(dateObj.getDate()).padStart(2, '0');
    setSelectedDate(`${ny}-${nm}-${nd}`);
  };

  const handleOpenAdd = () => {
    setTaskForm({
      title: '',
      category: 'Roadmap',
      durationMinutes: 45,
      actualMinutes: 0,
      notes: ''
    });
    setIsAddModalOpen(true);
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;
    addDailyTask(selectedDate, {
      title: taskForm.title.trim(),
      category: taskForm.category,
      durationMinutes: Number(taskForm.durationMinutes) || 45,
      actualMinutes: Number(taskForm.actualMinutes) || 0,
      notes: taskForm.notes
    });
    setIsAddModalOpen(false);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      category: task.category,
      durationMinutes: task.durationMinutes,
      actualMinutes: task.actualMinutes || 0,
      notes: task.notes || ''
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingTask || !taskForm.title.trim()) return;
    updateDailyTask(selectedDate, editingTask.id, {
      title: taskForm.title.trim(),
      category: taskForm.category,
      durationMinutes: Number(taskForm.durationMinutes) || 45,
      actualMinutes: Number(taskForm.actualMinutes) || 0,
      notes: taskForm.notes
    });
    setEditingTask(null);
  };

  const handleOpenReschedule = (task) => {
    setReschedulingTask(task);
    // default to tomorrow
    const [y, m, d] = selectedDate.split('-').map(Number);
    const tmrw = new Date(y, m - 1, d);
    tmrw.setDate(tmrw.getDate() + 1);
    const ny = tmrw.getFullYear();
    const nm = String(tmrw.getMonth() + 1).padStart(2, '0');
    const nd = String(tmrw.getDate()).padStart(2, '0');
    setTargetRescheduleDate(`${ny}-${nm}-${nd}`);
  };

  const handleConfirmReschedule = () => {
    if (!reschedulingTask || !targetRescheduleDate) return;
    rescheduleTask(selectedDate, targetRescheduleDate, reschedulingTask.id);
    setReschedulingTask(null);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Header & Date Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-charcoal-900 dark:text-warm-50 tracking-tight">
            Daily Study Planner
          </h1>
          <p className="text-xs md:text-sm text-charcoal-500 dark:text-charcoal-400 mt-0.5">
            Structured 2-hour daily learning block with automated topic scheduling.
          </p>
        </div>

        {/* Date Selector Navigation */}
        <div className="flex items-center space-x-2 bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-xl p-1.5 shadow-sm">
          <button
            onClick={() => navigateDay(-1)}
            className="p-1.5 rounded-lg text-charcoal-600 dark:text-charcoal-300 hover:bg-warm-100 dark:hover:bg-charcoal-800 transition-colors"
            title="Previous Day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-2 py-1 text-xs font-bold text-charcoal-900 dark:text-warm-50 bg-transparent border-0 focus:outline-none"
          />

          {selectedDate !== todayStr && (
            <button
              onClick={() => setSelectedDate(todayStr)}
              className="text-[11px] font-bold px-2 py-0.5 rounded bg-forest-100 dark:bg-forest-900/60 text-forest-800 dark:text-forest-200 hover:bg-forest-200"
            >
              Today
            </button>
          )}

          <button
            onClick={() => navigateDay(1)}
            className="p-1.5 rounded-lg text-charcoal-600 dark:text-charcoal-300 hover:bg-warm-100 dark:hover:bg-charcoal-800 transition-colors"
            title="Next Day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Daily Progress & Metric Bar */}
      <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                Schedule for {selectedDate === todayStr ? 'Today' : selectedDate}
              </span>
              <Badge variant={progressPct === 100 && tasksForCurrentDate.length > 0 ? 'success' : 'default'} size="xs">
                {progressPct}% Completed
              </Badge>
            </div>
            <div className="mt-1 flex items-baseline space-x-4">
              <span className="text-xl md:text-2xl font-extrabold text-charcoal-900 dark:text-warm-50">
                {completedCount} of {tasksForCurrentDate.length} Tasks
              </span>
              <span className="text-xs text-charcoal-500">
                ({remainingCount} remaining)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono">
            <div className="text-right">
              <span className="text-charcoal-400 block text-[10px] uppercase font-bold">Planned Time</span>
              <span className="font-extrabold text-charcoal-800 dark:text-warm-100">{plannedMinutes} mins</span>
            </div>
            <div className="h-7 w-px bg-warm-200 dark:bg-charcoal-800" />
            <div className="text-right">
              <span className="text-forest-600 dark:text-forest-400 block text-[10px] uppercase font-bold">Actual Spent</span>
              <span className="font-extrabold text-forest-700 dark:text-forest-300">{actualMinutes} mins</span>
            </div>
          </div>
        </div>

        <ProgressBar
          value={progressPct}
          max={100}
          size="md"
          showPercentage={false}
        />
      </div>

      {/* Main Task Actions Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold rounded-xl text-white bg-forest-800 hover:bg-forest-900 dark:bg-forest-600 dark:hover:bg-forest-500 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Study Task</span>
          </button>

          <button
            onClick={() => generateTodayPlan(selectedDate)}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold rounded-xl text-forest-800 dark:text-forest-200 bg-forest-50 dark:bg-forest-950/60 hover:bg-forest-100 border border-forest-200 dark:border-forest-800 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-forest-600 dark:text-forest-400" />
            <span>Auto-Suggest Tasks</span>
          </button>
        </div>

        <span className="text-xs text-charcoal-500 font-medium hidden sm:inline">
          Capacity target: ~{settings.dailyCapacityMinutes || 120}m
        </span>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasksForCurrentDate.length === 0 ? (
          <EmptyState
            icon={CalendarCheck}
            title={`No study tasks for ${selectedDate === todayStr ? 'today' : selectedDate}`}
            description="Generate automated recommendations based on your next incomplete roadmap topic, placement prep, and revision queue."
            actionLabel="Generate Suggested 2-Hour Plan"
            onAction={() => generateTodayPlan(selectedDate)}
          />
        ) : (
          tasksForCurrentDate.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-2xl border transition-all ${
                task.completed
                  ? 'bg-warm-50/70 dark:bg-charcoal-900/50 border-warm-200 dark:border-charcoal-800 opacity-80'
                  : 'bg-white dark:bg-charcoal-900 border-warm-200 dark:border-charcoal-750 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Left check & details */}
                <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                  <button
                    onClick={() => toggleTaskCompletion(selectedDate, task.id)}
                    className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                      task.completed
                        ? 'bg-forest-700 border-forest-700 text-white'
                        : 'border-charcoal-300 dark:border-charcoal-600 hover:border-forest-600 bg-white dark:bg-charcoal-800'
                    }`}
                    title={task.completed ? "Mark unfinished" : "Mark completed"}
                  >
                    {task.completed && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <div className="min-w-0 flex-1">
                    <h3 className={`text-sm md:text-base font-bold text-charcoal-900 dark:text-warm-50 ${
                      task.completed ? 'line-through text-charcoal-400 dark:text-charcoal-500' : ''
                    }`}>
                      {task.title}
                    </h3>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <Badge variant={task.category} size="xs">
                        {task.category}
                      </Badge>
                      <span className="text-[11px] font-mono text-charcoal-500 dark:text-charcoal-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Planned: {task.durationMinutes}m
                      </span>
                      <span className="text-[11px] font-mono text-forest-700 dark:text-forest-400 flex items-center gap-1">
                        Actual: {task.actualMinutes || (task.completed ? task.durationMinutes : 0)}m
                      </span>
                      {task.rescheduledFrom && (
                        <span className="text-[10px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200/50">
                          Rescheduled from {task.rescheduledFrom}
                        </span>
                      )}
                    </div>

                    {task.notes && (
                      <p className="text-xs text-charcoal-600 dark:text-charcoal-400 mt-2 bg-warm-100/60 dark:bg-charcoal-850 p-2 rounded-lg border border-warm-200/80 dark:border-charcoal-700">
                        {task.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    onClick={() => handleOpenReschedule(task)}
                    className="p-1.5 rounded-lg text-charcoal-500 hover:text-charcoal-900 hover:bg-warm-100 dark:text-charcoal-400 dark:hover:text-warm-100 dark:hover:bg-charcoal-800 transition-colors"
                    title="Reschedule to another day"
                  >
                    <MoveRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(task)}
                    className="p-1.5 rounded-lg text-charcoal-500 hover:text-charcoal-900 hover:bg-warm-100 dark:text-charcoal-400 dark:hover:text-warm-100 dark:hover:bg-charcoal-800 transition-colors"
                    title="Edit task & record actual minutes"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteDailyTask(selectedDate, task.id)}
                    className="p-1.5 rounded-lg text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={`Add Study Task for ${selectedDate}`}
      >
        <form onSubmit={handleSaveAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={taskForm.title}
              onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
              placeholder="e.g. Stage 1: Lists & Comprehensions practice"
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Category
              </label>
              <select
                value={taskForm.category}
                onChange={(e) => setTaskForm({ ...taskForm, category: e.target.value })}
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
                Planned Duration (Mins)
              </label>
              <input
                type="number"
                min="5"
                max="300"
                value={taskForm.durationMinutes}
                onChange={(e) => setTaskForm({ ...taskForm, durationMinutes: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Notes or Objective
            </label>
            <textarea
              rows={2}
              value={taskForm.notes}
              onChange={(e) => setTaskForm({ ...taskForm, notes: e.target.value })}
              placeholder="What to accomplish in this study sprint..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-warm-200 dark:border-charcoal-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-warm-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-warm-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-forest-800 text-white hover:bg-forest-900 dark:bg-forest-700"
            >
              Add Task
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Task Modal */}
      {editingTask && (
        <Modal
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          title="Edit Study Task & Track Time"
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Task Title
              </label>
              <input
                type="text"
                required
                value={taskForm.title}
                onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                  Planned Minutes
                </label>
                <input
                  type="number"
                  value={taskForm.durationMinutes}
                  onChange={(e) => setTaskForm({ ...taskForm, durationMinutes: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-forest-700 dark:text-forest-400 mb-1">
                  Actual Minutes Spent
                </label>
                <input
                  type="number"
                  value={taskForm.actualMinutes}
                  onChange={(e) => setTaskForm({ ...taskForm, actualMinutes: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-forest-50/50 dark:bg-forest-950/40 border border-forest-300 dark:border-forest-800 text-forest-950 dark:text-forest-100 font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Category
              </label>
              <select
                value={taskForm.category}
                onChange={(e) => setTaskForm({ ...taskForm, category: e.target.value })}
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
                Notes
              </label>
              <textarea
                rows={2}
                value={taskForm.notes}
                onChange={(e) => setTaskForm({ ...taskForm, notes: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-warm-200 dark:border-charcoal-800">
              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-warm-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-warm-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-forest-800 text-white hover:bg-forest-900 dark:bg-forest-700"
              >
                Save Updates
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Reschedule Modal */}
      {reschedulingTask && (
        <Modal
          isOpen={!!reschedulingTask}
          onClose={() => setReschedulingTask(null)}
          title="Move Task Forward"
        >
          <div className="space-y-4">
            <p className="text-xs text-charcoal-600 dark:text-charcoal-300">
              Move "<span className="font-bold">{reschedulingTask.title}</span>" to another date without losing its record.
            </p>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Target Study Date
              </label>
              <input
                type="date"
                value={targetRescheduleDate}
                onChange={(e) => setTargetRescheduleDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-warm-200 dark:border-charcoal-800">
              <button
                type="button"
                onClick={() => setReschedulingTask(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-warm-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-warm-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReschedule}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-forest-800 text-white hover:bg-forest-900 dark:bg-forest-700"
              >
                Move Task
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Clock,
  Calendar,
  AlertCircle,
  Edit3,
  Trash2,
  Check,
  Undo2,
  CalendarPlus,
  ArrowUpDown
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { EmptyState } from '../components/EmptyState';
import { getTodayDateString } from '../hooks/useAppStore';

const CATEGORIES = [
  'College Assignment',
  'Exam Preparation',
  'Placement Drive',
  'Resume Editing',
  'Project Report',
  'Personal Learning',
  'Revision Session'
];

export function MyTasks({ store }) {
  const { manualTasks, addManualTask, updateManualTask, deleteManualTask, addDailyTask } = store;
  const todayStr = getTodayDateString();

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate', 'priority', 'created'

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'College Assignment',
    priority: 'Medium',
    dueDate: '',
    estimatedMinutes: 45,
    notes: ''
  });

  const handleOpenCreate = () => {
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      category: 'College Assignment',
      priority: 'Medium',
      dueDate: todayStr,
      estimatedMinutes: 45,
      notes: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      category: task.category || 'College Assignment',
      priority: task.priority || 'Medium',
      dueDate: task.dueDate || '',
      estimatedMinutes: task.estimatedMinutes || 45,
      notes: task.notes || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingTask) {
      updateManualTask(editingTask.id, {
        title: formData.title.trim(),
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
        dueDate: formData.dueDate,
        estimatedMinutes: Number(formData.estimatedMinutes) || 45,
        notes: formData.notes
      });
    } else {
      addManualTask({
        title: formData.title.trim(),
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
        dueDate: formData.dueDate,
        estimatedMinutes: Number(formData.estimatedMinutes) || 45,
        notes: formData.notes
      });
    }
    setIsModalOpen(false);
  };

  const toggleTaskStatus = (task) => {
    const nextStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    updateManualTask(task.id, { status: nextStatus });
  };

  // Quick schedule to Today's planner
  const scheduleIntoDailyPlan = (task) => {
    addDailyTask(todayStr, {
      title: `My Task: ${task.title}`,
      category: 'My Task',
      durationMinutes: task.estimatedMinutes || 45,
      notes: task.notes || task.description
    });
    alert(`"${task.title}" added to today's Daily Study Planner!`);
  };

  // Filter & sort logic
  const filteredTasks = useMemo(() => {
    return manualTasks.filter(task => {
      if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;
      if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
      if (statusFilter !== 'all' && task.status !== statusFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = task.title.toLowerCase().includes(q);
        const matchDesc = (task.description || '').toLowerCase().includes(q);
        if (!matchTitle && !matchDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      }
      if (sortBy === 'priority') {
        const weight = { High: 3, Medium: 2, Low: 1 };
        return (weight[b.priority] || 0) - (weight[a.priority] || 0);
      }
      return (b.id || '').localeCompare(a.id || '');
    });
  }, [manualTasks, categoryFilter, priorityFilter, statusFilter, searchQuery, sortBy]);

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-charcoal-900 dark:text-warm-50 tracking-tight">
            My Tasks & Deadlines
          </h1>
          <p className="text-xs md:text-sm text-charcoal-500 dark:text-charcoal-400 mt-0.5">
            Manual tracker for college assignments, exam prep, placement drives, and personal study sprints.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-bold rounded-xl text-white bg-forest-800 hover:bg-forest-900 dark:bg-forest-600 dark:hover:bg-forest-500 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Manual Task</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search manual tasks, assignments, notes..."
            className="w-full pl-9 pr-4 py-2 text-xs md:text-sm rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 focus:outline-none focus:ring-2 focus:ring-forest-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-800 dark:text-warm-100 font-medium focus:outline-none"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-800 dark:text-warm-100 font-medium focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-800 dark:text-warm-100 font-medium focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <div className="flex items-center space-x-1.5 ml-auto">
            <span className="text-charcoal-400 text-[11px] font-bold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2 py-1 rounded-lg bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-800 dark:text-warm-100 text-xs font-medium focus:outline-none"
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="created">Recently Added</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.length === 0 ? (
          <div className="col-span-full">
            <EmptyState
              icon={CheckSquare}
              title="No tasks found"
              description="Keep track of your college exams, placement registrations, and assignment deadlines."
              actionLabel="Add Your First Manual Task"
              onAction={handleOpenCreate}
            />
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.status === 'Completed';

            return (
              <div
                key={task.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-warm-50/70 dark:bg-charcoal-900/50 border-warm-200 dark:border-charcoal-800 opacity-80'
                    : 'bg-white dark:bg-charcoal-900 border-warm-200 dark:border-charcoal-750 shadow-sm hover:border-warm-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start space-x-3">
                      <button
                        onClick={() => toggleTaskStatus(task)}
                        className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                          isCompleted
                            ? 'bg-forest-700 border-forest-700 text-white'
                            : 'border-charcoal-300 dark:border-charcoal-600 hover:border-forest-600 bg-white dark:bg-charcoal-800'
                        }`}
                        title={isCompleted ? "Reopen task" : "Mark completed"}
                      >
                        {isCompleted && <Check className="w-3.5 h-3.5" />}
                      </button>
                      <div>
                        <h3 className={`text-sm font-bold text-charcoal-900 dark:text-warm-50 ${
                          isCompleted ? 'line-through text-charcoal-400 dark:text-charcoal-500' : ''
                        }`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <Badge variant={task.priority} size="xs">
                      {task.priority}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-warm-200/60 dark:border-charcoal-800 text-xs">
                    <Badge variant="My Task" size="xs">
                      {task.category}
                    </Badge>

                    {task.dueDate && (
                      <span className="text-[11px] font-mono text-charcoal-500 dark:text-charcoal-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Due: {task.dueDate}
                      </span>
                    )}

                    <span className="text-[11px] font-mono text-charcoal-500 dark:text-charcoal-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.estimatedMinutes}m
                    </span>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-warm-200/60 dark:border-charcoal-800">
                  <button
                    onClick={() => scheduleIntoDailyPlan(task)}
                    className="inline-flex items-center space-x-1 text-[11px] font-bold text-forest-700 dark:text-forest-400 hover:underline"
                    title="Add this task to today's daily study plan"
                  >
                    <CalendarPlus className="w-3.5 h-3.5" />
                    <span>Plan For Today</span>
                  </button>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleOpenEdit(task)}
                      className="p-1 rounded text-charcoal-400 hover:text-charcoal-700 dark:hover:text-warm-200"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(task.id)}
                      className="p-1 rounded text-charcoal-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <Modal
          isOpen={!!deleteConfirmId}
          onClose={() => setDeleteConfirmId(null)}
          title="Confirm Deletion"
        >
          <div className="space-y-4">
            <p className="text-xs text-charcoal-600 dark:text-charcoal-300">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-warm-100 dark:bg-charcoal-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteManualTask(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-700 text-white hover:bg-rose-800"
              >
                Delete Task
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? "Edit Manual Task" : "Add New Task"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Complete Operating Systems Deadlock Assignment"
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
              Description / Action Items
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Key deliverables or test scenarios..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-charcoal-400 mb-1">
                Est. Duration (Mins)
              </label>
              <input
                type="number"
                min="5"
                max="360"
                value={formData.estimatedMinutes}
                onChange={(e) => setFormData({ ...formData, estimatedMinutes: e.target.value })}
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
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="References or reminders..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-warm-50 dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700 text-charcoal-900 dark:text-warm-100 font-medium"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-warm-200 dark:border-charcoal-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-warm-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-warm-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-forest-800 text-white hover:bg-forest-900 dark:bg-forest-700"
            >
              {editingTask ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

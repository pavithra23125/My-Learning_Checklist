import React from 'react';
import {
  Compass,
  CheckCircle2,
  Clock,
  RotateCcw,
  FolderGit2,
  GraduationCap,
  CalendarCheck,
  TrendingUp,
  ArrowRight,
  Plus,
  Sparkles,
  BookOpen,
  Calendar,
  AlertCircle,
  FileCode2,
  CheckSquare
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { ProgressBar } from '../components/ProgressBar';
import { Badge } from '../components/Badge';
import { EmptyState } from '../components/EmptyState';
import { getTodayDateString } from '../hooks/useAppStore';

export function Dashboard({
  store,
  setActiveTab,
  onOpenQuickTask
}) {
  const { stats, dailyPlans, toggleTaskCompletion, generateTodayPlan, projects, notes, topicStates } = store;
  const todayStr = getTodayDateString();
  const todayTasks = dailyPlans[todayStr] || [];

  // Active project (first one with milestones remaining)
  const activeProject = projects.find(p => p.milestones.some(m => !m.completed)) || projects[0];
  const nextProjectMilestone = activeProject?.milestones.find(m => !m.completed);

  // Revision topics
  const revisionTopics = [];
  Object.entries(topicStates).forEach(([topicId, state]) => {
    if (state.revisionNeeded || state.status === "Revision Needed") {
      revisionTopics.push({ topicId, ...state });
    }
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* 1. Welcome Area */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest-900 via-forest-800 to-forest-950 text-white p-6 md:p-8 shadow-md border border-forest-800/80">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-700/60 border border-forest-600/50 text-forest-200 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-forest-300" />
              <span>Target: AI/ML Engineer & Campus Placement Readiness</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-warm-50 font-sans">
              My AI Engineer Journey
            </h1>
            <p className="mt-2 text-sm text-forest-200/90 leading-relaxed">
              Stage {stats.currentStage?.number || 1}: <span className="font-semibold text-white">{stats.currentStage?.title}</span> • Milestone checkpoint: January 15, 2027 • Main AI portfolio: March 2027.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('roadmap')}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-forest-100 hover:bg-white text-forest-950 font-bold text-xs transition-all shadow-sm"
            >
              <Compass className="w-4 h-4 text-forest-800" />
              <span>Continue Learning</span>
            </button>
            <button
              onClick={() => setActiveTab('daily-planner')}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-forest-700/80 hover:bg-forest-600/80 text-white font-bold text-xs border border-forest-600/80 transition-all"
            >
              <CalendarCheck className="w-4 h-4 text-forest-300" />
              <span>Plan Today's Study</span>
            </button>
            <button
              onClick={onOpenQuickTask}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-forest-800/80 hover:bg-forest-700 text-forest-100 font-bold text-xs border border-forest-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add My Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Calculated Real Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 md:gap-4">
        <StatCard
          title="Roadmap Progress"
          value={`${stats.roadmapProgress}%`}
          subvalue={`${stats.completedTopics} of ${stats.totalRoadmapTopics} topics`}
          icon={Compass}
          color="forest"
          onClick={() => setActiveTab('roadmap')}
        />
        <StatCard
          title="Topics In Progress"
          value={stats.inProgressTopics}
          subvalue={`${stats.revisionTopics} flagged for revision`}
          icon={Clock}
          color="amber"
          onClick={() => setActiveTab('roadmap')}
        />
        <StatCard
          title="Projects Status"
          value={`${stats.completedProjects}/${stats.totalProjects}`}
          subvalue={`${stats.inProgressProjects} currently active`}
          icon={FolderGit2}
          color="sage"
          onClick={() => setActiveTab('projects')}
        />
        <StatCard
          title="Placement Prep"
          value={`${stats.placementProgress}%`}
          subvalue={`${stats.completedPlacementItems}/${stats.totalPlacementItems} prep items`}
          icon={GraduationCap}
          color="blue"
          onClick={() => setActiveTab('placement')}
        />
      </div>

      {/* Additional Quick Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-xl p-3.5 text-center">
          <p className="text-[11px] font-semibold text-charcoal-500 dark:text-charcoal-400 uppercase">Today's Tasks</p>
          <p className="text-xl font-extrabold text-charcoal-900 dark:text-warm-100 mt-0.5">
            {stats.completedTasksToday} / {stats.totalTasksToday}
          </p>
          <p className="text-[10px] text-forest-700 dark:text-forest-400 font-medium">
            {stats.todayCompletionRate}% completed
          </p>
        </div>
        <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-xl p-3.5 text-center">
          <p className="text-[11px] font-semibold text-charcoal-500 dark:text-charcoal-400 uppercase">Study Time Today</p>
          <p className="text-xl font-extrabold text-charcoal-900 dark:text-warm-100 mt-0.5">
            {stats.actualMinutesToday} <span className="text-xs font-normal text-charcoal-500">mins</span>
          </p>
          <p className="text-[10px] text-charcoal-500 font-medium">
            Planned: {stats.plannedMinutesToday} mins
          </p>
        </div>
        <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-xl p-3.5 text-center">
          <p className="text-[11px] font-semibold text-charcoal-500 dark:text-charcoal-400 uppercase">Weekly Rate</p>
          <p className="text-xl font-extrabold text-charcoal-900 dark:text-warm-100 mt-0.5">
            {stats.weeklyCompletionRate}%
          </p>
          <p className="text-[10px] text-charcoal-500 font-medium">Last 7 days active</p>
        </div>
        <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-xl p-3.5 text-center">
          <p className="text-[11px] font-semibold text-charcoal-500 dark:text-charcoal-400 uppercase">Topics Left</p>
          <p className="text-xl font-extrabold text-charcoal-900 dark:text-warm-100 mt-0.5">
            {stats.notStartedTopics}
          </p>
          <p className="text-[10px] text-charcoal-500 font-medium">Across all 11 stages</p>
        </div>
      </div>

      {/* 3. Main Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Today's Study Tasks (2 cols on large screen) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Tasks Card */}
          <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-5 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-forest-50 dark:bg-forest-950 text-forest-700 dark:text-forest-400 border border-forest-200/50">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-charcoal-900 dark:text-warm-50">
                    Today's Study Tasks
                  </h2>
                  <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                    Target: ~2 hours daily (75m roadmap, 30m placement, 15m revision)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('daily-planner')}
                className="text-xs font-semibold text-forest-700 dark:text-forest-400 hover:text-forest-900 flex items-center space-x-1"
              >
                <span>Full Planner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {todayTasks.length === 0 ? (
              <EmptyState
                icon={CalendarCheck}
                title="No study tasks scheduled for today"
                description="Generate an automatic tailored study plan based on your next incomplete roadmap topics and placement goals."
                actionLabel="Generate Today's Suggested Plan"
                onAction={() => generateTodayPlan(todayStr)}
              />
            ) : (
              <div className="space-y-2.5">
                {todayTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-start justify-between p-3.5 rounded-xl border transition-all ${
                      task.completed
                        ? 'bg-warm-50 dark:bg-charcoal-950/40 border-warm-200 dark:border-charcoal-800 opacity-80'
                        : 'bg-white dark:bg-charcoal-850 border-warm-200 dark:border-charcoal-700 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <button
                        onClick={() => toggleTaskCompletion(todayStr, task.id)}
                        className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          task.completed
                            ? 'bg-forest-700 border-forest-700 text-white'
                            : 'border-charcoal-300 dark:border-charcoal-600 hover:border-forest-600'
                        }`}
                      >
                        {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>
                      <div>
                        <p className={`text-xs md:text-sm font-semibold text-charcoal-900 dark:text-warm-100 ${
                          task.completed ? 'line-through text-charcoal-400 dark:text-charcoal-500' : ''
                        }`}>
                          {task.title}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <Badge variant={task.category} size="xs">
                            {task.category}
                          </Badge>
                          <span className="text-[11px] font-mono text-charcoal-500 dark:text-charcoal-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {task.durationMinutes}m planned
                          </span>
                          {task.actualMinutes > 0 && (
                            <span className="text-[11px] font-mono text-forest-700 dark:text-forest-400">
                              • {task.actualMinutes}m spent
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Next Incomplete Roadmap Topic */}
          <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-5 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-700 dark:text-forest-400 flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                Up Next on Your Roadmap
              </span>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="text-xs font-semibold text-forest-700 dark:text-forest-400 hover:underline flex items-center gap-1"
              >
                <span>View Stage</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {stats.nextTopic ? (
              <div className="p-4 rounded-xl bg-warm-100/70 dark:bg-charcoal-800/60 border border-warm-200 dark:border-charcoal-700">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-forest-800 dark:text-forest-300 uppercase tracking-wider">
                      Stage {stats.nextStage?.number}: {stats.nextStage?.title}
                    </span>
                    <h3 className="text-sm md:text-base font-extrabold text-charcoal-900 dark:text-warm-50 mt-0.5">
                      {stats.nextTopic.title}
                    </h3>
                  </div>
                  <Badge variant={stats.nextTopic.priority}>
                    {stats.nextTopic.priority} Priority
                  </Badge>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-charcoal-500 dark:text-charcoal-400 border-t border-warm-200/70 dark:border-charcoal-700 pt-2.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Estimated: {stats.nextTopic.estimatedMinutes} mins
                  </span>
                  <button
                    onClick={() => setActiveTab('roadmap')}
                    className="font-bold text-forest-700 dark:text-forest-400 hover:text-forest-900"
                  >
                    Open Topic Checklist →
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-charcoal-500">All roadmap topics completed! Phenomenal work!</p>
            )}
          </div>
        </div>

        {/* Right Column: Upcoming Target Dates & Active Project & Notes */}
        <div className="space-y-6">
          {/* Upcoming Target Dates */}
          <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-5 shadow-sm">
            <h2 className="text-sm font-bold text-charcoal-900 dark:text-warm-50 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-forest-700 dark:text-forest-400" />
              Key Roadmap Milestones
            </h2>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-warm-50 dark:bg-charcoal-800/50 border border-warm-200 dark:border-charcoal-700">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-charcoal-900 dark:text-warm-100">Stage 1 & 2 Finish</span>
                  <Badge size="xs" variant="Roadmap">Oct–Nov 2026</Badge>
                </div>
                <p className="text-[11px] text-charcoal-500 mt-1">Python, SQL, Git & Student Info System</p>
              </div>

              <div className="p-3 rounded-xl bg-warm-50 dark:bg-charcoal-800/50 border border-warm-200 dark:border-charcoal-700">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-charcoal-900 dark:text-warm-100">Placement Checkpoint</span>
                  <Badge size="xs" variant="Placement">Jan 15, 2027</Badge>
                </div>
                <p className="text-[11px] text-charcoal-500 mt-1">DSA, SQL & Core CS interview baseline test</p>
              </div>

              <div className="p-3 rounded-xl bg-warm-50 dark:bg-charcoal-800/50 border border-warm-200 dark:border-charcoal-700">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-charcoal-900 dark:text-warm-100">Main AI Portfolio Milestone</span>
                  <Badge size="xs" variant="Project">March 2027</Badge>
                </div>
                <p className="text-[11px] text-charcoal-500 mt-1">Deep Learning, RAG Assistant & FastAPI Deployments</p>
              </div>
            </div>
          </div>

          {/* Active Project Card */}
          {activeProject && (
            <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-forest-700 dark:text-forest-400 flex items-center gap-1.5">
                  <FolderGit2 className="w-4 h-4" />
                  Active Project Milestone
                </span>
                <Badge variant={activeProject.status} size="xs">
                  {activeProject.status}
                </Badge>
              </div>
              <h3 className="text-sm font-extrabold text-charcoal-900 dark:text-warm-50 mt-1">
                {activeProject.title}
              </h3>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1">
                Target: {activeProject.targetPeriod}
              </p>

              {nextProjectMilestone && (
                <div className="mt-3 p-2.5 rounded-lg bg-warm-100/70 dark:bg-charcoal-800 text-xs">
                  <span className="text-[10px] font-bold uppercase text-charcoal-400 block">Next Milestone</span>
                  <p className="font-semibold text-charcoal-800 dark:text-warm-100 mt-0.5">
                    {nextProjectMilestone.title}
                  </p>
                </div>
              )}

              <div className="mt-4">
                <ProgressBar
                  value={activeProject.milestones.filter(m => m.completed).length}
                  max={activeProject.milestones.length}
                  size="sm"
                  label="Milestones"
                  sublabel={`${activeProject.milestones.filter(m => m.completed).length}/${activeProject.milestones.length}`}
                />
              </div>

              <button
                onClick={() => setActiveTab('projects')}
                className="mt-4 w-full py-2 text-xs font-bold text-center rounded-lg bg-warm-100 hover:bg-warm-200 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 text-charcoal-800 dark:text-warm-100 transition-colors"
              >
                Open Project Details →
              </button>
            </div>
          )}

          {/* Revision Queue */}
          <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-5 shadow-sm">
            <h2 className="text-sm font-bold text-charcoal-900 dark:text-warm-50 mb-3 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-purple-600" />
              Revision Queue ({revisionTopics.length})
            </h2>
            {revisionTopics.length === 0 ? (
              <p className="text-xs text-charcoal-500 py-2">
                No topics flagged for revision. Mark topics with "Revision Needed" whenever you want to revisit them.
              </p>
            ) : (
              <div className="space-y-2">
                {revisionTopics.slice(0, 3).map((item) => (
                  <div
                    key={item.topicId}
                    className="p-2.5 rounded-lg bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/50 text-xs flex items-center justify-between"
                  >
                    <span className="font-semibold text-purple-900 dark:text-purple-200 truncate">
                      {item.topicId}
                    </span>
                    <Badge size="xs" variant="Revision Needed">Revise</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

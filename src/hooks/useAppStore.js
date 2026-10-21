import { useState, useEffect, useMemo, useCallback } from 'react';
import { ROADMAP_STAGES, TOTAL_ROADMAP_TOPICS } from '../data/roadmapData';
import { INITIAL_PROJECTS } from '../data/projectsData';
import { INITIAL_PLACEMENT_TOPICS, INITIAL_DSA_PROBLEMS, INITIAL_JOB_APPLICATIONS } from '../data/placementData';
import { DEFAULT_SETTINGS, INITIAL_MANUAL_TASKS, INITIAL_NOTES, INITIAL_RESOURCES, INITIAL_PORTFOLIO_CRITERIA } from '../data/initialState';

const STORAGE_KEY = 'MY_AI_ENGINEER_JOURNEY_STORE_V1';

// Format date helper: YYYY-MM-DD
export const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function useAppStore() {
  // --- 1. Load initial state or defaults ---
  const [isLoaded, setIsLoaded] = useState(false);
  const [topicStates, setTopicStates] = useState({});
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [dailyPlans, setDailyPlans] = useState({}); // { "2026-10-21": [tasks] }
  const [manualTasks, setManualTasks] = useState(INITIAL_MANUAL_TASKS);
  const [placementTopics, setPlacementTopics] = useState(INITIAL_PLACEMENT_TOPICS);
  const [dsaProblems, setDsaProblems] = useState(INITIAL_DSA_PROBLEMS);
  const [jobApplications, setJobApplications] = useState(INITIAL_JOB_APPLICATIONS);
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [portfolioChecks, setPortfolioChecks] = useState({}); // { [projId]: { [key]: boolean } }
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.topicStates) setTopicStates(parsed.topicStates);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.dailyPlans) setDailyPlans(parsed.dailyPlans);
        if (parsed.manualTasks) setManualTasks(parsed.manualTasks);
        if (parsed.placementTopics) setPlacementTopics(parsed.placementTopics);
        if (parsed.dsaProblems) setDsaProblems(parsed.dsaProblems);
        if (parsed.jobApplications) setJobApplications(parsed.jobApplications);
        if (parsed.notes) setNotes(parsed.notes);
        if (parsed.resources) setResources(parsed.resources);
        if (parsed.portfolioChecks) setPortfolioChecks(parsed.portfolioChecks);
        if (parsed.settings) setSettings(parsed.settings);
      }
    } catch (err) {
      console.error("Failed to load saved state from localStorage:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const payload = {
        version: '1.0',
        savedAt: new Date().toISOString(),
        topicStates,
        projects,
        dailyPlans,
        manualTasks,
        placementTopics,
        dsaProblems,
        jobApplications,
        notes,
        resources,
        portfolioChecks,
        settings
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error("Failed to persist state to localStorage:", err);
    }
  }, [
    isLoaded,
    topicStates,
    projects,
    dailyPlans,
    manualTasks,
    placementTopics,
    dsaProblems,
    jobApplications,
    notes,
    resources,
    portfolioChecks,
    settings
  ]);

  // Apply dark mode to document element
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  // --- 2. Topic State Helpers ---
  const getTopicState = useCallback((topicId) => {
    return topicStates[topicId] || {
      status: "Not Started", // 'Not Started', 'In Progress', 'Completed', 'Revision Needed'
      priority: "Medium",
      notes: "",
      resourceUrl: "",
      revisionNeeded: false,
      targetDate: ""
    };
  }, [topicStates]);

  const updateTopicState = useCallback((topicId, updates) => {
    setTopicStates(prev => {
      const current = prev[topicId] || {
        status: "Not Started",
        priority: "Medium",
        notes: "",
        resourceUrl: "",
        revisionNeeded: false,
        targetDate: ""
      };
      return {
        ...prev,
        [topicId]: { ...current, ...updates }
      };
    });
  }, []);

  const toggleTopicCompletion = useCallback((topicId) => {
    setTopicStates(prev => {
      const current = prev[topicId] || { status: "Not Started" };
      const nextStatus = current.status === "Completed" ? "Not Started" : "Completed";
      return {
        ...prev,
        [topicId]: {
          ...current,
          status: nextStatus,
          completedAt: nextStatus === "Completed" ? new Date().toISOString() : null
        }
      };
    });
  }, []);

  // --- 3. Calculated Real Metrics ---
  const stats = useMemo(() => {
    let completedTopics = 0;
    let inProgressTopics = 0;
    let revisionTopics = 0;
    let notStartedTopics = 0;

    // Iterate through all stages and topics defined in roadmap
    ROADMAP_STAGES.forEach(stage => {
      stage.modules.forEach(m => {
        m.topics.forEach(t => {
          const s = topicStates[t.id]?.status || "Not Started";
          if (s === "Completed") completedTopics++;
          else if (s === "In Progress") inProgressTopics++;
          else if (s === "Revision Needed" || topicStates[t.id]?.revisionNeeded) revisionTopics++;
          else notStartedTopics++;
        });
      });
    });

    const roadmapProgress = TOTAL_ROADMAP_TOPICS > 0
      ? Math.round((completedTopics / TOTAL_ROADMAP_TOPICS) * 100)
      : 0;

    // Project stats
    let completedProjects = 0;
    let inProgressProjects = 0;
    projects.forEach(p => {
      const totalM = p.milestones.length;
      const compM = p.milestones.filter(m => m.completed).length;
      if (totalM > 0 && compM === totalM) completedProjects++;
      else if (compM > 0 || p.status === "In Progress") inProgressProjects++;
    });

    // Placement stats
    let totalPlacementItems = 0;
    let completedPlacementItems = 0;
    Object.values(placementTopics).forEach(list => {
      list.forEach(item => {
        totalPlacementItems++;
        if (item.completed) completedPlacementItems++;
      });
    });
    const placementProgress = totalPlacementItems > 0
      ? Math.round((completedPlacementItems / totalPlacementItems) * 100)
      : 0;

    // Today's tasks
    const today = getTodayDateString();
    const todayTasks = dailyPlans[today] || [];
    const completedTasksToday = todayTasks.filter(t => t.completed).length;
    const totalTasksToday = todayTasks.length;
    const plannedMinutesToday = todayTasks.reduce((acc, t) => acc + (t.durationMinutes || 0), 0);
    const actualMinutesToday = todayTasks.reduce((acc, t) => acc + (t.actualMinutes || (t.completed ? t.durationMinutes : 0)), 0);
    const todayCompletionRate = totalTasksToday > 0
      ? Math.round((completedTasksToday / totalTasksToday) * 100)
      : 0;

    // This week completion rate (last 7 days)
    let weekPlanned = 0;
    let weekCompleted = 0;
    const d = new Date();
    for (let i = 0; i < 7; i++) {
      const dt = new Date(d);
      dt.setDate(d.getDate() - i);
      const y = dt.getFullYear();
      const m = String(dt.getMonth() + 1).padStart(2, '0');
      const day = String(dt.getDate()).padStart(2, '0');
      const key = `${y}-${m}-${day}`;
      const dayList = dailyPlans[key] || [];
      weekPlanned += dayList.length;
      weekCompleted += dayList.filter(t => t.completed).length;
    }
    const weeklyCompletionRate = weekPlanned > 0
      ? Math.round((weekCompleted / weekPlanned) * 100)
      : 0;

    // Current active stage
    let currentStage = ROADMAP_STAGES[0];
    for (const stage of ROADMAP_STAGES) {
      const stageTopics = stage.modules.flatMap(m => m.topics);
      const isStageDone = stageTopics.every(t => topicStates[t.id]?.status === "Completed");
      if (!isStageDone) {
        currentStage = stage;
        break;
      }
    }

    // Next incomplete topic
    let nextTopic = null;
    let nextStage = null;
    for (const stage of ROADMAP_STAGES) {
      for (const mod of stage.modules) {
        for (const top of mod.topics) {
          const st = topicStates[top.id]?.status || "Not Started";
          if (st !== "Completed") {
            nextTopic = top;
            nextStage = stage;
            break;
          }
        }
        if (nextTopic) break;
      }
      if (nextTopic) break;
    }

    return {
      totalRoadmapTopics: TOTAL_ROADMAP_TOPICS,
      completedTopics,
      inProgressTopics,
      revisionTopics,
      notStartedTopics,
      roadmapProgress,
      completedProjects,
      inProgressProjects,
      totalProjects: projects.length,
      placementProgress,
      completedPlacementItems,
      totalPlacementItems,
      completedTasksToday,
      totalTasksToday,
      plannedMinutesToday,
      actualMinutesToday,
      todayCompletionRate,
      weeklyCompletionRate,
      currentStage,
      nextTopic,
      nextStage
    };
  }, [topicStates, projects, placementTopics, dailyPlans]);

  // --- 4. Daily Planner Actions ---
  const getTasksForDate = useCallback((dateStr) => {
    return dailyPlans[dateStr] || [];
  }, [dailyPlans]);

  const addDailyTask = useCallback((dateStr, task) => {
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: task.title,
      category: task.category || "Roadmap",
      durationMinutes: task.durationMinutes || 45,
      actualMinutes: task.actualMinutes || 0,
      completed: !!task.completed,
      notes: task.notes || "",
      sourceRefId: task.sourceRefId || null,
      scheduledDate: dateStr,
      createdAt: new Date().toISOString()
    };

    setDailyPlans(prev => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), newTask]
    }));

    return newTask;
  }, []);

  const updateDailyTask = useCallback((dateStr, taskId, updates) => {
    setDailyPlans(prev => {
      const list = prev[dateStr] || [];
      const updated = list.map(t => t.id === taskId ? { ...t, ...updates } : t);
      return { ...prev, [dateStr]: updated };
    });
  }, []);

  const deleteDailyTask = useCallback((dateStr, taskId) => {
    setDailyPlans(prev => {
      const list = prev[dateStr] || [];
      return { ...prev, [dateStr]: list.filter(t => t.id !== taskId) };
    });
  }, []);

  const toggleTaskCompletion = useCallback((dateStr, taskId) => {
    setDailyPlans(prev => {
      const list = prev[dateStr] || [];
      const updated = list.map(t => {
        if (t.id === taskId) {
          const nextCompleted = !t.completed;
          return {
            ...t,
            completed: nextCompleted,
            actualMinutes: nextCompleted ? (t.actualMinutes || t.durationMinutes) : 0,
            completedAt: nextCompleted ? new Date().toISOString() : null
          };
        }
        return t;
      });
      return { ...prev, [dateStr]: updated };
    });
  }, []);

  const rescheduleTask = useCallback((fromDateStr, toDateStr, taskId) => {
    setDailyPlans(prev => {
      const sourceList = prev[fromDateStr] || [];
      const targetList = prev[toDateStr] || [];
      const taskToMove = sourceList.find(t => t.id === taskId);
      if (!taskToMove) return prev;

      const updatedTask = {
        ...taskToMove,
        scheduledDate: toDateStr,
        rescheduledFrom: fromDateStr
      };

      return {
        ...prev,
        [fromDateStr]: sourceList.filter(t => t.id !== taskId),
        [toDateStr]: [...targetList, updatedTask]
      };
    });
  }, []);

  // --- 5. Automatic Daily Task Generator (Local, zero external API) ---
  const generateTodayPlan = useCallback((targetDate = getTodayDateString()) => {
    const existing = dailyPlans[targetDate] || [];
    // If tasks already exist, do NOT replace automatically without user intent
    if (existing.length > 0) return { created: false, tasks: existing, reason: "Tasks already exist for today." };

    const suggestions = [];
    const maxCapacity = settings.dailyCapacityMinutes || 120;
    const roadmapLimit = settings.allocations?.roadmapMinutes || 75;
    const placementLimit = settings.allocations?.placementMinutes || 30;
    const revisionLimit = settings.allocations?.revisionMinutes || 15;

    // 1. Roadmap Topic Suggestions (Up to ~75 mins)
    let allocatedRoadmapTime = 0;
    // Check "In Progress" topics first
    for (const stage of ROADMAP_STAGES) {
      for (const mod of stage.modules) {
        for (const topic of mod.topics) {
          const state = topicStates[topic.id];
          if (state?.status === "In Progress" && allocatedRoadmapTime < roadmapLimit) {
            suggestions.push({
              title: `${stage.title}: ${topic.title}`,
              category: "Roadmap",
              durationMinutes: topic.estimatedMinutes || 45,
              sourceRefId: topic.id,
              stageId: stage.id
            });
            allocatedRoadmapTime += (topic.estimatedMinutes || 45);
          }
        }
      }
    }

    // Next incomplete topics if capacity remains
    if (allocatedRoadmapTime < roadmapLimit) {
      for (const stage of ROADMAP_STAGES) {
        for (const mod of stage.modules) {
          for (const topic of mod.topics) {
            const state = topicStates[topic.id];
            const isCompleted = state?.status === "Completed";
            const isInProgress = state?.status === "In Progress";
            const alreadyAdded = suggestions.some(s => s.sourceRefId === topic.id);

            if (!isCompleted && !isInProgress && !alreadyAdded && allocatedRoadmapTime < roadmapLimit) {
              suggestions.push({
                title: `${stage.title}: ${topic.title}`,
                category: "Roadmap",
                durationMinutes: topic.estimatedMinutes || 45,
                sourceRefId: topic.id,
                stageId: stage.id
              });
              allocatedRoadmapTime += (topic.estimatedMinutes || 45);
            }
          }
        }
      }
    }

    // 2. Placement Preparation Suggestion (~30 mins)
    let addedPlacement = false;
    for (const [categoryKey, items] of Object.entries(placementTopics)) {
      for (const item of items) {
        if (!item.completed && !addedPlacement) {
          suggestions.push({
            title: `Placement Prep: ${item.title}`,
            category: "Placement",
            durationMinutes: 30,
            sourceRefId: item.id
          });
          addedPlacement = true;
          break;
        }
      }
      if (addedPlacement) break;
    }

    // 3. Revision or Project Milestone Suggestion (~15 mins)
    let addedRevision = false;
    // Look for flagged revision topics
    for (const stage of ROADMAP_STAGES) {
      for (const mod of stage.modules) {
        for (const topic of mod.topics) {
          const state = topicStates[topic.id];
          if ((state?.revisionNeeded || state?.status === "Revision Needed") && !addedRevision) {
            suggestions.push({
              title: `Revision: ${topic.title}`,
              category: "Revision",
              durationMinutes: 15,
              sourceRefId: topic.id
            });
            addedRevision = true;
            break;
          }
        }
        if (addedRevision) break;
      }
      if (addedRevision) break;
    }

    // If no revision needed, check upcoming project milestone
    if (!addedRevision) {
      for (const proj of projects) {
        const nextMilestone = proj.milestones.find(m => !m.completed);
        if (nextMilestone) {
          suggestions.push({
            title: `Project: ${proj.title} - ${nextMilestone.title}`,
            category: "Project",
            durationMinutes: 15,
            sourceRefId: nextMilestone.id
          });
          addedRevision = true;
          break;
        }
      }
    }

    // Convert suggestions to daily tasks and persist
    const newTasks = suggestions.map((s, idx) => ({
      id: `task-${Date.now()}-${idx}`,
      title: s.title,
      category: s.category,
      durationMinutes: s.durationMinutes,
      actualMinutes: 0,
      completed: false,
      notes: "Auto-suggested study task based on your roadmap progress.",
      sourceRefId: s.sourceRefId,
      scheduledDate: targetDate,
      createdAt: new Date().toISOString()
    }));

    setDailyPlans(prev => ({
      ...prev,
      [targetDate]: newTasks
    }));

    return { created: true, tasks: newTasks };
  }, [dailyPlans, settings, topicStates, placementTopics, projects]);

  // --- 6. Manual Tasks CRUD ---
  const addManualTask = useCallback((task) => {
    const newTask = {
      id: `manual-${Date.now()}`,
      title: task.title,
      description: task.description || "",
      category: task.category || "College Assignment",
      priority: task.priority || "Medium",
      dueDate: task.dueDate || "",
      estimatedMinutes: task.estimatedMinutes || 45,
      status: "Pending",
      notes: task.notes || "",
      createdAt: new Date().toISOString()
    };
    setManualTasks(prev => [newTask, ...prev]);
    return newTask;
  }, []);

  const updateManualTask = useCallback((taskId, updates) => {
    setManualTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updates } : t));
  }, []);

  const deleteManualTask = useCallback((taskId) => {
    setManualTasks(prev => prev.filter(t => t.id !== taskId));
  }, []);

  // --- 7. Project Tracker Actions ---
  const toggleProjectMilestone = useCallback((projectId, milestoneId) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      const updatedMilestones = p.milestones.map(m =>
        m.id === milestoneId ? { ...m, completed: !m.completed } : m
      );
      const allDone = updatedMilestones.every(m => m.completed);
      const someDone = updatedMilestones.some(m => m.completed);
      return {
        ...p,
        milestones: updatedMilestones,
        status: allDone ? "Completed" : someDone ? "In Progress" : p.status
      };
    }));
  }, []);

  const updateProjectDetails = useCallback((projectId, updates) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, ...updates } : p));
  }, []);

  // --- 8. Placement Tracker Actions ---
  const togglePlacementModuleItem = useCallback((categoryKey, itemId) => {
    setPlacementTopics(prev => {
      const list = prev[categoryKey] || [];
      const updated = list.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      return { ...prev, [categoryKey]: updated };
    });
  }, []);

  const addDsaProblem = useCallback((problem) => {
    const newProb = {
      id: `prob-${Date.now()}`,
      name: problem.name,
      topic: problem.topic || "General",
      difficulty: problem.difficulty || "Easy",
      platformUrl: problem.platformUrl || "",
      status: problem.status || "Solved",
      solvedStyle: problem.solvedStyle || "Independent",
      timeTakenMinutes: problem.timeTakenMinutes || 30,
      category: problem.category || "Beginner",
      mistakesLearnings: problem.mistakesLearnings || "",
      revisionDate: problem.revisionDate || "",
      createdAt: new Date().toISOString()
    };
    setDsaProblems(prev => [newProb, ...prev]);
  }, []);

  const updateDsaProblem = useCallback((probId, updates) => {
    setDsaProblems(prev => prev.map(p => p.id === probId ? { ...p, ...updates } : p));
  }, []);

  const deleteDsaProblem = useCallback((probId) => {
    setDsaProblems(prev => prev.filter(p => p.id !== probId));
  }, []);

  // Job applications
  const addJobApplication = useCallback((app) => {
    const newApp = {
      id: `job-${Date.now()}`,
      company: app.company,
      role: app.role,
      applicationUrl: app.applicationUrl || "",
      dateApplied: app.dateApplied || getTodayDateString(),
      status: app.status || "Applied",
      nextAction: app.nextAction || "",
      notes: app.notes || "",
      createdAt: new Date().toISOString()
    };
    setJobApplications(prev => [newApp, ...prev]);
  }, []);

  const updateJobApplication = useCallback((appId, updates) => {
    setJobApplications(prev => prev.map(a => a.id === appId ? { ...a, ...updates } : a));
  }, []);

  const deleteJobApplication = useCallback((appId) => {
    setJobApplications(prev => prev.filter(a => a.id !== appId));
  }, []);

  // --- 9. Portfolio Checklist Actions ---
  const togglePortfolioCriteria = useCallback((projectId, criteriaKey) => {
    setPortfolioChecks(prev => {
      const currentProj = prev[projectId] || {};
      return {
        ...prev,
        [projectId]: {
          ...currentProj,
          [criteriaKey]: !currentProj[criteriaKey]
        }
      };
    });
  }, []);

  // --- 10. Notes & Resources CRUD ---
  const addNote = useCallback((note) => {
    const newNote = {
      id: `note-${Date.now()}`,
      title: note.title,
      content: note.content,
      linkedTopicId: note.linkedTopicId || "",
      linkedProjectId: note.linkedProjectId || "",
      category: note.category || "Notes",
      tags: note.tags || [],
      createdAt: new Date().toISOString()
    };
    setNotes(prev => [newNote, ...prev]);
  }, []);

  const updateNote = useCallback((noteId, updates) => {
    setNotes(prev => prev.map(n => n.id === noteId ? { ...n, ...updates } : n));
  }, []);

  const deleteNote = useCallback((noteId) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
  }, []);

  const addResource = useCallback((resource) => {
    const newRes = {
      id: `res-${Date.now()}`,
      title: resource.title,
      url: resource.url,
      description: resource.description || "",
      status: resource.status || "To Learn",
      linkedTopicId: resource.linkedTopicId || "",
      createdAt: new Date().toISOString()
    };
    setResources(prev => [newRes, ...prev]);
  }, []);

  const updateResource = useCallback((resId, updates) => {
    setResources(prev => prev.map(r => r.id === resId ? { ...r, ...updates } : r));
  }, []);

  const deleteResource = useCallback((resId) => {
    setResources(prev => prev.filter(r => r.id !== resId));
  }, []);

  // --- 11. Settings & Data Export / Import / Reset ---
  const updateSettings = useCallback((updates) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const exportBackupJSON = useCallback(() => {
    const backup = {
      schema: "MyAIJourneyBackup",
      version: "1.0",
      exportedAt: new Date().toISOString(),
      topicStates,
      projects,
      dailyPlans,
      manualTasks,
      placementTopics,
      dsaProblems,
      jobApplications,
      notes,
      resources,
      portfolioChecks,
      settings
    };
    const jsonStr = JSON.stringify(backup, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my_ai_journey_backup_${getTodayDateString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [
    topicStates,
    projects,
    dailyPlans,
    manualTasks,
    placementTopics,
    dsaProblems,
    jobApplications,
    notes,
    resources,
    portfolioChecks,
    settings
  ]);

  const importBackupJSON = useCallback((jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') throw new Error("Invalid JSON structure.");
      if (data.schema && data.schema !== "MyAIJourneyBackup") {
        console.warn("Unrecognized schema, attempting best effort import.");
      }

      if (data.topicStates) setTopicStates(data.topicStates);
      if (data.projects) setProjects(data.projects);
      if (data.dailyPlans) setDailyPlans(data.dailyPlans);
      if (data.manualTasks) setManualTasks(data.manualTasks);
      if (data.placementTopics) setPlacementTopics(data.placementTopics);
      if (data.dsaProblems) setDsaProblems(data.dsaProblems);
      if (data.jobApplications) setJobApplications(data.jobApplications);
      if (data.notes) setNotes(data.notes);
      if (data.resources) setResources(data.resources);
      if (data.portfolioChecks) setPortfolioChecks(data.portfolioChecks);
      if (data.settings) setSettings(data.settings);

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const resetAllData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setTopicStates({});
    setProjects(INITIAL_PROJECTS);
    setDailyPlans({});
    setManualTasks(INITIAL_MANUAL_TASKS);
    setPlacementTopics(INITIAL_PLACEMENT_TOPICS);
    setDsaProblems(INITIAL_DSA_PROBLEMS);
    setJobApplications(INITIAL_JOB_APPLICATIONS);
    setNotes(INITIAL_NOTES);
    setResources(INITIAL_RESOURCES);
    setPortfolioChecks({});
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return {
    isLoaded,
    topicStates,
    getTopicState,
    updateTopicState,
    toggleTopicCompletion,
    projects,
    toggleProjectMilestone,
    updateProjectDetails,
    dailyPlans,
    getTasksForDate,
    addDailyTask,
    updateDailyTask,
    deleteDailyTask,
    toggleTaskCompletion,
    rescheduleTask,
    generateTodayPlan,
    manualTasks,
    addManualTask,
    updateManualTask,
    deleteManualTask,
    placementTopics,
    togglePlacementModuleItem,
    dsaProblems,
    addDsaProblem,
    updateDsaProblem,
    deleteDsaProblem,
    jobApplications,
    addJobApplication,
    updateJobApplication,
    deleteJobApplication,
    portfolioChecks,
    togglePortfolioCriteria,
    notes,
    addNote,
    updateNote,
    deleteNote,
    resources,
    addResource,
    updateResource,
    deleteResource,
    settings,
    updateSettings,
    exportBackupJSON,
    importBackupJSON,
    resetAllData,
    stats
  };
}

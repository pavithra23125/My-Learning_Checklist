export const DEFAULT_SETTINGS = {
  dailyCapacityMinutes: 120, // 2 hours
  allocations: {
    roadmapMinutes: 75,
    placementMinutes: 30,
    revisionMinutes: 15
  },
  roadmapStartDate: "2026-10-01",
  portfolioMilestoneDate: "2027-03-31",
  placementCheckpointDate: "2027-01-15",
  targetCompletionDate: "2027-07-31",
  darkMode: false,
  autoSuggestOnEmpty: true
};

export const INITIAL_MANUAL_TASKS = [
  {
    id: "task-manual-1",
    title: "Review Python OOP Notebook for Semester Exam",
    description: "Revise classes, inheritance, dunder methods and write test cases.",
    category: "College Assignment",
    priority: "High",
    dueDate: "2026-10-25",
    estimatedMinutes: 60,
    status: "Pending", // 'Pending', 'In Progress', 'Completed'
    notes: "Focus on constructor overloading and polymorphism."
  },
  {
    id: "task-manual-2",
    title: "Update GitHub Profile Readme with AI Roadmap Badge",
    description: "Add current learning goals and pin key project repositories.",
    category: "Personal Learning",
    priority: "Medium",
    dueDate: "2026-10-28",
    estimatedMinutes: 30,
    status: "Pending",
    notes: ""
  }
];

export const INITIAL_NOTES = [
  {
    id: "note-1",
    title: "Python List Slicing & Memory References",
    content: "Remember that slicing `a[:]` creates a shallow copy, not a deep copy! For nested objects, use `copy.deepcopy()` to avoid accidental mutation.",
    linkedTopicId: "s1-t18",
    linkedProjectId: "proj-1",
    category: "Mistakes & Learnings", // 'Notes', 'Interview Questions', 'Mistakes & Learnings'
    tags: ["python", "memory", "tricks"],
    createdAt: "2026-10-21"
  },
  {
    id: "note-2",
    title: "Difference between __init__ and __new__",
    content: "Common interview question: __new__ is responsible for returning a new instance of your class, whereas __init__ doesn't return anything; it's only responsible for initializing the instance after it's been created.",
    linkedTopicId: "s1-t41",
    linkedProjectId: "proj-1",
    category: "Interview Questions",
    tags: ["oop", "interview"],
    createdAt: "2026-10-21"
  }
];

export const INITIAL_RESOURCES = [
  {
    id: "res-1",
    title: "Python Official Documentation - Tutorial",
    url: "https://docs.python.org/3/tutorial/",
    description: "Official guide to Python syntax, standard library, and idiomatic coding patterns.",
    status: "Learning", // 'To Learn', 'Learning', 'Completed'
    linkedTopicId: "s1-t1",
    createdAt: "2026-10-21"
  },
  {
    id: "res-2",
    title: "FastAPI Official Interactive Tutorial",
    url: "https://fastapi.tiangolo.com/tutorial/",
    description: "High-performance Python API framework for serving ML predictions with Pydantic validation.",
    status: "To Learn",
    linkedTopicId: "s9-t4",
    createdAt: "2026-10-21"
  }
];

export const INITIAL_PORTFOLIO_CRITERIA = [
  { key: "readme", label: "Clear README with project overview and goals" },
  { key: "setup", label: "Step-by-step local setup & installation instructions" },
  { key: "dependencies", label: "All dependencies pinned (requirements.txt / environment.yml)" },
  { key: "screenshots", label: "High-resolution screenshots or demo GIF included" },
  { key: "dataset", label: "Dataset source, citations, and licenses documented" },
  { key: "metrics", label: "Evaluation metrics & benchmark comparison explained" },
  { key: "limitations", label: "Engineering & domain limitations documented" },
  { key: "noSecrets", label: "No API keys, passwords, or .env files committed" },
  { key: "interviewReady", label: "Can fluently defend architectural decisions in an interview" }
];

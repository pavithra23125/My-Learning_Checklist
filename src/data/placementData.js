export const INITIAL_PLACEMENT_TOPICS = {
  dsaModules: [
    { id: "pl-dsa-1", title: "Python Fundamentals Revision", completed: false, category: "DSA" },
    { id: "pl-dsa-2", title: "Searching and Sorting", completed: false, category: "DSA" },
    { id: "pl-dsa-3", title: "Arrays and Strings", completed: false, category: "DSA" },
    { id: "pl-dsa-4", title: "Hashing & HashMaps", completed: false, category: "DSA" },
    { id: "pl-dsa-5", title: "Two Pointers Technique", completed: false, category: "DSA" },
    { id: "pl-dsa-6", title: "Sliding Window Patterns", completed: false, category: "DSA" },
    { id: "pl-dsa-7", title: "Recursion & Backtracking", completed: false, category: "DSA" },
    { id: "pl-dsa-8", title: "Stacks, Queues & Monotonic Deque", completed: false, category: "DSA" },
    { id: "pl-dsa-9", title: "Trees, BST & Graph Basics", completed: false, category: "DSA" },
    { id: "pl-dsa-10", title: "Timed Coding Assessments", completed: false, category: "DSA" }
  ],
  sqlModules: [
    { id: "pl-sql-1", title: "Basic Queries (SELECT, DISTINCT, WHERE)", completed: false, category: "SQL" },
    { id: "pl-sql-2", title: "Filtering & Pattern Matching (LIKE, IN, BETWEEN)", completed: false, category: "SQL" },
    { id: "pl-sql-3", title: "Aggregation & Grouping (COUNT, SUM, GROUP BY, HAVING)", completed: false, category: "SQL" },
    { id: "pl-sql-4", title: "Joins (INNER, LEFT, RIGHT, FULL, SELF)", completed: false, category: "SQL" },
    { id: "pl-sql-5", title: "Subqueries & Correlated Subqueries", completed: false, category: "SQL" },
    { id: "pl-sql-6", title: "Keys, Constraints & Schema Design", completed: false, category: "SQL" },
    { id: "pl-sql-7", title: "Database Normalization (1NF, 2NF, 3NF, BCNF)", completed: false, category: "SQL" },
    { id: "pl-sql-8", title: "Transactions, ACID Properties & B-Tree Indexes", completed: false, category: "SQL" }
  ],
  coreCsModules: [
    { id: "pl-cs-1", title: "Object-Oriented Programming (4 Pillars & SOLID)", completed: false, category: "Core CS" },
    { id: "pl-cs-2", title: "Database Management Systems (Architecture & Concurrency)", completed: false, category: "Core CS" },
    { id: "pl-cs-3", title: "Operating Systems (Processes, Threads & Scheduling)", completed: false, category: "Core CS" },
    { id: "pl-cs-4", title: "Operating Systems (Deadlocks & Virtual Memory)", completed: false, category: "Core CS" },
    { id: "pl-cs-5", title: "Computer Networks (OSI vs TCP/IP, DNS, HTTP/S)", completed: false, category: "Core CS" },
    { id: "pl-cs-6", title: "Computer Networks (TCP vs UDP, Handshakes & Sockets)", completed: false, category: "Core CS" },
    { id: "pl-cs-7", title: "Software Engineering & SDLC Fundamentals", completed: false, category: "Core CS" }
  ],
  aptitudeModules: [
    { id: "pl-apt-1", title: "Quantitative: Percentages, Profit & Loss", completed: false, category: "Aptitude" },
    { id: "pl-apt-2", title: "Quantitative: Ratios, Proportions & Averages", completed: false, category: "Aptitude" },
    { id: "pl-apt-3", title: "Quantitative: Time & Work, Speed, Time & Distance", completed: false, category: "Aptitude" },
    { id: "pl-apt-4", title: "Logical Reasoning: Number Series & Syllogisms", completed: false, category: "Aptitude" },
    { id: "pl-apt-5", title: "Logical Reasoning: Blood Relations & Seating Arrangement", completed: false, category: "Aptitude" },
    { id: "pl-apt-6", title: "Verbal Ability: Reading Comprehension & Sentence Correction", completed: false, category: "Aptitude" },
    { id: "pl-apt-7", title: "Timed Placement Mock Tests", completed: false, category: "Aptitude" }
  ],
  interviewModules: [
    { id: "pl-int-1", title: "ATS-Optimized Resume Review & Refinement", completed: false, category: "Interview Readiness" },
    { id: "pl-int-2", title: "2-Minute Technical Self-Introduction Practice", completed: false, category: "Interview Readiness" },
    { id: "pl-int-3", title: "Deep Project Explanations (STAR Method)", completed: false, category: "Interview Readiness" },
    { id: "pl-int-4", title: "Technical Architecture Decisions Justification", completed: false, category: "Interview Readiness" },
    { id: "pl-int-5", title: "Behavioral & HR Interview Preparation", completed: false, category: "Interview Readiness" },
    { id: "pl-int-6", title: "Peer/Platform Mock Technical Interviews", completed: false, category: "Interview Readiness" },
    { id: "pl-int-7", title: "Company-Specific Online Assessment Practice", completed: false, category: "Interview Readiness" }
  ]
};

export const INITIAL_DSA_PROBLEMS = [
  {
    id: "prob-1",
    name: "Two Sum",
    topic: "Arrays & Hashing",
    difficulty: "Easy",
    platformUrl: "https://leetcode.com/problems/two-sum/",
    status: "Not Started", // 'Not Started', 'Solved', 'In Progress', 'Revision Needed'
    solvedStyle: "Independent", // 'Independent', 'With Help', 'Editorial'
    timeTakenMinutes: 20,
    category: "Beginner", // 'Beginner', 'Intermediate', 'Timed-test', 'Revision'
    mistakesLearnings: "Use hash map lookup for O(n) instead of brute force O(n^2).",
    revisionDate: ""
  },
  {
    id: "prob-2",
    name: "Valid Palindrome",
    topic: "Two Pointers / Strings",
    difficulty: "Easy",
    platformUrl: "https://leetcode.com/problems/valid-palindrome/",
    status: "Not Started",
    solvedStyle: "Independent",
    timeTakenMinutes: 15,
    category: "Beginner",
    mistakesLearnings: "Filter alphanumeric characters first or skip non-alphanumeric in-place.",
    revisionDate: ""
  },
  {
    id: "prob-3",
    name: "Best Time to Buy and Sell Stock",
    topic: "Sliding Window / Arrays",
    difficulty: "Easy",
    platformUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    status: "Not Started",
    solvedStyle: "Independent",
    timeTakenMinutes: 25,
    category: "Beginner",
    mistakesLearnings: "Track running minimum price and compute max profit in single pass.",
    revisionDate: ""
  }
];

export const INITIAL_JOB_APPLICATIONS = [
  {
    id: "app-1",
    company: "Example AI Labs",
    role: "Junior ML Engineer / Intern",
    applicationUrl: "https://linkedin.com",
    dateApplied: "2026-10-21",
    status: "Bookmarked", // 'Bookmarked', 'Applied', 'Screening', 'Technical Round', 'Offer', 'Rejected'
    nextAction: "Tailor resume and attach GitHub portfolio link",
    notes: "Requires strong Python and PyTorch foundations."
  }
];

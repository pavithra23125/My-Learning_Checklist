# 🚀 My AI Engineer Journey — Personal Learning Roadmap & Task Tracker

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black&style=flat-square)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.14-38B2AC?logo=tailwind-css&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-forest?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active_Development-284234?style=flat-square)]()
[![Repository](https://img.shields.io/badge/GitHub-pavithra23125%2FMy--Learning__Checklist-181717?logo=github&style=flat-square)](https://github.com/pavithra23125/My-Learning_Checklist)

> **A real, comprehensive, responsive learning management web application built for a final-year Computer Science Engineering student preparing to become an AI/ML Engineer while mastering software engineering and campus placement rounds.**

---

## 📌 Project Overview

**My AI Engineer Journey** is not a static dashboard or design mockup. It is a daily, interactive developer learning workstation designed to organize, pace, and monitor learning from **October 2026 through July 2027**.

The application manages:
- An **11-stage technical curriculum** (Python, SQL, DSA, Data Analysis, ML, Deep Learning, FastAPI deployment, and RAG).
- An **automated daily study planner** calibrated for a realistic **2-hour daily capacity** (75 min main sprint, 30 min placement prep, 15 min revision/documentation).
- A **capstone project manager** tracking 6 industry-level portfolio projects with milestone checklists, prerequisite topic connections, evaluation matrices, and ethical considerations.
- A **placement readiness hub** covering DSA problem logs, SQL, Core CS subjects, aptitude tests, mock interviews, and a job application pipeline.
- A **local-first persistent data architecture** with JSON backup/restore and zero external API dependencies.

---

## 📸 Screenshots

| Dashboard Overview | Learning Roadmap |
| :---: | :---: |
| ![Dashboard Preview](docs/screenshots/dashboard_preview.png) | ![Roadmap Preview](docs/screenshots/roadmap_preview.png) |
| *Live calculated metrics, daily sprint & stage tracker* | *11 stages, search, filters & expandable modules* |

| Daily Study Planner | Project Tracker |
| :---: | :---: |
| ![Planner Preview](docs/screenshots/planner_preview.png) | ![Projects Preview](docs/screenshots/projects_preview.png) |
| *Automated 2-hour schedule generator & time tracker* | *Milestones, prerequisites & testing matrices* |

*(Screenshots can be placed in `docs/screenshots/`)*

---

## ✨ Key Features

### 1. 📊 Dynamic Analytics Dashboard
- **Calculated Real Data:** Percentages and topic counts derive directly from active state—no hardcoded statistics or fake progress.
- **Stage & Milestone Badges:** Displays active stage, current target checkpoint (e.g., January 15, 2027 placement checkpoint), and portfolio targets.
- **Action Central:** Quick buttons to *"Continue Learning"*, *"Plan Today's Study"*, and *"Add My Task"*.
- **Live Widgets:** Today's study task sprint, upcoming milestone deadlines, next incomplete roadmap topic, and revision queue.

### 2. 🗺️ Complete 11-Stage Learning Roadmap
- **Stage 1 (October 2026):** Python Programming (Basics, Strings, Collections, Functions, OOP, Error & File I/O).
- **Stage 2 (October–November 2026):** SQL & Git/GitHub (Relational queries, Joins, Aggregation, Normalization, Git workflow).
- **Stage 3 (November 2026+):** DSA Using Python (Complexity analysis, Searching/Sorting, Two Pointers, Trees, Graphs).
- **Stage 4 (November 2026):** Data Analysis (NumPy arrays, Pandas DataFrames, EDA, Matplotlib, Seaborn).
- **Stage 5 (December 2026):** Mathematics & Statistics for ML (Probability, Distributions, Linear Algebra, Calculus intuition).
- **Stage 6 (December 2026–January 2027):** Machine Learning (Preprocessing, Scikit-learn algorithms, Imbalanced learning, Evaluation metrics).
- **Stage 7 (December 2026+):** Placement Preparation & Core CS (OOP, DBMS, OS, Computer Networks, Aptitude, Mock interviews).
- **Stage 8 (February 2027):** Deep Learning & PyTorch (Tensors, Autograd, Neural Networks, CNNs, Transfer learning).
- **Stage 9 (February–March 2027):** Model Deployment & APIs (FastAPI endpoints, Pydantic validation, Prediction serving, Postman).
- **Stage 10 (March 2027):** Generative AI & RAG (Embeddings, Vector search, Text chunking, RAG pipelines, Guardrails).
- **Stage 11 (April–July 2027):** Portfolio Polish & Applications (Repository polish, Mock trials, Application tracking).
- **Topic Controls:** Interactive checkboxes, expandable module accordions, search, multi-level filters (Status, Priority, Stage), and modal editing for custom target dates, notes, and resource URLs.

### 3. 📅 Automatic Daily Study Planner
- **Targeted Capacity:** Default 120 minutes (2 hours) per day, split into 75 min roadmap topic, 30 min placement, and 15 min revision.
- **Local Suggestion Engine:** Pulls automatically from in-progress topics, upcoming roadmap lessons, revision-flagged topics, and project milestones without requiring an external AI API.
- **No Duplicates:** Prevents duplicate task generation when refreshing or re-opening the application.
- **Task Actions:** Mark complete, track actual minutes spent, reschedule to future dates without losing history, and customize descriptions.

### 4. 📝 My Tasks (Manual Task Manager)
- Independent tracker for college assignments, semester exams, placement drive tasks, and resume reviews.
- Filter by category and priority; sort by due date or priority.
- **"Plan For Today":** Instantly send any manual task into today's Daily Study Planner.

### 5. 🚀 Capstone Project Tracker
Dedicated trackers for 6 industry-level projects:
1. **Student Information System** (Python OOP, File I/O, SQLite)
2. **Hotel Order and Sales Data Analysis** (NumPy, Pandas, EDA, Seaborn)
3. **Student Performance Prediction** (Statistics, Preprocessing, Scikit-learn)
4. **Financial Fraud Detection** (Class Imbalance, Precision-Recall, XGBoost)
5. **Smart PPE Compliance Monitoring** (Computer Vision, PyTorch, YOLO)
6. **AI Document Assistant Using RAG** (FastAPI, Vector DB, RAG, Embeddings)
- Tracks problem statements, core objectives, prerequisite topic completion status, milestone checklists, testing matrices, hardware/data limitations, and ethical considerations.

### 6. 🎓 Campus Placement Preparation
- **Python & DSA Tracker:** Curriculum checklist and problem log (name, platform URL, difficulty, time taken, mistakes learned).
- **SQL Interview Tracker:** Queries, joins, normalization, and ACID properties.
- **Core CS Tracker:** OOP, Operating Systems, Computer Networks, and DBMS.
- **Aptitude Tracker:** Quantitative, logical reasoning, and verbal tests.
- **Interview Readiness:** 2-minute pitch, STAR project defense, and behavioral questions.
- **Job Application Pipeline:** Track company, role, application URL, date applied, status (*Bookmarked*, *Applied*, *Screening*, *Technical Round*, *Offer*, *Rejected*), next actions, and notes.

### 7. 💼 Portfolio Quality Auditor
- Real-time presentation readiness score across all 6 projects.
- **9-Point Audit Checklist:** Clean README, setup instructions, pinned dependencies, screenshots/demo GIF, dataset source/license, metrics explained, limitations documented, no secrets committed, and interview explanation defense.

### 8. 📚 Notes & Resources Hub
- Write and search Markdown study notes, tricky interview questions, and lessons learned.
- Curate official documentation links with statuses (*To Learn*, *Learning*, *Completed*).

### 9. ⚙️ Settings, Themes & Data Backup
- Adjustable daily study capacity and sprint time allocations.
- Reschedule roadmap milestone dates without losing completion progress.
- High-contrast **Dark Forest Green Mode** vs. **Sage & Warm Off-White Light Mode**.
- **JSON Export & Import:** Download an encrypted-safe `.json` backup file of all progress and restore it with schema verification.

---

## 🛠️ Tech Stack

| Technology | Purpose | Implementation |
| :--- | :--- | :--- |
| **React 18** | UI Framework | Reusable functional components, hooks (`useAppStore.js`), state management |
| **Vite 5** | Build Tool & Dev Server | Ultra-fast HMR, optimized production asset bundling |
| **Tailwind CSS 3** | Styling & Theme System | Custom forest green, sage, warm off-white, and charcoal design tokens |
| **Lucide React** | Iconography | Clean, consistent developer iconography |
| **Canvas Confetti** | Gamification | Celebratory feedback on milestone completion |
| **LocalStorage** | Data Persistence | Client-side reactive persistence under key `MY_AI_ENGINEER_JOURNEY_STORE_V1` |
| **Puppeteer-Core** | Verification & Testing | Automated end-to-end integration test runner against local Chrome |

---

## 📁 Project Folder Structure

```
My_Checklist/
├── index.html                   # HTML entry point with fonts & metadata
├── package.json                 # Scripts, dependencies, and project metadata
├── package-lock.json            # Pinned dependency lockfile
├── postcss.config.js            # PostCSS configuration for Tailwind
├── tailwind.config.js           # Theme colors (forest, sage, warm, charcoal)
├── vite.config.js               # Vite dev server and React configuration
├── .gitignore                   # Excludes node_modules, dist, logs, and env files
│
├── src/
│   ├── main.jsx                 # Application entry point
│   ├── App.jsx                  # Main router, navigation sidebar, and layout
│   │
│   ├── components/              # Reusable UI components
│   │   ├── Badge.jsx            # Status, category, and priority pills
│   │   ├── EmptyState.jsx       # Fallback states with action triggers
│   │   ├── Header.jsx           # Top navbar with quick actions & mobile menu
│   │   ├── Modal.jsx            # Accessible focus-trapped dialog component
│   │   ├── ProgressBar.jsx      # Animated accessible progress indicators
│   │   ├── Sidebar.jsx          # Left navigation sidebar with stage milestone
│   │   └── StatCard.jsx         # Metric card with icons, values, and trends
│   │
│   ├── data/                    # Static domain and curriculum models
│   │   ├── initialState.js      # Seed state, default settings, criteria
│   │   ├── placementData.js     # DSA, SQL, Core CS, Aptitude, Job schemas
│   │   ├── projectsData.js      # 6 capstone project definitions & milestones
│   │   └── roadmapData.js       # Complete 11-stage topic-wise curriculum
│   │
│   ├── hooks/
│   │   └── useAppStore.js       # Reactive store, calculations, persistence, backup
│   │
│   ├── pages/                   # Main application views
│   │   ├── Dashboard.jsx        # Analytics, today's sprint, next topics
│   │   ├── DailyPlanner.jsx     # Automated 2-hour daily study scheduler
│   │   ├── MyTasks.jsx          # Manual assignments and college task manager
│   │   ├── NotesResources.jsx   # Technical notes, Q&A, and curated links
│   │   ├── PlacementPrep.jsx    # DSA problem log, SQL, Core CS & Jobs
│   │   ├── PortfolioTracker.jsx # 9-point presentation audit per project
│   │   ├── Projects.jsx         # Capstone project details & prerequisites
│   │   ├── Roadmap.jsx          # 11-stage topic checklist, search & filters
│   │   └── SettingsBackup.jsx   # Allocations, theme toggle & JSON backup
│   │
│   └── styles/
│       └── index.css            # Tailwind directives, CSS variables & scrollbars
│
└── tests/
    └── verifyApp.js             # Automated end-to-end integration test suite
```

---

## ⚡ Getting Started & Local Development

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/pavithra23125/My-Learning_Checklist.git
cd My-Learning_Checklist
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open **[http://127.0.0.1:3000/](http://127.0.0.1:3000/)** in your browser.

### 4. Build for Production
To generate an optimized production bundle:
```bash
npm run build
```
The output will be placed in the `dist/` directory.

### 5. Preview Production Build Locally
```bash
npm run preview
```

### 6. Run Automated Verification Tests
To run the automated Puppeteer integration suite against the running app:
```bash
node tests/verifyApp.js
```

---

## 💾 Data Persistence & Backup Instructions

- **Storage Location:** All learning roadmap checkboxes, task history, notes, and milestones are saved directly to your browser's `localStorage` (`MY_AI_ENGINEER_JOURNEY_STORE_V1`).
- **Exporting a Backup:**
  1. Open the app and click **Settings & Backup** on the sidebar.
  2. Click **Download JSON Backup**.
  3. A file named `my_ai_journey_backup_YYYY-MM-DD.json` will be saved to your downloads.
- **Restoring a Backup:**
  1. Click **Select Backup File** under *Restore From JSON*.
  2. Choose your saved JSON file to restore all progress.

---

## 🚢 Deployment

Because this is a modern, client-side React single-page application built with Vite, it can be hosted on any static hosting platform:

### Deploying to Vercel
1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root and follow the prompts.
3. Set the build command to `npm run build` and output directory to `dist`.

### Deploying to Netlify
1. Drag and drop the `dist/` folder into the Netlify Web UI, or
2. Connect your GitHub repository to Netlify with build command `npm run build` and publish directory `dist`.

### Deploying to GitHub Pages
1. In `vite.config.js`, set `base: '/My-Learning_Checklist/'`.
2. Run `npm run build`.
3. Push the `dist` directory to your `gh-pages` branch using `gh-pages` or a GitHub Action.

---

## 🔮 Future Improvements & Suggestions

*(Planned enhancements for future versions)*
- [ ] **Cloud Backend Sync:** Optional Supabase (PostgreSQL) authentication to sync progress across multiple devices without manual JSON export.
- [ ] **Jupyter Notebook Embedder:** Interactive in-app viewer for Stage 1 & Stage 4 `.ipynb` practice files.
- [ ] **GitHub Commit Activity Hook:** Automatically track project commit activity via the GitHub REST API.
- [ ] **Progressive Web App (PWA):** Enable offline desktop/mobile installation with service workers.
- [ ] **Spaced Repetition Flashcards:** Integrated Leitner-system flashcards for Core CS and ML formulas.

---

## 👤 Author

**Pavithra**
- GitHub: [@pavithra23125](https://github.com/pavithra23125)
- Repository: [pavithra23125/My-Learning_Checklist](https://github.com/pavithra23125/My-Learning_Checklist)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

export const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    title: "Student Information System",
    targetPeriod: "October 2026",
    status: "Not Started",
    category: "Software Engineering & Python",
    problemStatement: "Manual record-keeping in academic environments leads to misplaced data, inconsistent grade computations, and inefficient student progress tracking. A robust CLI/desktop student management system solves this through structured data persistence and automated reporting.",
    objectives: [
      "Manage student profiles, enrollment numbers, course registrations, and grade history.",
      "Calculate grade summaries, GPA, class averages, and rank order automatically.",
      "Enforce strict input validation, exception handling, and persistent storage via CSV/JSON or SQLite.",
      "Apply OOP principles (encapsulation, class inheritance, modular design) with testable functions."
    ],
    relatedRoadmapStageIds: ["stage-1", "stage-2"],
    requiredSkills: ["Python Fundamentals", "Functions & Collections", "File I/O (CSV/JSON)", "Object-Oriented Programming (OOP)", "Basic SQL / SQLite"],
    prerequisiteTopicIds: ["s1-t18", "s1-t21", "s1-t26", "s1-t34", "s1-t36", "s1-t40", "s1-t44", "s2-t1"],
    milestones: [
      { id: "p1-m1", title: "Requirements & Architecture Design", completed: false, description: "Define student data schema, class hierarchies, and interface specifications." },
      { id: "p1-m2", title: "Student Record Management Core", completed: false, description: "Implement add, view, update, and search operations with unique IDs." },
      { id: "p1-m3", title: "Marks and Grade Summaries Engine", completed: false, description: "Build grade computation, GPA logic, and academic status summaries." },
      { id: "p1-m4", title: "Input Validation & Error Handling", completed: false, description: "Sanitize all inputs, handle missing files, and catch invalid formats cleanly." },
      { id: "p1-m5", title: "Unit Testing & Verification", completed: false, description: "Write test cases for edge conditions, empty datasets, and calculation accuracy." },
      { id: "p1-m6", title: "README Documentation & Architecture Diagram", completed: false, description: "Write setup instructions, feature overview, and sample usage flows." },
      { id: "p1-m7", title: "GitHub Upload & Repository Polish", completed: false, description: "Add .gitignore, structured commits, and clean directory layout." }
    ],
    testingChecklist: [
      "Validate student ID uniqueness constraint",
      "Test invalid input formats (strings in marks, negative values)",
      "Test persistence: data correctly saved and reloaded from disk",
      "Verify edge case: empty file or empty student list",
      "Check GPA calculation matches standard 10-point scale"
    ],
    limitations: [
      "Designed as a single-user system without simultaneous multi-user locking.",
      "File-based storage limits scalability beyond ~10,000 records without indexing."
    ],
    ethicalConsiderations: [
      "Sensitive student information must be protected; plain text passwords or private identifiers must not be exposed.",
      "Input sanitization prevents injection or corrupted state."
    ],
    datasetInfo: "Synthetic academic records and grades generated using Python's random and faker modules.",
    githubUrl: "",
    demoUrl: "",
    screenshotRef: "",
    notes: ""
  },
  {
    id: "proj-2",
    title: "Hotel Order and Sales Data Analysis",
    targetPeriod: "November 2026",
    status: "Not Started",
    category: "Data Analysis & EDA",
    problemStatement: "Hospitality managers frequently face inventory waste, unpredictable peak order times, and inconsistent customer item demand without data-driven operational insights.",
    objectives: [
      "Cleanse messy raw hotel order logs, handling missing timestamps, duplicates, and faulty pricing.",
      "Conduct Exploratory Data Analysis (EDA) on order trends, day-of-week patterns, and top dish combos.",
      "Analyze revenue patterns only where explicitly verified in the dataset without speculative assumptions.",
      "Synthesize evidence-based operational recommendations backed by clear Matplotlib/Seaborn charts."
    ],
    relatedRoadmapStageIds: ["stage-4"],
    requiredSkills: ["NumPy", "Pandas", "Data Cleaning", "Exploratory Data Analysis", "Matplotlib & Seaborn"],
    prerequisiteTopicIds: ["s4-t1", "s4-t9", "s4-t14", "s4-t18", "s4-t25", "s4-t31", "s4-t36"],
    milestones: [
      { id: "p2-m1", title: "Dataset Inspection & Schema Audit", completed: false, description: "Understand data types, missing records, anomalies, and structural integrity." },
      { id: "p2-m2", title: "Data Cleaning & Type Rectification", completed: false, description: "Handle null values, duplicate entries, parse datetime strings, and clean currencies." },
      { id: "p2-m3", title: "Order Trends & Popular Item Analysis", completed: false, description: "Identify peak dining hours, recurring weekly demand, and menu volume distributions." },
      { id: "p2-m4", title: "Revenue Analysis (Evidence-Based)", completed: false, description: "Compute reliable revenue metrics only where strictly supported by genuine sales columns." },
      { id: "p2-m5", title: "Visual Dashboard & Insight Charts", completed: false, description: "Create readable, annotated charts with proper titles, legends, and color palettes." },
      { id: "p2-m6", title: "Evidence-Based Findings Report", completed: false, description: "Synthesize clear, grounded business takeaways with zero unsupported speculation." },
      { id: "p2-m7", title: "Publish Jupyter Notebook & Clean README", completed: false, description: "Format notebook with markdown narrative, methodology notes, and data limitations." }
    ],
    testingChecklist: [
      "Verify total row counts before and after dropping/imputing nulls",
      "Ensure aggregations match manual sample sanity checks",
      "Confirm charts have clear labels, units, and high contrast",
      "Check that conclusions are directly tied to documented chart evidence"
    ],
    limitations: [
      "Historical data may not capture external factors such as seasonal tourism or holiday spikes.",
      "Cannot infer customer demographics or food satisfaction from order timestamp logs alone."
    ],
    ethicalConsiderations: [
      "Remove any personally identifiable customer information (names, room numbers, phone numbers).",
      "Do not present speculative revenue projections as facts."
    ],
    datasetInfo: "Kaggle Hotel Booking and Restaurant Order Records public dataset.",
    githubUrl: "",
    demoUrl: "",
    screenshotRef: "",
    notes: ""
  },
  {
    id: "proj-3",
    title: "Student Performance Prediction",
    targetPeriod: "December 2026",
    status: "Not Started",
    category: "Machine Learning & Statistics",
    problemStatement: "Educational institutions struggle to identify at-risk students early enough in the semester to offer timely tutoring, mentoring, and academic intervention.",
    objectives: [
      "Frame academic score estimation as a supervised regression and classification problem.",
      "Conduct feature engineering on study hours, attendance, parental education, and past test marks.",
      "Establish a naive baseline before evaluating Linear Regression, Decision Trees, and Random Forests.",
      "Guard against data leakage, evaluate with RMSE/MAE and F1-score, and explain model limitations."
    ],
    relatedRoadmapStageIds: ["stage-5", "stage-6"],
    requiredSkills: ["Statistics & Distributions", "Feature Scaling & Encoding", "Supervised ML (Regression & Classification)", "Cross-Validation", "Scikit-Learn"],
    prerequisiteTopicIds: ["s5-t2", "s5-t10", "s6-t3", "s6-t6", "s6-t9", "s6-t14", "s6-t17", "s6-t21", "s6-t25"],
    milestones: [
      { id: "p3-m1", title: "Dataset Selection & Target Definition", completed: false, description: "Acquire UCI Student Performance dataset and clearly define target grades." },
      { id: "p3-m2", title: "EDA & Feature Preprocessing", completed: false, description: "Examine distributions, collinearity, encode categorical variables, and scale numeric features." },
      { id: "p3-m3", title: "Leakage Prevention & Cross-Validation Setup", completed: false, description: "Implement strict train/test split before fitting transformers and models." },
      { id: "p3-m4", title: "Baseline Model Implementation", completed: false, description: "Establish dummy regressor / mean prediction benchmark to ensure real learning." },
      { id: "p3-m5", title: "Model Training & Comparison", completed: false, description: "Train Linear Regression, Ridge, Decision Tree, and Random Forest models." },
      { id: "p3-m6", title: "Evaluation & Metric Analysis", completed: false, description: "Compare RMSE, MAE, R-squared and residual plots across models." },
      { id: "p3-m7", title: "Responsible Use & Limitation Documentation", completed: false, description: "Document demographic caveats, fairness risks, and guidance against automated punitive use." }
    ],
    testingChecklist: [
      "Confirm scaler was fit strictly on train split, transforming test split without re-fitting",
      "Verify test RMSE beats baseline dummy predictor",
      "Examine residual plot for non-linear patterns or heteroscedasticity",
      "Verify cross-validation variance across folds"
    ],
    limitations: [
      "Student learning involves emotional and qualitative variables not captured by numerical test scores.",
      "Models trained on one institution's demographics cannot be directly generalized to another."
    ],
    ethicalConsiderations: [
      "Predictions must serve as diagnostic support for assistance, never for automated academic penalties or discriminatory tracking.",
      "Audit feature importance to prevent reinforcing systemic socio-economic biases."
    ],
    datasetInfo: "UCI Machine Learning Repository: Student Performance Dataset (Cortez and Silva, 2008).",
    githubUrl: "",
    demoUrl: "",
    screenshotRef: "",
    notes: ""
  },
  {
    id: "proj-4",
    title: "Financial Fraud Detection",
    targetPeriod: "January 2027",
    status: "Not Started",
    category: "Advanced Machine Learning",
    problemStatement: "In digital payments, fraudulent transactions constitute less than 0.2% of total volume, rendering conventional accuracy metrics misleading and risking massive financial losses or frustrated users.",
    objectives: [
      "Handle extreme class imbalance using SMOTE, class-weighting, and stratified sampling.",
      "Compare Logistic Regression, Random Forests, and XGBoost/LightGBM.",
      "Optimize Precision-Recall tradeoff, emphasizing False Negative cost versus False Positive friction.",
      "Interpret decision thresholds and feature importance with SHAP/permutation importance."
    ],
    relatedRoadmapStageIds: ["stage-6"],
    requiredSkills: ["Imbalanced Learning", "Precision-Recall Optimization", "ROC-AUC Analysis", "Model Interpretability", "Ensemble Methods"],
    prerequisiteTopicIds: ["s6-t15", "s6-t18", "s6-t21", "s6-t26", "s6-t28", "s6-t29", "s6-t30", "s6-t34"],
    milestones: [
      { id: "p4-m1", title: "Dataset Selection & Imbalance Profiling", completed: false, description: "Acquire Kaggle Credit Card Fraud dataset; calculate exact class ratios and transaction values." },
      { id: "p4-m2", title: "Stratified Train/Test Partitioning", completed: false, description: "Partition data ensuring identical minority class distribution in both splits." },
      { id: "p4-m3", title: "Resampling & Imbalance Strategies", completed: false, description: "Benchmark class-weighted loss, SMOTE, and under-sampling on the training split." },
      { id: "p4-m4", title: "Model Training & Hyperparameter Tuning", completed: false, description: "Fit Logistic Regression, Random Forest, and Gradient Boosted Trees." },
      { id: "p4-m5", title: "False Positive vs False Negative Cost Analysis", completed: false, description: "Adjust classification probability thresholds based on real business impact." },
      { id: "p4-m6", title: "Explainability & Feature Importance", completed: false, description: "Extract top predictive features and explain risk patterns." },
      { id: "p4-m7", title: "Production Deployment Considerations & README", completed: false, description: "Document latency constraints, drift detection, and limitations." }
    ],
    testingChecklist: [
      "Ensure accuracy is NOT used as primary metric; report Precision, Recall, PR-AUC, and F1",
      "Verify SMOTE is applied only to training folds during cross-validation",
      "Validate confusion matrix shows acceptable recall on fraud cases",
      "Test threshold tuning curve on held-out validation set"
    ],
    limitations: [
      "Fraud patterns evolve rapidly (adversarial drift); model will decay without continuous retraining.",
      "Anonymized PCA features in public benchmarks prevent direct domain-specific feature engineering."
    ],
    ethicalConsiderations: [
      "False positives block legitimate user transactions, which disproportionately impacts marginalized or non-standard shoppers.",
      "System must provide human appeal paths rather than irrevocable automatic denials."
    ],
    datasetInfo: "Kaggle Credit Card Fraud Detection Dataset (ULB Machine Learning Group).",
    githubUrl: "",
    demoUrl: "",
    screenshotRef: "",
    notes: ""
  },
  {
    id: "proj-5",
    title: "Smart PPE Compliance Monitoring",
    targetPeriod: "February 2027",
    status: "Not Started",
    category: "Computer Vision & Deep Learning",
    problemStatement: "Construction sites and industrial manufacturing plants suffer preventable worker injuries due to non-compliance with Personal Protective Equipment (hard hats, safety vests, masks).",
    objectives: [
      "Review and build upon existing object detection implementations, reusing working components.",
      "Utilize YOLO / PyTorch object detection models to locate workers, helmets, and safety vests.",
      "Implement real-time visual bounding boxes, confidence threshold filtering, and compliance state logic.",
      "Log non-compliance events with timestamps and provide a summary compliance dashboard."
    ],
    relatedRoadmapStageIds: ["stage-8"],
    requiredSkills: ["PyTorch", "Computer Vision Basics", "YOLO / Object Detection", "Video Stream Processing", "Event Logging"],
    prerequisiteTopicIds: ["s8-t12", "s8-t14", "s8-t17", "s8-t18"],
    milestones: [
      { id: "p5-m1", title: "Review Existing Implementation & Asset Audit", completed: false, description: "Inspect prior scripts/notebooks, verify reusable model weights and video feeds." },
      { id: "p5-m2", title: "Dataset Verification & Annotation Audit", completed: false, description: "Validate classes: person, hardhat, safety_vest, no_hat, no_vest." },
      { id: "p5-m3", title: "Architecture & Detection Pipeline Documentation", completed: false, description: "Diagram frame extraction, model inference, bounding box association, and state machine." },
      { id: "p5-m4", title: "Model Inference & Fine-Tuning Evaluation", completed: false, description: "Evaluate mAP@0.5, inference FPS on GPU/CPU, and IoU thresholds." },
      { id: "p5-m5", title: "Compliance State Decision Logic", completed: false, description: "Associate detected PPE with individual worker bounding boxes to determine compliant status." },
      { id: "p5-m6", title: "Violation Logging & Event Alerting", completed: false, description: "Output structured event logs with timestamps, worker snapshots, and compliance percentage." },
      { id: "p5-m7", title: "Hardware, Safety & Privacy Limitations Documentation", completed: false, description: "Detail camera angle limits, lighting requirements, and worker privacy protections." }
    ],
    testingChecklist: [
      "Test inference speed on target device (FPS >= 15 for video streaming)",
      "Test occlusion handling (worker partially behind beam or scaffolding)",
      "Verify false alarm rate on non-helmet headwear (caps, beanies)",
      "Test night/dim lighting conditions"
    ],
    limitations: [
      "Severely angled overhead cameras or extreme distance degrade detection fidelity.",
      "Does not inspect equipment structural integrity (e.g. cracked helmet shell)."
    ],
    ethicalConsiderations: [
      "Worker privacy: cameras should monitor safety zones rather than personal break areas.",
      "Never use safety compliance logs for automated punitive wage penalties; focus on proactive hazard prevention."
    ],
    datasetInfo: "Roboflow Universe PPE Dataset / Pictor Construction Safety Benchmark.",
    githubUrl: "",
    demoUrl: "",
    screenshotRef: "",
    notes: ""
  },
  {
    id: "proj-6",
    title: "AI Document Assistant Using RAG",
    targetPeriod: "March 2027",
    status: "Not Started",
    category: "Generative AI & LLMs",
    problemStatement: "Organizations and students struggle to quickly extract accurate, grounded insights from long technical reports and textbooks without encountering LLM hallucinations.",
    objectives: [
      "Parse and chunk complex PDF documents using semantic or recursive character strategies.",
      "Generate embeddings and store vectors in ChromaDB / FAISS for fast similarity search.",
      "Retrieve top-k relevant context chunks and synthesize grounded answers with citations.",
      "Wrap system in a FastAPI backend with citation references and unanswerable question handling."
    ],
    relatedRoadmapStageIds: ["stage-9", "stage-10"],
    requiredSkills: ["LLM Prompting", "Vector Databases (FAISS/Chroma)", "Text Chunking Strategies", "RAG Pipeline Engineering", "FastAPI"],
    prerequisiteTopicIds: ["s9-t4", "s9-t10", "s10-t5", "s10-t7", "s10-t9", "s10-t10", "s10-t13", "s10-t15"],
    milestones: [
      { id: "p6-m1", title: "Document Selection & Text Extraction Pipeline", completed: false, description: "Build robust PDF extraction handling tables, headings, and clean page metadata." },
      { id: "p6-m2", title: "Chunking Strategy & Embedding Generation", completed: false, description: "Implement recursive text splitter with chunk overlap; compute embeddings via open models." },
      { id: "p6-m3", title: "Vector Store & Top-K Retrieval Index", completed: false, description: "Index chunks in FAISS/ChromaDB and test cosine similarity query accuracy." },
      { id: "p6-m4", title: "Prompt Template & Grounded Generation", completed: false, description: "Construct strict context prompts instructing LLM to answer only using provided context." },
      { id: "p6-m5", title: "Citation & Source Page Attribution Engine", completed: false, description: "Return source chunk snippets and exact PDF page numbers alongside each answer." },
      { id: "p6-m6", title: "Evaluation on Unanswerable Queries & Hallucinations", completed: false, description: "Benchmark model refusal rate when user query is outside the source documents." },
      { id: "p6-m7", title: "FastAPI Backend & Interactive Demonstration", completed: false, description: "Expose /upload and /query endpoints with CORS, validation, and demo interface." }
    ],
    testingChecklist: [
      "Verify system refuses to answer queries missing from the context",
      "Verify citation page numbers accurately match original PDF content",
      "Test chunking boundary consistency across multiline paragraphs",
      "Verify API response time remains under 3 seconds on standard documents"
    ],
    limitations: [
      "Standard text chunking degrades on complex financial tables or multi-column newspaper layouts.",
      "Retrieval accuracy depends heavily on embedding query formulation."
    ],
    ethicalConsiderations: [
      "Ensure uploaded corporate or personal documents are not leaked to external training sets.",
      "Clearly indicate that answers are AI-assisted summaries requiring human verification."
    ],
    datasetInfo: "Open-access AI research papers and technical documentation (ArXiv / Hugging Face).",
    githubUrl: "",
    demoUrl: "",
    screenshotRef: "",
    notes: ""
  }
];

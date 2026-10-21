export const ROADMAP_STAGES = [
  {
    id: "stage-1",
    number: 1,
    title: "Python Programming",
    targetPeriod: "October 2026",
    description: "Build robust programming fundamentals, data structures, OOP principles, and clean code habits.",
    modules: [
      {
        id: "s1-m1",
        title: "Python Basics",
        topics: [
          { id: "s1-t1", title: "Installing and running Python", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t2", title: "Jupyter Notebook basics", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t3", title: "Variables and naming conventions", estimatedMinutes: 30, priority: "Medium" },
          { id: "s1-t4", title: "Integers, floats, strings and booleans", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t5", title: "Type conversion", estimatedMinutes: 30, priority: "Medium" },
          { id: "s1-t6", title: "Input and output", estimatedMinutes: 30, priority: "Medium" },
          { id: "s1-t7", title: "Arithmetic, comparison and logical operators", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t8", title: "Operator precedence", estimatedMinutes: 30, priority: "Low" },
          { id: "s1-t9", title: "f-strings", estimatedMinutes: 30, priority: "Medium" },
          { id: "s1-t10", title: "if, elif and else", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t11", title: "for and while loops", estimatedMinutes: 60, priority: "High" },
          { id: "s1-t12", title: "range()", estimatedMinutes: 30, priority: "Medium" },
          { id: "s1-t13", title: "break, continue and pass", estimatedMinutes: 30, priority: "Medium" },
          { id: "s1-t14", title: "Nested loops", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t15", title: "Dry-running code", estimatedMinutes: 45, priority: "High" }
        ]
      },
      {
        id: "s1-m2",
        title: "Strings and Collections",
        topics: [
          { id: "s1-t16", title: "String indexing and slicing", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t17", title: "String methods", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t18", title: "Lists and list methods", estimatedMinutes: 60, priority: "High" },
          { id: "s1-t19", title: "Tuples and tuple methods", estimatedMinutes: 30, priority: "Medium" },
          { id: "s1-t20", title: "Sets and set operations", estimatedMinutes: 45, priority: "Medium" },
          { id: "s1-t21", title: "Dictionaries and dictionary methods", estimatedMinutes: 60, priority: "High" },
          { id: "s1-t22", title: "Membership operators", estimatedMinutes: 30, priority: "Low" },
          { id: "s1-t23", title: "Mutable and immutable objects", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t24", title: "Nested collections", estimatedMinutes: 60, priority: "High" },
          { id: "s1-t25", title: "List comprehensions", estimatedMinutes: 45, priority: "High" }
        ]
      },
      {
        id: "s1-m3",
        title: "Functions",
        topics: [
          { id: "s1-t26", title: "Defining and calling functions", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t27", title: "Parameters and arguments", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t28", title: "Return values", estimatedMinutes: 30, priority: "High" },
          { id: "s1-t29", title: "Default and keyword arguments", estimatedMinutes: 45, priority: "Medium" },
          { id: "s1-t30", title: "Local and global scope", estimatedMinutes: 45, priority: "Medium" },
          { id: "s1-t31", title: "Basic lambda functions", estimatedMinutes: 30, priority: "Low" },
          { id: "s1-t32", title: "Reusable functions", estimatedMinutes: 45, priority: "High" }
        ]
      },
      {
        id: "s1-m4",
        title: "Error Handling and File Handling",
        topics: [
          { id: "s1-t33", title: "Syntax and runtime errors", estimatedMinutes: 30, priority: "Medium" },
          { id: "s1-t34", title: "try, except, else and finally", estimatedMinutes: 60, priority: "High" },
          { id: "s1-t35", title: "Raising exceptions", estimatedMinutes: 30, priority: "Medium" },
          { id: "s1-t36", title: "Text file reading and writing", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t37", title: "CSV files", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t38", title: "JSON files", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t39", title: "Safe file paths and handling", estimatedMinutes: 30, priority: "Medium" }
        ]
      },
      {
        id: "s1-m5",
        title: "Object-Oriented Programming",
        topics: [
          { id: "s1-t40", title: "Classes and objects", estimatedMinutes: 60, priority: "High" },
          { id: "s1-t41", title: "Constructors and __init__", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t42", title: "Instance attributes and methods", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t43", title: "Class attributes", estimatedMinutes: 30, priority: "Medium" },
          { id: "s1-t44", title: "Encapsulation", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t45", title: "Inheritance", estimatedMinutes: 60, priority: "High" },
          { id: "s1-t46", title: "Polymorphism", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t47", title: "Method overriding", estimatedMinutes: 30, priority: "Medium" },
          { id: "s1-t48", title: "Abstraction basics", estimatedMinutes: 45, priority: "Medium" },
          { id: "s1-t49", title: "Composition basics", estimatedMinutes: 45, priority: "Medium" },
          { id: "s1-t50", title: "Method Resolution Order basics", estimatedMinutes: 30, priority: "Low" }
        ]
      },
      {
        id: "s1-m6",
        title: "Additional Python Topics",
        topics: [
          { id: "s1-t51", title: "Modules and imports", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t52", title: "Packages", estimatedMinutes: 30, priority: "Medium" },
          { id: "s1-t53", title: "Standard library basics", estimatedMinutes: 45, priority: "Medium" },
          { id: "s1-t54", title: "Debugging", estimatedMinutes: 45, priority: "High" },
          { id: "s1-t55", title: "Code readability", estimatedMinutes: 30, priority: "Medium" },
          { id: "s1-t56", title: "Basic testing", estimatedMinutes: 45, priority: "Medium" },
          { id: "s1-t57", title: "Organizing Python files and folders", estimatedMinutes: 30, priority: "Medium" }
        ]
      }
    ]
  },
  {
    id: "stage-2",
    number: 2,
    title: "SQL and Git/GitHub",
    targetPeriod: "October–November 2026",
    description: "Database queries, relational schemas, version control, and collaboration workflows.",
    modules: [
      {
        id: "s2-m1",
        title: "SQL",
        topics: [
          { id: "s2-t1", title: "Relational database fundamentals", estimatedMinutes: 45, priority: "High" },
          { id: "s2-t2", title: "Tables, rows and columns", estimatedMinutes: 30, priority: "High" },
          { id: "s2-t3", title: "Primary and foreign keys", estimatedMinutes: 45, priority: "High" },
          { id: "s2-t4", title: "SELECT and DISTINCT", estimatedMinutes: 30, priority: "High" },
          { id: "s2-t5", title: "WHERE", estimatedMinutes: 30, priority: "High" },
          { id: "s2-t6", title: "AND, OR and NOT", estimatedMinutes: 30, priority: "High" },
          { id: "s2-t7", title: "IN, BETWEEN and LIKE", estimatedMinutes: 45, priority: "High" },
          { id: "s2-t8", title: "ORDER BY and LIMIT", estimatedMinutes: 30, priority: "Medium" },
          { id: "s2-t9", title: "NULL handling", estimatedMinutes: 30, priority: "Medium" },
          { id: "s2-t10", title: "COUNT, SUM, AVG, MIN and MAX", estimatedMinutes: 45, priority: "High" },
          { id: "s2-t11", title: "GROUP BY and HAVING", estimatedMinutes: 60, priority: "High" },
          { id: "s2-t12", title: "INNER JOIN and LEFT JOIN", estimatedMinutes: 60, priority: "High" },
          { id: "s2-t13", title: "RIGHT JOIN basics", estimatedMinutes: 30, priority: "Medium" },
          { id: "s2-t14", title: "Self joins", estimatedMinutes: 45, priority: "Medium" },
          { id: "s2-t15", title: "Subqueries", estimatedMinutes: 60, priority: "High" },
          { id: "s2-t16", title: "CASE expressions", estimatedMinutes: 45, priority: "Medium" },
          { id: "s2-t17", title: "INSERT, UPDATE and DELETE", estimatedMinutes: 45, priority: "High" },
          { id: "s2-t18", title: "Constraints", estimatedMinutes: 45, priority: "Medium" },
          { id: "s2-t19", title: "Normalization basics", estimatedMinutes: 60, priority: "High" },
          { id: "s2-t20", title: "Indexing basics", estimatedMinutes: 45, priority: "High" },
          { id: "s2-t21", title: "Transactions basics", estimatedMinutes: 45, priority: "Medium" }
        ]
      },
      {
        id: "s2-m2",
        title: "Git and GitHub",
        topics: [
          { id: "s2-t22", title: "Git versus GitHub", estimatedMinutes: 30, priority: "High" },
          { id: "s2-t23", title: "git init", estimatedMinutes: 20, priority: "High" },
          { id: "s2-t24", title: "git status", estimatedMinutes: 20, priority: "High" },
          { id: "s2-t25", title: "git add", estimatedMinutes: 20, priority: "High" },
          { id: "s2-t26", title: "git commit", estimatedMinutes: 30, priority: "High" },
          { id: "s2-t27", title: "git log and git diff", estimatedMinutes: 30, priority: "Medium" },
          { id: "s2-t28", title: "Branches and switching branches", estimatedMinutes: 45, priority: "High" },
          { id: "s2-t29", title: "Basic merging", estimatedMinutes: 45, priority: "High" },
          { id: "s2-t30", title: "git clone", estimatedMinutes: 20, priority: "High" },
          { id: "s2-t31", title: "git remote", estimatedMinutes: 30, priority: "High" },
          { id: "s2-t32", title: "git push and git pull", estimatedMinutes: 45, priority: "High" },
          { id: "s2-t33", title: ".gitignore", estimatedMinutes: 30, priority: "High" },
          { id: "s2-t34", title: "README writing", estimatedMinutes: 45, priority: "High" },
          { id: "s2-t35", title: "Repository organization", estimatedMinutes: 30, priority: "Medium" },
          { id: "s2-t36", title: "Simple merge-conflict resolution", estimatedMinutes: 45, priority: "High" },
          { id: "s2-t37", title: "Safe handling of API keys, passwords and .env files", estimatedMinutes: 45, priority: "High" }
        ]
      }
    ]
  },
  {
    id: "stage-3",
    number: 3,
    title: "DSA Using Python",
    targetPeriod: "November 2026 onward",
    description: "Core algorithms, data structures, and systematic problem solving for software interviews.",
    modules: [
      {
        id: "s3-m1",
        title: "Complexity and Fundamentals",
        topics: [
          { id: "s3-t1", title: "Algorithm basics", estimatedMinutes: 45, priority: "High" },
          { id: "s3-t2", title: "Time and space complexity", estimatedMinutes: 60, priority: "High" },
          { id: "s3-t3", title: "O(1), O(log n), O(n), O(n log n), O(n²)", estimatedMinutes: 60, priority: "High" },
          { id: "s3-t4", title: "Best, average and worst cases", estimatedMinutes: 45, priority: "Medium" },
          { id: "s3-t5", title: "Common list and dictionary operation costs", estimatedMinutes: 45, priority: "High" }
        ]
      },
      {
        id: "s3-m2",
        title: "Data Structures and Algorithms",
        topics: [
          { id: "s3-t6", title: "Arrays and lists", estimatedMinutes: 60, priority: "High" },
          { id: "s3-t7", title: "Strings", estimatedMinutes: 60, priority: "High" },
          { id: "s3-t8", title: "Linear search", estimatedMinutes: 30, priority: "Medium" },
          { id: "s3-t9", title: "Binary search", estimatedMinutes: 60, priority: "High" },
          { id: "s3-t10", title: "Bubble sort", estimatedMinutes: 30, priority: "Low" },
          { id: "s3-t11", title: "Selection sort", estimatedMinutes: 30, priority: "Low" },
          { id: "s3-t12", title: "Insertion sort", estimatedMinutes: 30, priority: "Low" },
          { id: "s3-t13", title: "Merge sort", estimatedMinutes: 60, priority: "High" },
          { id: "s3-t14", title: "Hashing", estimatedMinutes: 60, priority: "High" },
          { id: "s3-t15", title: "Frequency counting", estimatedMinutes: 45, priority: "High" },
          { id: "s3-t16", title: "Dictionaries and sets for problem solving", estimatedMinutes: 60, priority: "High" },
          { id: "s3-t17", title: "Two pointers", estimatedMinutes: 60, priority: "High" },
          { id: "s3-t18", title: "Sliding window", estimatedMinutes: 60, priority: "High" },
          { id: "s3-t19", title: "Prefix sums", estimatedMinutes: 45, priority: "Medium" },
          { id: "s3-t20", title: "Recursion", estimatedMinutes: 60, priority: "High" },
          { id: "s3-t21", title: "Backtracking basics", estimatedMinutes: 60, priority: "Medium" },
          { id: "s3-t22", title: "Stacks", estimatedMinutes: 60, priority: "High" },
          { id: "s3-t23", title: "Queues and deque", estimatedMinutes: 45, priority: "High" },
          { id: "s3-t24", title: "Linked lists", estimatedMinutes: 60, priority: "High" },
          { id: "s3-t25", title: "Trees", estimatedMinutes: 60, priority: "High" },
          { id: "s3-t26", title: "Binary search trees", estimatedMinutes: 60, priority: "High" },
          { id: "s3-t27", title: "Heaps and priority queues", estimatedMinutes: 60, priority: "Medium" },
          { id: "s3-t28", title: "Graph representations", estimatedMinutes: 60, priority: "High" },
          { id: "s3-t29", title: "BFS and DFS basics", estimatedMinutes: 75, priority: "High" }
        ]
      }
    ]
  },
  {
    id: "stage-4",
    number: 4,
    title: "Data Analysis",
    targetPeriod: "November 2026",
    description: "NumPy arrays, Pandas data manipulation, exploratory analysis, and data visualization.",
    modules: [
      {
        id: "s4-m1",
        title: "NumPy",
        topics: [
          { id: "s4-t1", title: "Arrays", estimatedMinutes: 45, priority: "High" },
          { id: "s4-t2", title: "Shapes and dimensions", estimatedMinutes: 45, priority: "High" },
          { id: "s4-t3", title: "Indexing and slicing", estimatedMinutes: 45, priority: "High" },
          { id: "s4-t4", title: "Reshaping", estimatedMinutes: 30, priority: "Medium" },
          { id: "s4-t5", title: "Vectorized operations", estimatedMinutes: 45, priority: "High" },
          { id: "s4-t6", title: "Broadcasting basics", estimatedMinutes: 45, priority: "High" },
          { id: "s4-t7", title: "Aggregation", estimatedMinutes: 30, priority: "Medium" },
          { id: "s4-t8", title: "Random number generation basics", estimatedMinutes: 30, priority: "Medium" }
        ]
      },
      {
        id: "s4-m2",
        title: "Pandas",
        topics: [
          { id: "s4-t9", title: "Series and DataFrames", estimatedMinutes: 60, priority: "High" },
          { id: "s4-t10", title: "CSV and Excel loading", estimatedMinutes: 30, priority: "High" },
          { id: "s4-t11", title: "Dataset inspection", estimatedMinutes: 45, priority: "High" },
          { id: "s4-t12", title: "Selecting rows and columns", estimatedMinutes: 45, priority: "High" },
          { id: "s4-t13", title: "Filtering and sorting", estimatedMinutes: 45, priority: "High" },
          { id: "s4-t14", title: "Missing values", estimatedMinutes: 60, priority: "High" },
          { id: "s4-t15", title: "Duplicates", estimatedMinutes: 30, priority: "Medium" },
          { id: "s4-t16", title: "Data types", estimatedMinutes: 30, priority: "Medium" },
          { id: "s4-t17", title: "String operations", estimatedMinutes: 45, priority: "Medium" },
          { id: "s4-t18", title: "GroupBy and aggregation", estimatedMinutes: 60, priority: "High" },
          { id: "s4-t19", title: "Merge and join", estimatedMinutes: 60, priority: "High" },
          { id: "s4-t20", title: "Concatenation", estimatedMinutes: 45, priority: "Medium" },
          { id: "s4-t21", title: "Date/time handling", estimatedMinutes: 45, priority: "Medium" },
          { id: "s4-t22", title: "Exporting cleaned datasets", estimatedMinutes: 30, priority: "Medium" }
        ]
      },
      {
        id: "s4-m3",
        title: "Exploratory Data Analysis",
        topics: [
          { id: "s4-t23", title: "Understanding dataset columns", estimatedMinutes: 45, priority: "High" },
          { id: "s4-t24", title: "Data-quality checks", estimatedMinutes: 45, priority: "High" },
          { id: "s4-t25", title: "Univariate and bivariate analysis", estimatedMinutes: 60, priority: "High" },
          { id: "s4-t26", title: "Distributions and outliers", estimatedMinutes: 60, priority: "High" },
          { id: "s4-t27", title: "Correlation", estimatedMinutes: 45, priority: "High" },
          { id: "s4-t28", title: "Appropriate chart selection", estimatedMinutes: 45, priority: "Medium" },
          { id: "s4-t29", title: "Evidence-based conclusions", estimatedMinutes: 45, priority: "High" },
          { id: "s4-t30", title: "Limitations and assumptions", estimatedMinutes: 45, priority: "Medium" }
        ]
      },
      {
        id: "s4-m4",
        title: "Visualization",
        topics: [
          { id: "s4-t31", title: "Matplotlib basics", estimatedMinutes: 45, priority: "High" },
          { id: "s4-t32", title: "Line charts", estimatedMinutes: 30, priority: "Medium" },
          { id: "s4-t33", title: "Bar charts", estimatedMinutes: 30, priority: "High" },
          { id: "s4-t34", title: "Histograms", estimatedMinutes: 45, priority: "High" },
          { id: "s4-t35", title: "Scatter plots", estimatedMinutes: 45, priority: "High" },
          { id: "s4-t36", title: "Seaborn basics", estimatedMinutes: 45, priority: "High" },
          { id: "s4-t37", title: "Heatmaps", estimatedMinutes: 45, priority: "High" },
          { id: "s4-t38", title: "Titles, labels and readable charts", estimatedMinutes: 30, priority: "Medium" }
        ]
      }
    ]
  },
  {
    id: "stage-5",
    number: 5,
    title: "Mathematics and Statistics for ML",
    targetPeriod: "December 2026",
    description: "Probability, descriptive & inferential statistics, linear algebra, and multivariable calculus intuition.",
    modules: [
      {
        id: "s5-m1",
        title: "Statistics and Probability",
        topics: [
          { id: "s5-t1", title: "Mean, median and mode", estimatedMinutes: 30, priority: "High" },
          { id: "s5-t2", title: "Range, variance and standard deviation", estimatedMinutes: 45, priority: "High" },
          { id: "s5-t3", title: "Percentiles and quartiles", estimatedMinutes: 30, priority: "Medium" },
          { id: "s5-t4", title: "Outliers", estimatedMinutes: 45, priority: "High" },
          { id: "s5-t5", title: "Probability", estimatedMinutes: 45, priority: "High" },
          { id: "s5-t6", title: "Conditional probability", estimatedMinutes: 45, priority: "High" },
          { id: "s5-t7", title: "Bayes' theorem intuition", estimatedMinutes: 60, priority: "High" },
          { id: "s5-t8", title: "Common probability distributions", estimatedMinutes: 60, priority: "High" },
          { id: "s5-t9", title: "Sampling", estimatedMinutes: 30, priority: "Medium" },
          { id: "s5-t10", title: "Correlation and covariance", estimatedMinutes: 45, priority: "High" },
          { id: "s5-t11", title: "Population versus sample", estimatedMinutes: 30, priority: "Medium" },
          { id: "s5-t12", title: "Confidence interval intuition", estimatedMinutes: 45, priority: "Medium" },
          { id: "s5-t13", title: "Hypothesis testing basics", estimatedMinutes: 60, priority: "High" }
        ]
      },
      {
        id: "s5-m2",
        title: "Linear Algebra",
        topics: [
          { id: "s5-t14", title: "Scalars, vectors and matrices", estimatedMinutes: 45, priority: "High" },
          { id: "s5-t15", title: "Matrix dimensions", estimatedMinutes: 30, priority: "High" },
          { id: "s5-t16", title: "Matrix operations", estimatedMinutes: 45, priority: "High" },
          { id: "s5-t17", title: "Dot products", estimatedMinutes: 45, priority: "High" },
          { id: "s5-t18", title: "Vector magnitude", estimatedMinutes: 30, priority: "Medium" },
          { id: "s5-t19", title: "Matrix multiplication intuition", estimatedMinutes: 60, priority: "High" }
        ]
      },
      {
        id: "s5-m3",
        title: "Calculus",
        topics: [
          { id: "s5-t20", title: "Functions and graphs", estimatedMinutes: 30, priority: "Medium" },
          { id: "s5-t21", title: "Derivative intuition", estimatedMinutes: 45, priority: "High" },
          { id: "s5-t22", title: "Partial derivatives", estimatedMinutes: 60, priority: "High" },
          { id: "s5-t23", title: "Gradient intuition", estimatedMinutes: 45, priority: "High" },
          { id: "s5-t24", title: "Gradient descent", estimatedMinutes: 60, priority: "High" }
        ]
      }
    ]
  },
  {
    id: "stage-6",
    number: 6,
    title: "Machine Learning",
    targetPeriod: "December 2026–January 2027",
    description: "Supervised and unsupervised models, scikit-learn pipelines, cross-validation, and metrics.",
    modules: [
      {
        id: "s6-m1",
        title: "Fundamentals",
        topics: [
          { id: "s6-t1", title: "AI versus ML versus deep learning", estimatedMinutes: 45, priority: "High" },
          { id: "s6-t2", title: "Supervised and unsupervised learning", estimatedMinutes: 45, priority: "High" },
          { id: "s6-t3", title: "Regression versus classification", estimatedMinutes: 45, priority: "High" },
          { id: "s6-t4", title: "Features and target variables", estimatedMinutes: 30, priority: "High" },
          { id: "s6-t5", title: "Train, validation and test datasets", estimatedMinutes: 45, priority: "High" },
          { id: "s6-t6", title: "Baseline models", estimatedMinutes: 45, priority: "High" },
          { id: "s6-t7", title: "Reproducibility", estimatedMinutes: 30, priority: "Medium" }
        ]
      },
      {
        id: "s6-m2",
        title: "Preprocessing",
        topics: [
          { id: "s6-t8", title: "Missing-value handling", estimatedMinutes: 45, priority: "High" },
          { id: "s6-t9", title: "Categorical encoding", estimatedMinutes: 45, priority: "High" },
          { id: "s6-t10", title: "Feature scaling", estimatedMinutes: 45, priority: "High" },
          { id: "s6-t11", title: "Outlier investigation", estimatedMinutes: 45, priority: "Medium" },
          { id: "s6-t12", title: "Feature engineering", estimatedMinutes: 60, priority: "High" },
          { id: "s6-t13", title: "Feature selection", estimatedMinutes: 45, priority: "Medium" },
          { id: "s6-t14", title: "Data leakage prevention", estimatedMinutes: 60, priority: "High" },
          { id: "s6-t15", title: "Class imbalance", estimatedMinutes: 60, priority: "High" },
          { id: "s6-t16", title: "ML pipelines", estimatedMinutes: 60, priority: "High" }
        ]
      },
      {
        id: "s6-m3",
        title: "Algorithms",
        topics: [
          { id: "s6-t17", title: "Linear regression", estimatedMinutes: 60, priority: "High" },
          { id: "s6-t18", title: "Logistic regression", estimatedMinutes: 60, priority: "High" },
          { id: "s6-t19", title: "K-nearest neighbours", estimatedMinutes: 45, priority: "Medium" },
          { id: "s6-t20", title: "Decision trees", estimatedMinutes: 60, priority: "High" },
          { id: "s6-t21", title: "Random forests", estimatedMinutes: 60, priority: "High" },
          { id: "s6-t22", title: "Naive Bayes", estimatedMinutes: 45, priority: "Medium" },
          { id: "s6-t23", title: "SVM intuition", estimatedMinutes: 60, priority: "Medium" },
          { id: "s6-t24", title: "K-means clustering", estimatedMinutes: 60, priority: "High" }
        ]
      },
      {
        id: "s6-m4",
        title: "Evaluation and Improvement",
        topics: [
          { id: "s6-t25", title: "MAE, MSE, RMSE and R²", estimatedMinutes: 45, priority: "High" },
          { id: "s6-t26", title: "Confusion matrix", estimatedMinutes: 45, priority: "High" },
          { id: "s6-t27", title: "Accuracy", estimatedMinutes: 30, priority: "High" },
          { id: "s6-t28", title: "Precision and recall", estimatedMinutes: 60, priority: "High" },
          { id: "s6-t29", title: "F1-score", estimatedMinutes: 45, priority: "High" },
          { id: "s6-t30", title: "ROC-AUC intuition", estimatedMinutes: 60, priority: "High" },
          { id: "s6-t31", title: "Cross-validation", estimatedMinutes: 45, priority: "High" },
          { id: "s6-t32", title: "Overfitting and underfitting", estimatedMinutes: 45, priority: "High" },
          { id: "s6-t33", title: "Bias-variance trade-off", estimatedMinutes: 45, priority: "High" },
          { id: "s6-t34", title: "Hyperparameter tuning", estimatedMinutes: 60, priority: "High" },
          { id: "s6-t35", title: "Feature importance", estimatedMinutes: 45, priority: "Medium" },
          { id: "s6-t36", title: "Saving and loading models", estimatedMinutes: 45, priority: "High" },
          { id: "s6-t37", title: "Explaining limitations", estimatedMinutes: 30, priority: "Medium" }
        ]
      }
    ]
  },
  {
    id: "stage-7",
    number: 7,
    title: "Placement Preparation and Core CS",
    targetPeriod: "December 2026 onward",
    description: "OOP, DBMS, OS, Computer Networks, Aptitude, and Software Engineering interview mastery.",
    modules: [
      {
        id: "s7-m1",
        title: "OOP",
        topics: [
          { id: "s7-t1", title: "Encapsulation", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t2", title: "Inheritance", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t3", title: "Polymorphism", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t4", title: "Abstraction", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t5", title: "Composition", estimatedMinutes: 45, priority: "Medium" },
          { id: "s7-t6", title: "Interview examples", estimatedMinutes: 60, priority: "High" }
        ]
      },
      {
        id: "s7-m2",
        title: "DBMS",
        topics: [
          { id: "s7-t7", title: "Relational databases", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t8", title: "ER model basics", estimatedMinutes: 45, priority: "Medium" },
          { id: "s7-t9", title: "Keys", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t10", title: "Functional dependencies basics", estimatedMinutes: 45, priority: "Medium" },
          { id: "s7-t11", title: "Normalization", estimatedMinutes: 60, priority: "High" },
          { id: "s7-t12", title: "SQL joins", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t13", title: "Indexing", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t14", title: "Transactions", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t15", title: "ACID properties", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t16", title: "Concurrency basics", estimatedMinutes: 45, priority: "Medium" }
        ]
      },
      {
        id: "s7-m3",
        title: "Operating Systems",
        topics: [
          { id: "s7-t17", title: "Processes and threads", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t18", title: "Process lifecycle", estimatedMinutes: 30, priority: "Medium" },
          { id: "s7-t19", title: "CPU scheduling", estimatedMinutes: 60, priority: "High" },
          { id: "s7-t20", title: "Synchronization", estimatedMinutes: 60, priority: "High" },
          { id: "s7-t21", title: "Deadlocks", estimatedMinutes: 60, priority: "High" },
          { id: "s7-t22", title: "Memory management", estimatedMinutes: 60, priority: "High" },
          { id: "s7-t23", title: "Virtual memory basics", estimatedMinutes: 60, priority: "High" }
        ]
      },
      {
        id: "s7-m4",
        title: "Computer Networks",
        topics: [
          { id: "s7-t24", title: "OSI model", estimatedMinutes: 60, priority: "High" },
          { id: "s7-t25", title: "TCP/IP model", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t26", title: "IP addresses", estimatedMinutes: 30, priority: "High" },
          { id: "s7-t27", title: "DNS", estimatedMinutes: 30, priority: "Medium" },
          { id: "s7-t28", title: "HTTP and HTTPS", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t29", title: "TCP versus UDP", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t30", title: "Client-server architecture", estimatedMinutes: 30, priority: "Medium" },
          { id: "s7-t31", title: "REST API fundamentals", estimatedMinutes: 45, priority: "High" }
        ]
      },
      {
        id: "s7-m5",
        title: "Aptitude",
        topics: [
          { id: "s7-t32", title: "Percentages", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t33", title: "Ratios and proportions", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t34", title: "Averages", estimatedMinutes: 30, priority: "Medium" },
          { id: "s7-t35", title: "Profit and loss", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t36", title: "Time and work", estimatedMinutes: 60, priority: "High" },
          { id: "s7-t37", title: "Speed, time and distance", estimatedMinutes: 60, priority: "High" },
          { id: "s7-t38", title: "Number series", estimatedMinutes: 45, priority: "Medium" },
          { id: "s7-t39", title: "Logical reasoning", estimatedMinutes: 60, priority: "High" },
          { id: "s7-t40", title: "Verbal ability", estimatedMinutes: 45, priority: "Medium" },
          { id: "s7-t41", title: "Timed practice", estimatedMinutes: 60, priority: "High" }
        ]
      },
      {
        id: "s7-m6",
        title: "Interview Readiness",
        topics: [
          { id: "s7-t42", title: "Resume review", estimatedMinutes: 60, priority: "High" },
          { id: "s7-t43", title: "Self-introduction", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t44", title: "Project explanations", estimatedMinutes: 60, priority: "High" },
          { id: "s7-t45", title: "Technical decision explanations", estimatedMinutes: 60, priority: "High" },
          { id: "s7-t46", title: "Behavioral interview preparation", estimatedMinutes: 45, priority: "High" },
          { id: "s7-t47", title: "Mock interviews", estimatedMinutes: 60, priority: "High" },
          { id: "s7-t48", title: "Coding assessments", estimatedMinutes: 60, priority: "High" },
          { id: "s7-t49", title: "Job application tracking", estimatedMinutes: 30, priority: "Medium" }
        ]
      }
    ]
  },
  {
    id: "stage-8",
    number: 8,
    title: "Deep Learning",
    targetPeriod: "February 2027",
    description: "Neural network foundations, PyTorch framework, tensors, backpropagation, and CNNs.",
    modules: [
      {
        id: "s8-m1",
        title: "Deep Learning Foundations & PyTorch",
        topics: [
          { id: "s8-t1", title: "Perceptrons and neural networks", estimatedMinutes: 45, priority: "High" },
          { id: "s8-t2", title: "Weights and biases", estimatedMinutes: 30, priority: "High" },
          { id: "s8-t3", title: "Activation functions", estimatedMinutes: 45, priority: "High" },
          { id: "s8-t4", title: "Loss functions", estimatedMinutes: 45, priority: "High" },
          { id: "s8-t5", title: "Optimizers", estimatedMinutes: 45, priority: "High" },
          { id: "s8-t6", title: "Forward propagation", estimatedMinutes: 45, priority: "High" },
          { id: "s8-t7", title: "Backpropagation intuition", estimatedMinutes: 60, priority: "High" },
          { id: "s8-t8", title: "Gradient descent", estimatedMinutes: 45, priority: "High" },
          { id: "s8-t9", title: "Epochs and batches", estimatedMinutes: 30, priority: "Medium" },
          { id: "s8-t10", title: "Learning rates", estimatedMinutes: 30, priority: "High" },
          { id: "s8-t11", title: "Overfitting", estimatedMinutes: 45, priority: "High" },
          { id: "s8-t12", title: "PyTorch tensors", estimatedMinutes: 60, priority: "High" },
          { id: "s8-t13", title: "Autograd", estimatedMinutes: 45, priority: "High" },
          { id: "s8-t14", title: "Building a basic neural network", estimatedMinutes: 75, priority: "High" },
          { id: "s8-t15", title: "Training and evaluation loops", estimatedMinutes: 75, priority: "High" },
          { id: "s8-t16", title: "Saving and loading models", estimatedMinutes: 30, priority: "Medium" },
          { id: "s8-t17", title: "CNN fundamentals", estimatedMinutes: 60, priority: "High" },
          { id: "s8-t18", title: "Image classification", estimatedMinutes: 75, priority: "High" },
          { id: "s8-t19", title: "Transfer learning intuition", estimatedMinutes: 60, priority: "High" }
        ]
      }
    ]
  },
  {
    id: "stage-9",
    number: 9,
    title: "Model Deployment",
    targetPeriod: "February–March 2027",
    description: "Packaging ML models into high-performance REST APIs with FastAPI, validation, and container basics.",
    modules: [
      {
        id: "s9-m1",
        title: "FastAPI and API Development",
        topics: [
          { id: "s9-t1", title: "HTTP requests and responses", estimatedMinutes: 45, priority: "High" },
          { id: "s9-t2", title: "REST APIs", estimatedMinutes: 45, priority: "High" },
          { id: "s9-t3", title: "JSON", estimatedMinutes: 30, priority: "Medium" },
          { id: "s9-t4", title: "FastAPI fundamentals", estimatedMinutes: 60, priority: "High" },
          { id: "s9-t5", title: "Routes and endpoints", estimatedMinutes: 45, priority: "High" },
          { id: "s9-t6", title: "Request and response models", estimatedMinutes: 45, priority: "High" },
          { id: "s9-t7", title: "Input validation", estimatedMinutes: 45, priority: "High" },
          { id: "s9-t8", title: "Error handling", estimatedMinutes: 45, priority: "High" },
          { id: "s9-t9", title: "Loading an ML model", estimatedMinutes: 60, priority: "High" },
          { id: "s9-t10", title: "Prediction endpoints", estimatedMinutes: 60, priority: "High" },
          { id: "s9-t11", title: "Testing APIs with Postman", estimatedMinutes: 45, priority: "Medium" },
          { id: "s9-t12", title: "Frontend integration", estimatedMinutes: 60, priority: "High" },
          { id: "s9-t13", title: "Environment variables", estimatedMinutes: 30, priority: "High" },
          { id: "s9-t14", title: "Dependency management", estimatedMinutes: 30, priority: "Medium" },
          { id: "s9-t15", title: "Deployment basics", estimatedMinutes: 60, priority: "High" },
          { id: "s9-t16", title: "Logging and debugging", estimatedMinutes: 45, priority: "Medium" },
          { id: "s9-t17", title: "User-data security", estimatedMinutes: 45, priority: "High" }
        ]
      }
    ]
  },
  {
    id: "stage-10",
    number: 10,
    title: "Generative AI and RAG",
    targetPeriod: "March 2027",
    description: "LLMs, vector embeddings, chunking strategies, Retrieval-Augmented Generation, and hallucination guardrails.",
    modules: [
      {
        id: "s10-m1",
        title: "LLM Systems & Retrieval-Augmented Generation",
        topics: [
          { id: "s10-t1", title: "LLM fundamentals", estimatedMinutes: 45, priority: "High" },
          { id: "s10-t2", title: "Tokens and tokenization", estimatedMinutes: 30, priority: "High" },
          { id: "s10-t3", title: "Prompt engineering", estimatedMinutes: 45, priority: "High" },
          { id: "s10-t4", title: "Structured outputs", estimatedMinutes: 45, priority: "High" },
          { id: "s10-t5", title: "Embeddings", estimatedMinutes: 60, priority: "High" },
          { id: "s10-t6", title: "Semantic similarity", estimatedMinutes: 45, priority: "High" },
          { id: "s10-t7", title: "Vector search", estimatedMinutes: 60, priority: "High" },
          { id: "s10-t8", title: "Document loading", estimatedMinutes: 45, priority: "High" },
          { id: "s10-t9", title: "Text chunking", estimatedMinutes: 60, priority: "High" },
          { id: "s10-t10", title: "Retrieval-Augmented Generation", estimatedMinutes: 75, priority: "High" },
          { id: "s10-t11", title: "Retrieval and ranking", estimatedMinutes: 60, priority: "High" },
          { id: "s10-t12", title: "Context construction", estimatedMinutes: 45, priority: "High" },
          { id: "s10-t13", title: "Source citations", estimatedMinutes: 45, priority: "High" },
          { id: "s10-t14", title: "Retrieval evaluation", estimatedMinutes: 60, priority: "High" },
          { id: "s10-t15", title: "Hallucination risks", estimatedMinutes: 45, priority: "High" },
          { id: "s10-t16", title: "Privacy and security", estimatedMinutes: 45, priority: "High" },
          { id: "s10-t17", title: "Prompt injection awareness", estimatedMinutes: 45, priority: "High" },
          { id: "s10-t18", title: "Responsible API usage", estimatedMinutes: 30, priority: "Medium" },
          { id: "s10-t19", title: "Cost and latency awareness", estimatedMinutes: 30, priority: "Medium" }
        ]
      }
    ]
  },
  {
    id: "stage-11",
    number: 11,
    title: "Portfolio and Applications",
    targetPeriod: "April–July 2027",
    description: "Repository polish, architectural documentation, interview readiness, mock trials, and job outreach.",
    modules: [
      {
        id: "s11-m1",
        title: "Portfolio Polish & Placement Outreach",
        topics: [
          { id: "s11-t1", title: "Polish GitHub repositories", estimatedMinutes: 60, priority: "High" },
          { id: "s11-t2", title: "Complete README files", estimatedMinutes: 60, priority: "High" },
          { id: "s11-t3", title: "Add architecture diagrams", estimatedMinutes: 60, priority: "High" },
          { id: "s11-t4", title: "Add demo screenshots", estimatedMinutes: 45, priority: "Medium" },
          { id: "s11-t5", title: "Document datasets and sources", estimatedMinutes: 45, priority: "High" },
          { id: "s11-t6", title: "Document metrics and limitations", estimatedMinutes: 45, priority: "High" },
          { id: "s11-t7", title: "Prepare project explanations", estimatedMinutes: 75, priority: "High" },
          { id: "s11-t8", title: "Practise Python and SQL interviews", estimatedMinutes: 60, priority: "High" },
          { id: "s11-t9", title: "Revise DSA and core CS", estimatedMinutes: 60, priority: "High" },
          { id: "s11-t10", title: "Practise aptitude and communication", estimatedMinutes: 45, priority: "High" },
          { id: "s11-t11", title: "Review resume", estimatedMinutes: 60, priority: "High" },
          { id: "s11-t12", title: "Track job and internship applications", estimatedMinutes: 30, priority: "High" },
          { id: "s11-t13", title: "Practise mock interviews", estimatedMinutes: 75, priority: "High" },
          { id: "s11-t14", title: "Improve projects based on feedback", estimatedMinutes: 60, priority: "High" }
        ]
      }
    ]
  }
];

// Helper to get total topic count
export const TOTAL_ROADMAP_TOPICS = ROADMAP_STAGES.reduce((acc, stage) => {
  return acc + stage.modules.reduce((mAcc, m) => mAcc + m.topics.length, 0);
}, 0);

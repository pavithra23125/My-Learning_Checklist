import React, { useState } from 'react';
import {
  Briefcase,
  Github,
  Play,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import { Badge } from '../components/Badge';
import { INITIAL_PORTFOLIO_CRITERIA } from '../data/initialState';

export function PortfolioTracker({ store }) {
  const { projects, portfolioChecks, togglePortfolioCriteria } = store;

  const [expandedProjects, setExpandedProjects] = useState({
    'proj-1': true
  });

  const toggleExpand = (projId) => {
    setExpandedProjects(prev => ({ ...prev, [projId]: !prev[projId] }));
  };

  // Compute portfolio score per project
  const getProjectPortfolioStats = (projId) => {
    const checks = portfolioChecks[projId] || {};
    const completedCount = INITIAL_PORTFOLIO_CRITERIA.filter(c => !!checks[c.key]).length;
    const total = INITIAL_PORTFOLIO_CRITERIA.length;
    const scorePct = Math.round((completedCount / total) * 100);
    return { completedCount, total, scorePct };
  };

  // Overall portfolio score
  let totalCriteriaAll = 0;
  let completedCriteriaAll = 0;
  projects.forEach(p => {
    const stats = getProjectPortfolioStats(p.id);
    totalCriteriaAll += stats.total;
    completedCriteriaAll += stats.completedCount;
  });
  const overallPortfolioScore = totalCriteriaAll > 0
    ? Math.round((completedCriteriaAll / totalCriteriaAll) * 100)
    : 0;

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-charcoal-900 dark:text-warm-50 tracking-tight">
          Portfolio & Presentation Quality Tracker
        </h1>
        <p className="text-xs md:text-sm text-charcoal-500 dark:text-charcoal-400 mt-0.5">
          Audit GitHub repository presentation, architectural documentation, and interview defense readiness.
        </p>
      </div>

      {/* Overall Presentation Readiness Score */}
      <div className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
              Overall Portfolio Readiness Score
            </span>
            <Badge variant={overallPortfolioScore >= 80 ? 'success' : overallPortfolioScore >= 50 ? 'warning' : 'default'} size="xs">
              {overallPortfolioScore >= 80 ? 'Interview Ready' : overallPortfolioScore >= 50 ? 'In Development' : 'Needs Polish'}
            </Badge>
          </div>
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-extrabold text-charcoal-900 dark:text-warm-50">
              {overallPortfolioScore}%
            </span>
            <span className="text-xs text-charcoal-500">
              ({completedCriteriaAll} of {totalCriteriaAll} audit checklist points fulfilled)
            </span>
          </div>
          <p className="text-xs text-charcoal-500 dark:text-charcoal-400 pt-1">
            Projects are evaluated against 9 strict engineering presentation criteria before showcasing to recruiters.
          </p>
        </div>

        <div className="w-full md:w-64">
          <ProgressBar
            value={overallPortfolioScore}
            max={100}
            size="lg"
            showPercentage={false}
          />
        </div>
      </div>

      {/* 6 Projects Portfolio Cards */}
      <div className="space-y-4">
        {projects.map((proj, idx) => {
          const { completedCount, total, scorePct } = getProjectPortfolioStats(proj.id);
          const isExpanded = !!expandedProjects[proj.id];
          const checks = portfolioChecks[proj.id] || {};

          return (
            <div
              key={proj.id}
              className="bg-white dark:bg-charcoal-900 border border-warm-200 dark:border-charcoal-800 rounded-2xl overflow-hidden shadow-sm transition-all"
            >
              {/* Card Header Accordion */}
              <div
                onClick={() => toggleExpand(proj.id)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-warm-50/50 dark:hover:bg-charcoal-850/50 transition-colors"
              >
                <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-forest-50 dark:bg-forest-950 text-forest-700 dark:text-forest-300 flex items-center justify-center font-bold text-xs shrink-0 border border-forest-200/50">
                    P{idx + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm md:text-base font-extrabold text-charcoal-900 dark:text-warm-50 truncate">
                        {proj.title}
                      </h3>
                      <Badge variant={proj.status} size="xs">
                        {proj.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-charcoal-500 truncate mt-0.5">
                      Target: {proj.targetPeriod} • {proj.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 shrink-0">
                  <div className="w-32 sm:w-40">
                    <ProgressBar
                      value={scorePct}
                      max={100}
                      size="sm"
                      label="Quality Audit"
                      sublabel={`${completedCount}/${total}`}
                    />
                  </div>
                  <div className="p-1 rounded text-charcoal-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Checklist & Metadata */}
              {isExpanded && (
                <div className="p-5 border-t border-warm-200 dark:border-charcoal-800 bg-warm-50/30 dark:bg-charcoal-950/20 space-y-5">
                  {/* Repo Links & Screenshot status */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-white dark:bg-charcoal-850 border border-warm-200 dark:border-charcoal-700">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      {proj.githubUrl ? (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 text-forest-700 dark:text-forest-400 font-bold hover:underline"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>{proj.githubUrl}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-charcoal-400 italic">No GitHub URL added yet</span>
                      )}

                      {proj.demoUrl && (
                        <a
                          href={proj.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 text-forest-700 dark:text-forest-400 font-bold hover:underline"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Demo Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {proj.screenshotRef && (
                      <span className="text-[11px] font-mono text-charcoal-500">
                        Asset: {proj.screenshotRef}
                      </span>
                    )}
                  </div>

                  {/* 9-Point Audit Checklist */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                      9-Point Presentation & Interview Audit Checklist
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {INITIAL_PORTFOLIO_CRITERIA.map(criterion => {
                        const isChecked = !!checks[criterion.key];
                        return (
                          <div
                            key={criterion.key}
                            onClick={() => togglePortfolioCriteria(proj.id, criterion.key)}
                            className={`p-3 rounded-xl border cursor-pointer flex items-start space-x-2.5 transition-all ${
                              isChecked
                                ? 'bg-forest-50/60 dark:bg-forest-950/40 border-forest-200 dark:border-forest-800 text-forest-900 dark:text-forest-200'
                                : 'bg-white dark:bg-charcoal-850 border-warm-200 dark:border-charcoal-700 text-charcoal-700 dark:text-warm-200 hover:border-warm-300'
                            }`}
                          >
                            <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                              isChecked ? 'bg-forest-700 border-forest-700 text-white' : 'border-charcoal-400'
                            }`}>
                              {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>
                            <span className="text-xs font-medium leading-snug">
                              {criterion.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

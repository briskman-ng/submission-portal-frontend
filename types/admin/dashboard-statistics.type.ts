export interface Stats {
  totalSubmissions: number;
  newSubmissions: number;
  todaySubmissions: number;
  thisWeekSubmissions: number;
  pendingSubmissions: number;
  inReviewSubmissions: number;
  forwardedSubmissions: number;
  processedSubmissions: number;
  completedSubmissions: number;
  resolvedSubmissions: number;
  rejectedSubmissions: number;
  priorityBreakdown: {
    low: number;
    medium: number;
    high: number;
    urgent: number;
  };
  urgentSubmissions: number;
  highPrioritySubmissions: number;
  priorityPercentages: {
    low: number;
    medium: number;
    high: number;
    urgent: number;
  };
}

export interface DashboardStatistics {
  stats: Stats;
}

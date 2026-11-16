export type SubjectSnapshot = {
  name: string;
  code: string;
  color: "cyan" | "coral" | "lime";
  grade: string;
  progress: number;
  nextTopic: string;
};

export type StudyTask = {
  id: string;
  title: string;
  subject: string;
  time: string;
  duration: string;
  priority: "Focused" | "Due soon" | "Review";
};

export type LearningActivity = {
  id: string;
  title: string;
  detail: string;
  date: string;
  score: string;
  subject: string;
  color: "cyan" | "coral" | "lime";
};

export type DashboardSnapshot = {
  studentName: string;
  examSession: string;
  overallProgress: number;
  weeklyStudyHours: number;
  studyStreak: number;
  subjects: SubjectSnapshot[];
  tasks: StudyTask[];
  activities: LearningActivity[];
};

const MOCK_DASHBOARD: DashboardSnapshot = {
  studentName: "Amelia",
  examSession: "May / June 2026",
  overallProgress: 72,
  weeklyStudyHours: 12.5,
  studyStreak: 8,
  subjects: [
    { name: "Mathematics", code: "0580", color: "cyan", grade: "A*", progress: 84, nextTopic: "Vectors & transformations" },
    { name: "Biology", code: "0610", color: "lime", grade: "A", progress: 68, nextTopic: "Inheritance & variation" },
    { name: "Chemistry", code: "0620", color: "coral", grade: "B+", progress: 56, nextTopic: "Organic chemistry" },
  ],
  tasks: [
    { id: "task-1", title: "Past paper · Paper 4 practice", subject: "Mathematics", time: "09:30", duration: "45 min", priority: "Due soon" },
    { id: "task-2", title: "Review cell division notes", subject: "Biology", time: "11:00", duration: "25 min", priority: "Focused" },
    { id: "task-3", title: "Organic reactions · flashcards", subject: "Chemistry", time: "14:15", duration: "20 min", priority: "Review" },
  ],
  activities: [
    { id: "activity-1", title: "Quadratic equations", detail: "Practice set · 18 questions", date: "Today, 8:12 am", score: "92%", subject: "Mathematics", color: "cyan" },
    { id: "activity-2", title: "Transport in plants", detail: "Topic review · 12 questions", date: "Yesterday", score: "84%", subject: "Biology", color: "lime" },
    { id: "activity-3", title: "Chemical bonding", detail: "Checkpoint · 10 questions", date: "Yesterday", score: "76%", subject: "Chemistry", color: "coral" },
  ],
};

/**
 * UI-facing data boundary. Replace this mock implementation with an Express API
 * request when the backend is available; keep request details out of components.
 */
export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  return MOCK_DASHBOARD;
}
export type Category =
  | 'HYROX 101'
  | 'Training'
  | 'Race Strategy'
  | 'Nutrition'
  | 'Recovery'
  | 'Gear'
  | 'Running'
  | 'Strength'
  | 'Workouts'
  | 'Race Guides'
  | 'Athlete Stories';

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface ArticleSource {
  title: string;
  url?: string;
  note?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: Category;
  tags: string[];
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  date: string;
  readingTime: string;
  heroImage: string;
  isFeatured?: boolean;
  isEditorsPick?: boolean;
  isTrending?: boolean;
  isBeginnerFriendly?: boolean;
  content: string; // Markdown or structured HTML paragraphs
  tableOfContents: { id: string; text: string }[];
  keyTakeaways: string[];
  faq: ArticleFAQ[];
  relatedSlugs: string[];
  sources?: ArticleSource[];
}

export interface TrainingLevelInput {
  age: number;
  gender: 'men' | 'women';
  division: 'open' | 'pro' | 'doubles';
  fiveKmTime: string; // e.g. "sub-22", "22-26", "26-30", "30+"
  strengthLevel: 'novice' | 'intermediate' | 'advanced';
  weeklyHours: number;
  raceExperience: 'first-timer' | '1-2-races' | 'veteran';
}

export interface TrainingLevelResult {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedFinishTime: string;
  primaryFocus: string;
  recommendedWeeklyVolume: string;
  stationPriorities: string[];
}

export interface WeekPlannerInput {
  daysPerWeek: number; // 3, 4, 5, 6
  runningExperience: 'beginner' | 'intermediate' | 'experienced';
  strengthExperience: 'beginner' | 'intermediate' | 'advanced';
  weeksUntilRace: number;
}

export interface DailyWorkout {
  day: string;
  title: string;
  focus: string;
  duration: string;
  details: string[];
  intensity: 'Low' | 'Moderate' | 'High' | 'Rest';
}

export interface RacePaceTarget {
  targetHours: number;
  targetMinutes: number;
}

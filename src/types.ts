export interface Meditation {
  id: string;
  day: number;
  title: string;
  duration: string;
  category: string;
  coverUrl: string;
  audioUrl: string;
  completed?: boolean;
}

export type AppScreen = 'home' | 'player' | 'admin-login' | 'admin-portal';

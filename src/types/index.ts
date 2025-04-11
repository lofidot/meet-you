export interface Sound {
  id: string;
  name: string;
  imageUrl: string;
  soundUrl: string;
  category: string;
}

export interface TimerConfig {
  focusTime: number;
  breakTime: number;
  autoStart: boolean;
  hideSeconds: boolean;
  soundEffects: boolean;
  browserNotifications: boolean;
}

export interface TimerMode {
  type: 'clock' | 'pomodoro' | 'countup' | 'goal';
  label: string;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  isCurrentTask: boolean;
}

export interface SavedMix {
  id: string;
  name: string;
  sounds: {
    soundId: string;
    volume: number;
  }[];
}

export interface UIState {
  showClock: boolean;
  showTimer: boolean;
  showPlayMixSwitcher: boolean;
  showTodoBar: boolean;
  showSoundList: boolean;
  showControls: boolean;
  autoHideControls: boolean;
}

export interface BackgroundImage {
  id: string;
  url: string;
  category: string;
  name: string;
}

export interface Note {
  id: string;
  content: string;
  lastModified: Date;
} 
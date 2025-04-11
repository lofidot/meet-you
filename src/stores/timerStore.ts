import { create } from 'zustand';
import { TimerConfig, TimerMode } from '@/types';
import { DEFAULT_FOCUS_TIME, DEFAULT_BREAK_TIME, NOTIFICATION_MESSAGES } from '@/constants';

interface TimerState {
  mode: TimerMode['type'];
  isRunning: boolean;
  timeLeft: number;
  config: TimerConfig;
  isBreak: boolean;
  setMode: (mode: TimerMode['type']) => void;
  setIsRunning: (isRunning: boolean) => void;
  setTimeLeft: (timeLeft: number) => void;
  updateConfig: (config: Partial<TimerConfig>) => void;
  resetTimer: () => void;
  addTime: (seconds: number) => void;
  toggleBreak: () => void;
}

const useTimerStore = create<TimerState>((set) => ({
  mode: 'clock',
  isRunning: false,
  timeLeft: DEFAULT_FOCUS_TIME,
  isBreak: false,
  config: {
    focusTime: DEFAULT_FOCUS_TIME,
    breakTime: DEFAULT_BREAK_TIME,
    autoStart: false,
    hideSeconds: false,
    soundEffects: true,
    browserNotifications: true,
  },
  setMode: (mode) => set({ mode }),
  setIsRunning: (isRunning) => set({ isRunning }),
  setTimeLeft: (timeLeft) => set({ timeLeft }),
  updateConfig: (config) => set((state) => ({
    config: { ...state.config, ...config },
  })),
  resetTimer: () => set((state) => ({
    timeLeft: state.isBreak ? state.config.breakTime : state.config.focusTime,
    isRunning: state.config.autoStart,
  })),
  addTime: (seconds) => set((state) => ({
    timeLeft: state.timeLeft + seconds,
    config: {
      ...state.config,
      focusTime: state.config.focusTime + (state.isBreak ? 0 : seconds),
    },
  })),
  toggleBreak: () => set((state) => {
    const isBreak = !state.isBreak;
    if (state.config.browserNotifications) {
      new Notification(isBreak ? NOTIFICATION_MESSAGES.breakStart : NOTIFICATION_MESSAGES.focusStart);
    }
    return {
      isBreak,
      timeLeft: isBreak ? state.config.breakTime : state.config.focusTime,
      isRunning: state.config.autoStart,
    };
  }),
}));

export default useTimerStore; 
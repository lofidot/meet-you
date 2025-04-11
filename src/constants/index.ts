import { Sound, TimerMode } from '@/types';

export const DEFAULT_FOCUS_TIME = 25 * 60; // 25 minutes in seconds
export const DEFAULT_BREAK_TIME = 10 * 60; // 10 minutes in seconds

export const TIMER_MODES: TimerMode[] = [
  { type: 'clock', label: 'Clock' },
  { type: 'pomodoro', label: 'Pomodoro' },
  { type: 'countup', label: 'Count Up' },
  { type: 'goal', label: 'Goal Timer' },
];

export const FALLBACK_SOUNDS: Sound[] = [
  {
    id: 'heavy-rain',
    name: 'Heavy Rain',
    imageUrl: '/images/rain.jpg',
    soundUrl: 'https://cdn.jsdelivr.net/gh/lofidot/moodist@main/public/sounds/rain/heavy-rain.mp3',
    category: 'rain',
  },
  {
    id: 'light-rain',
    name: 'Light Rain',
    imageUrl: '/images/light-rain.jpg',
    soundUrl: 'https://cdn.jsdelivr.net/gh/lofidot/moodist@main/public/sounds/rain/light-rain.mp3',
    category: 'rain',
  },
  {
    id: 'thunder',
    name: 'Thunder',
    imageUrl: '/images/thunder.jpg',
    soundUrl: 'https://cdn.jsdelivr.net/gh/lofidot/moodist@main/public/sounds/rain/thunder.mp3',
    category: 'rain',
  },
  {
    id: 'typewriter',
    name: 'Typewriter',
    imageUrl: '/images/typewriter.jpg',
    soundUrl: 'https://cdn.jsdelivr.net/gh/lofidot/moodist@main/public/sounds/things/typewriter.mp3',
    category: 'things',
  },
  {
    id: 'clock',
    name: 'Clock',
    imageUrl: '/images/clock.jpg',
    soundUrl: 'https://cdn.jsdelivr.net/gh/lofidot/moodist@main/public/sounds/things/clock.mp3',
    category: 'things',
  },
];

export const DEFAULT_UI_STATE = {
  showClock: true,
  showTimer: true,
  showPlayMixSwitcher: true,
  showTodoBar: true,
  showSoundList: true,
  showControls: true,
  autoHideControls: false,
};

export const NOTIFICATION_MESSAGES = {
  focusStart: 'Focus session started',
  focusEnd: 'Focus session ended',
  breakStart: 'Break time started',
  breakEnd: 'Break time ended',
}; 
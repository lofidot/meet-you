import { useEffect, useCallback } from 'react';
import useTimerStore from '@/stores/timerStore';
import { NOTIFICATION_MESSAGES } from '@/constants';

const useTimer = () => {
  const {
    isRunning,
    timeLeft,
    setTimeLeft,
    config,
    isBreak,
    toggleBreak,
    mode,
  } = useTimerStore();

  const tick = useCallback(() => {
    if (mode === 'countup') {
      setTimeLeft((prev) => prev + 1);
      return;
    }

    setTimeLeft((prev) => {
      if (prev <= 1) {
        if (mode === 'pomodoro') {
          if (config.browserNotifications) {
            new Notification(
              isBreak
                ? NOTIFICATION_MESSAGES.breakEnd
                : NOTIFICATION_MESSAGES.focusEnd
            );
          }
          toggleBreak();
        }
        return 0;
      }
      return prev - 1;
    });
  }, [mode, setTimeLeft, isBreak, toggleBreak, config.browserNotifications]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && timeLeft >= 0) {
      intervalId = setInterval(tick, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, timeLeft, tick]);

  const formatTime = (seconds: number): string => {
    if (mode === 'clock') {
      const now = new Date();
      return now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        ...(config.hideSeconds ? {} : { second: '2-digit' }),
      });
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (config.hideSeconds) {
      return hours > 0
        ? `${hours}:${minutes.toString().padStart(2, '0')}`
        : `${minutes}:00`;
    }

    return hours > 0
      ? `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds
          .toString()
          .padStart(2, '0')}`
      : `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return {
    formattedTime: formatTime(timeLeft),
  };
};

export default useTimer; 
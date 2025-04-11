import React, { useState } from 'react';
import { EllipsisHorizontalIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline';
import useTimerStore from '@/stores/timerStore';
import useTimer from '@/hooks/useTimer';
import { TIMER_MODES } from '@/constants';
import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';

const Timer: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { formattedTime } = useTimer();
  const {
    mode,
    isRunning,
    config,
    setMode,
    setIsRunning,
    resetTimer,
    addTime,
    updateConfig,
  } = useTimerStore();

  const handleModeChange = (newMode: typeof mode) => {
    setMode(newMode);
    resetTimer();
  };

  return (
    <div className="relative flex flex-col items-center space-y-4">
      <div className="flex items-center justify-between w-full">
        <div className="text-sm font-medium">
          {mode === 'pomodoro' ? (config.isBreak ? 'BREAK' : 'FOCUS') : mode.toUpperCase()}
        </div>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-1 rounded-full hover:bg-gray-800"
        >
          <EllipsisHorizontalIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="text-6xl font-bold tracking-wider">{formattedTime}</div>

      <button
        onClick={() => setIsRunning(!isRunning)}
        className="p-3 rounded-full bg-white/10 hover:bg-white/20"
      >
        {isRunning ? (
          <PauseIcon className="w-6 h-6" />
        ) : (
          <PlayIcon className="w-6 h-6" />
        )}
      </button>

      <Dialog.Root open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-lg p-6 w-96 space-y-6">
            <Dialog.Title className="text-lg font-semibold">Timer Settings</Dialog.Title>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Timer Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  {TIMER_MODES.map((timerMode) => (
                    <button
                      key={timerMode.type}
                      onClick={() => handleModeChange(timerMode.type)}
                      className={`px-4 py-2 rounded ${
                        mode === timerMode.type
                          ? 'bg-white/20'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      {timerMode.label}
                    </button>
                  ))}
                </div>
              </div>

              {mode === 'pomodoro' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Focus Time (minutes)</label>
                    <input
                      type="number"
                      value={config.focusTime / 60}
                      onChange={(e) =>
                        updateConfig({ focusTime: parseInt(e.target.value) * 60 })
                      }
                      className="w-full px-3 py-2 bg-white/5 rounded"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Break Time (minutes)</label>
                    <input
                      type="number"
                      value={config.breakTime / 60}
                      onChange={(e) =>
                        updateConfig({ breakTime: parseInt(e.target.value) * 60 })
                      }
                      className="w-full px-3 py-2 bg-white/5 rounded"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Auto-start Timers</label>
                  <Switch.Root
                    checked={config.autoStart}
                    onCheckedChange={(checked) => updateConfig({ autoStart: checked })}
                    className="w-11 h-6 bg-white/10 rounded-full relative data-[state=checked]:bg-blue-600"
                  >
                    <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-1 data-[state=checked]:translate-x-6" />
                  </Switch.Root>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Hide Seconds</label>
                  <Switch.Root
                    checked={config.hideSeconds}
                    onCheckedChange={(checked) => updateConfig({ hideSeconds: checked })}
                    className="w-11 h-6 bg-white/10 rounded-full relative data-[state=checked]:bg-blue-600"
                  >
                    <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-1 data-[state=checked]:translate-x-6" />
                  </Switch.Root>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Timer Sound Effects</label>
                  <Switch.Root
                    checked={config.soundEffects}
                    onCheckedChange={(checked) => updateConfig({ soundEffects: checked })}
                    className="w-11 h-6 bg-white/10 rounded-full relative data-[state=checked]:bg-blue-600"
                  >
                    <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-1 data-[state=checked]:translate-x-6" />
                  </Switch.Root>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Browser Notifications</label>
                  <Switch.Root
                    checked={config.browserNotifications}
                    onCheckedChange={(checked) =>
                      updateConfig({ browserNotifications: checked })
                    }
                    className="w-11 h-6 bg-white/10 rounded-full relative data-[state=checked]:bg-blue-600"
                  >
                    <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-1 data-[state=checked]:translate-x-6" />
                  </Switch.Root>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    resetTimer();
                    setIsSettingsOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-white/10 rounded hover:bg-white/20"
                >
                  Reset Timer
                </button>
                <button
                  onClick={() => {
                    addTime(600); // Add 10 minutes
                    setIsSettingsOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-white/10 rounded hover:bg-white/20"
                >
                  Add 10 Minutes
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Timer; 
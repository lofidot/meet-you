'use client';

import React, { useEffect } from 'react';
import Timer from '@/components/Timer';
import TodoList from '@/components/TodoList';
import SoundPlayer from '@/components/SoundPlayer';
import useUIStore from '@/stores/uiStore';

const Page = () => {
  const {
    showClock,
    showTimer,
    showPlayMixSwitcher,
    showTodoBar,
    showSoundList,
    showControls,
    autoHideControls,
  } = useUIStore();

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Timer Section */}
        {(showClock || showTimer) && (
          <div className="max-w-md mx-auto">
            <Timer />
          </div>
        )}

        {/* Todo Section */}
        {showTodoBar && (
          <div className="max-w-md mx-auto">
            <TodoList />
          </div>
        )}

        {/* Sound Player Section */}
        {(showPlayMixSwitcher || showSoundList) && (
          <div className="max-w-4xl mx-auto">
            <SoundPlayer />
          </div>
        )}
      </div>
    </main>
  );
};

export default Page; 
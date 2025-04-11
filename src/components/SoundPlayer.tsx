import React from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/outline';
import * as Slider from '@radix-ui/react-slider';
import * as Dialog from '@radix-ui/react-dialog';
import useSoundStore from '@/stores/soundStore';
import { Sound } from '@/types';

const SoundCard: React.FC<{
  sound: Sound;
  isPlaying: boolean;
  volume?: number;
  onVolumeChange?: (volume: number) => void;
  onClick: () => void;
}> = ({ sound, isPlaying, volume, onVolumeChange, onClick }) => (
  <div className="flex flex-col items-center space-y-2">
    <button
      onClick={onClick}
      className="relative w-24 h-24 rounded-full overflow-hidden group"
    >
      <img
        src={sound.imageUrl}
        alt={sound.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        {isPlaying ? (
          <PauseIcon className="w-8 h-8 text-white" />
        ) : (
          <PlayIcon className="w-8 h-8 text-white" />
        )}
      </div>
    </button>
    <span className="text-sm font-medium">{sound.name}</span>
    {volume !== undefined && onVolumeChange && (
      <Slider.Root
        className="relative flex items-center w-24 h-5"
        value={[volume]}
        onValueChange={([value]) => onVolumeChange(value)}
        max={1}
        step={0.01}
      >
        <Slider.Track className="bg-white/20 relative grow h-1 rounded-full">
          <Slider.Range className="absolute h-full bg-white rounded-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-3 h-3 bg-white rounded-full hover:bg-white/90 focus:outline-none" />
      </Slider.Root>
    )}
  </div>
);

const SoundPlayer: React.FC = () => {
  const {
    sounds,
    activeSounds,
    isMixMode,
    isPlaying,
    savedMixes,
    setMixMode,
    toggleSound,
    updateVolume,
    stopAllSounds,
    saveMix,
    loadMix,
    deleteMix,
  } = useSoundStore();

  const [isMixDialogOpen, setIsMixDialogOpen] = React.useState(false);
  const [newMixName, setNewMixName] = React.useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setMixMode(!isMixMode)}
          className={`px-4 py-2 rounded ${
            isMixMode ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          {isMixMode ? 'Single Sound' : 'Mix Sounds'}
        </button>
        {isPlaying && (
          <button
            onClick={stopAllSounds}
            className="px-4 py-2 bg-white/5 rounded hover:bg-white/10"
          >
            Stop All
          </button>
        )}
      </div>

      {isMixMode ? (
        <Dialog.Root open={isMixDialogOpen} onOpenChange={setIsMixDialogOpen}>
          <Dialog.Trigger asChild>
            <button className="px-4 py-2 bg-white/5 rounded hover:bg-white/10">
              Open Mix Editor
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-lg p-6 w-[32rem] max-h-[80vh] overflow-y-auto space-y-6">
              <Dialog.Title className="text-lg font-semibold">Sound Mixer</Dialog.Title>
              
              <div className="grid grid-cols-3 gap-4">
                {sounds.map((sound) => (
                  <SoundCard
                    key={sound.id}
                    sound={sound}
                    isPlaying={activeSounds.has(sound.id)}
                    volume={activeSounds.get(sound.id)?.volume || 0}
                    onVolumeChange={(volume) => updateVolume(sound.id, volume)}
                    onClick={() => toggleSound(sound)}
                  />
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMixName}
                    onChange={(e) => setNewMixName(e.target.value)}
                    placeholder="Mix name"
                    className="flex-1 px-3 py-2 bg-white/5 rounded"
                  />
                  <button
                    onClick={() => {
                      if (newMixName) {
                        saveMix(newMixName);
                        setNewMixName('');
                      }
                    }}
                    className="px-4 py-2 bg-white/10 rounded hover:bg-white/20"
                  >
                    Save Mix
                  </button>
                </div>

                {savedMixes.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Saved Mixes</h3>
                    <div className="space-y-2">
                      {savedMixes.map((mix) => (
                        <div
                          key={mix.id}
                          className="flex items-center justify-between p-2 bg-white/5 rounded"
                        >
                          <span>{mix.name}</span>
                          <div className="space-x-2">
                            <button
                              onClick={() => loadMix(mix)}
                              className="px-3 py-1 bg-white/10 rounded hover:bg-white/20"
                            >
                              Load
                            </button>
                            <button
                              onClick={() => deleteMix(mix.id)}
                              className="px-3 py-1 bg-red-500/20 rounded hover:bg-red-500/30"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-4">
          {sounds.map((sound) => (
            <SoundCard
              key={sound.id}
              sound={sound}
              isPlaying={activeSounds.has(sound.id)}
              onClick={() => toggleSound(sound)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SoundPlayer; 
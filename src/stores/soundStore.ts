import { create } from 'zustand';
import { Sound, SavedMix } from '@/types';
import { FALLBACK_SOUNDS } from '@/constants';
import { Howl } from 'howler';

interface SoundState {
  sounds: Sound[];
  activeSounds: Map<string, { howl: Howl; volume: number }>;
  savedMixes: SavedMix[];
  isMixMode: boolean;
  isPlaying: boolean;
  setMixMode: (isMixMode: boolean) => void;
  toggleSound: (sound: Sound, volume?: number) => void;
  updateVolume: (soundId: string, volume: number) => void;
  stopAllSounds: () => void;
  saveMix: (name: string) => void;
  loadMix: (mix: SavedMix) => void;
  deleteMix: (mixId: string) => void;
}

const useStore = create<SoundState>((set, get) => ({
  sounds: FALLBACK_SOUNDS,
  activeSounds: new Map(),
  savedMixes: [],
  isMixMode: false,
  isPlaying: false,

  setMixMode: (isMixMode) => set({ isMixMode }),

  toggleSound: (sound, volume = 1) => {
    const { activeSounds } = get();
    const activeSound = activeSounds.get(sound.id);

    if (activeSound) {
      activeSound.howl.stop();
      activeSounds.delete(sound.id);
    } else {
      const howl = new Howl({
        src: [sound.soundUrl],
        loop: true,
        volume,
      });
      howl.play();
      activeSounds.set(sound.id, { howl, volume });
    }

    set({
      activeSounds: new Map(activeSounds),
      isPlaying: activeSounds.size > 0,
    });
  },

  updateVolume: (soundId, volume) => {
    const { activeSounds } = get();
    const activeSound = activeSounds.get(soundId);
    if (activeSound) {
      activeSound.howl.volume(volume);
      activeSounds.set(soundId, { ...activeSound, volume });
      set({ activeSounds: new Map(activeSounds) });
    }
  },

  stopAllSounds: () => {
    const { activeSounds } = get();
    activeSounds.forEach(({ howl }) => howl.stop());
    set({ activeSounds: new Map(), isPlaying: false });
  },

  saveMix: (name) => {
    const { activeSounds, savedMixes } = get();
    const mix: SavedMix = {
      id: Date.now().toString(),
      name,
      sounds: Array.from(activeSounds.entries()).map(([soundId, { volume }]) => ({
        soundId,
        volume,
      })),
    };
    set({ savedMixes: [...savedMixes, mix] });
  },

  loadMix: (mix) => {
    const { stopAllSounds, toggleSound } = get();
    stopAllSounds();
    mix.sounds.forEach(({ soundId, volume }) => {
      const sound = FALLBACK_SOUNDS.find((s) => s.id === soundId);
      if (sound) {
        toggleSound(sound, volume);
      }
    });
  },

  deleteMix: (mixId) =>
    set((state) => ({
      savedMixes: state.savedMixes.filter((mix) => mix.id !== mixId),
    })),
}));

export default useStore; 
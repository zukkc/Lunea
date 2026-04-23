import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';
import { SettingsState } from '@/src/core/types/settings.types';

const mmkv = createMMKV({ id: 'settings' });

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      photoQuality: 'speed',
      changePhotoQuality: qualityValue =>
        set(() => ({ photoQuality: qualityValue })),
      cameraPosition: 'front',
      changeCameraPosition: position =>
        set(state => ({
          cameraPosition: position
            ? position
            : state.cameraPosition === 'back'
            ? 'front'
            : 'back',
        })),
      deviceIdByPosition: { front: null, back: null, external: null },
      setDeviceIdForPosition: (position, id) =>
        set(() => ({
          deviceIdByPosition: { ...get().deviceIdByPosition, [position]: id },
        })),
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => ({
        getItem: (key: string): string | null => mmkv.getString(key) ?? null,
        setItem: (key: string, value: string): void => mmkv.set(key, value),
        removeItem: (key: string): boolean => mmkv.remove(key),
      })),
      partialize: state => ({
        photoQuality: state.photoQuality,
        cameraPosition: state.cameraPosition,
        deviceIdByPosition: state.deviceIdByPosition,
      }),
    },
  ),
);

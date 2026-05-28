import { create } from 'zustand';
import type { CameraState } from '@/shared/camera/types';

export const useCameraStore = create<CameraState>((set, get) => ({
  isActive: true,
  setActive: v => set({ isActive: v }),
}));

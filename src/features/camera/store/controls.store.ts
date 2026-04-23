import { create } from 'zustand';

import { SharedValue } from 'react-native-reanimated';
import Haptics from '@mhpdev/react-native-haptics';
import { animateUI } from '@/src/core/animation/worklets';

type ControlsState = {
  height: number | undefined;
  controlsX?: SharedValue<number>;
  exposureOpacity?: SharedValue<number>;
  status: 'shown' | 'hidden';
  width: number;
  setHeight: (h: number) => void;
  setupControlsX: (sv: SharedValue<number>) => void;
  setupExposureOpacity: (sv: SharedValue<number>) => void;
  hideControls: () => void;
  showControls: () => void;
  hideExposure: () => void;
  showExposure: () => void;
};

export const useControlsStore = create<ControlsState>((set, get) => ({
  height: undefined,
  controlsX: undefined,
  exposureOpacity: undefined,
  width: 70,
  status: 'hidden',
  setHeight: h => set({ height: h }),
  setupControlsX: sv => set({ controlsX: sv }),
  setupExposureOpacity: sv => set({ exposureOpacity: sv }),
  hideControls: () => {
    const { controlsX, status, width } = get();
    if (!controlsX || status === 'hidden') return;
    Haptics.impact('soft');
    animateUI(
      'schedule',
      controlsX,
      +width,
      { duration: 100, increment: true },
      () => set({ status: 'hidden' }),
    );
  },

  showControls: () => {
    const { controlsX, status, width } = get();
    if (!controlsX || status === 'shown') return;
    Haptics.impact('soft');
    animateUI(
      'schedule',
      controlsX,
      -width,
      { duration: 100, increment: true },
      () => set({ status: 'shown' }),
    );
  },
  showExposure: () => {
    const { exposureOpacity } = get();
    if (!exposureOpacity) return;
    animateUI('schedule', exposureOpacity, 1, { duration: 100 });
  },
  hideExposure: () => {
    const { exposureOpacity } = get();
    if (!exposureOpacity) return;
    animateUI('schedule', exposureOpacity, 0.2, { duration: 100 });
  },
}));

export const useGetControlsHeight = () => useControlsStore(s => s.height);
export const useSetControlsHeight = () => useControlsStore(s => s.setHeight);
export const useHideControls = () => useControlsStore(s => s.hideControls);
export const useShowControls = () => useControlsStore(s => s.showControls);
export const useHideExposure = () => useControlsStore(s => s.hideExposure);
export const useShowExposure = () => useControlsStore(s => s.showExposure);

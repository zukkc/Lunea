import { create } from 'zustand';

type ControlsStatus = 'shown' | 'hidden'

type ControlsState = {
  status: ControlsStatus;
  setStatus: (s: ControlsStatus) => void
};

export const useControlsStore = create<ControlsState>((set, get) => ({
  status: 'hidden',
  setStatus: s => set({ status: s }),
}));

export const useSetControlsStatus = () => useControlsStore(s => s.setStatus);
export const useControlsStatus = () => useControlsStore(s => s.status);

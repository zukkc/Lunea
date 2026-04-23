import { useSettingsStore } from '../store/settings.store';

import { shallow } from 'zustand/shallow';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import type { SettingKey, SettingsState } from '../types/settings.types';

const pick = <S, K extends keyof S>(state: S, keys: readonly K[]) => {
  const out = {} as Pick<S, K>;
  for (const k of keys) out[k] = state[k];
  return out;
};

function useSettingsSelector<T>(
  selector: (state: SettingsState) => T,
  equalityFn?: (a: T, b: T) => boolean,
) {
  return useStoreWithEqualityFn(useSettingsStore, selector, equalityFn);
}

/////////////////////////////////////////

export function useSettings<K extends SettingKey>(...keys: readonly K[]) {
  return useSettingsSelector(state => pick(state, keys), shallow);
}

export const getSettingsStore = () => {
  return useSettingsStore.getState();
};

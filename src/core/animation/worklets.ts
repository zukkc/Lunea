import { withTiming } from "react-native-reanimated";
import { scheduleOnUI, scheduleOnRN } from "react-native-worklets";

import type { SharedValue } from "react-native-reanimated";
import type { OptionalCB } from "../types/general.types"; 


type AnimateOpts = {
  duration?: number;
  increment?: boolean;
};

export const animateUI = (
  schedule: 'schedule' | 'direct',
  sv: SharedValue<number>,
  delta: number,
  opts: AnimateOpts = {},
  cb?: OptionalCB
) => {
  'worklet';
  // bezpieczne domyślne
  const { duration = 100, increment = false } = opts;

  const worklet = () => {
    'worklet'

    sv.value = withTiming(
      delta + (increment ? sv.value : 0),
      { duration }, // zawsze liczba
      (finished) => {
        if (finished && cb) scheduleOnRN(cb);
      }
    );
  }

  if (schedule === 'schedule') scheduleOnUI(worklet); 
  else if (schedule === 'direct') worklet() 
};

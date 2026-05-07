import { withTiming } from "react-native-reanimated";
import { scheduleOnUI, scheduleOnRN, isUIRuntime } from "react-native-worklets";

import type { SharedValue } from "react-native-reanimated";
import type { OptionalCB } from "../types/common";

type AnimateOpts = {
  duration?: number;
  increment?: boolean;
};

export const animateUI = (
  sv: SharedValue<number>,
  value: number,
  opts: AnimateOpts = {},
  cb?: OptionalCB
) => {
  'worklet';
  const { duration = 100, increment = false } = opts;

  const animation = () => {
    'worklet'

    sv.value = withTiming(
      value + (increment ? sv.value : 0),
      { duration },
      (finished) => {
        if (finished && cb) scheduleOnRN(cb);
      }
    );
  }

  if (isUIRuntime())
    animation()
  else
    scheduleOnUI(animation);
};

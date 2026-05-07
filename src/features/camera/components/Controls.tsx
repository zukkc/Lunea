import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Pressable } from 'react-native';
import Haptics from '@mhpdev/react-native-haptics';

import { Alignment } from '@/shared/ui';
import MovableWrapper from '@/shared/animation/MovableWrapper';
import ControlOption from './ControlOption';
import { Circle, Settings, SwitchCamera } from 'lucide-react-native';

import { useNavigation } from '@react-navigation/native';
import { useControlsStatus, useSetControlsStatus } from '../store/controls.store';
import { useControlsHeight } from '../hooks/useControlsHeight';
import { useSettingsStore } from '@/shared/settings/store';

import { AppRoutes } from '@/navigation/constants/routes';
import { RootStackParamList } from '@/navigation/types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSharedValue } from 'react-native-reanimated';
import { animateUI } from '@/shared/animation/worklets';

type ControlsProps = {
  onTakePhoto: () => void
}

const Controls = ({ onTakePhoto }: ControlsProps): React.JSX.Element => {
  const { height, bottomInset } = useControlsHeight();
  const verticalPosition = useSharedValue(0);
  const opacity = useSharedValue(0)
  const controlsStatus = useControlsStatus();
  const setControlsStatus = useSetControlsStatus();

  // HELPFUL TO DO NOT PLAY ANIMATION FOR THE FIRST DEFAULT STATUS (WHICH IS HIDDEN)
  const hasInitializedPosition = React.useRef(false);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const changeCameraPosition = useSettingsStore(s => s.changeCameraPosition);

  const onPressSettings = () => {
    setControlsStatus('hidden');
    navigation.navigate(AppRoutes.Settings);
  };

  useEffect(() => {
    if (height <= 0) return

    // CONTROLS TARGET POSITION AND OPACITY DEPENDS ON CURRENT STATUS
    const targetPosition = controlsStatus === 'hidden' ? 0 : -height
    const targetOpacity = controlsStatus === 'hidden' ? 0 : 1

    // IN CASE THE CONTROLS ARE IN A POSITION OTHER THAN THE HIDDEN SETTING WHEN THE APPLICATION IS LAUNCHED
    if (!hasInitializedPosition.current) {
      hasInitializedPosition.current = true
      return
    }

    animateUI(verticalPosition, targetPosition, { duration: 150 })
    animateUI(opacity, targetOpacity, { duration: 100 })
    Haptics.impact('heavy');
  }, [controlsStatus, height, bottomInset, verticalPosition])

  return (
    <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <MovableWrapper
        style={{
          position: 'absolute',
          bottom: -height,
          opacity: 0,
          flexDirection: 'row',
          height: height,
          padding: 5,
        }}
        yValue={verticalPosition}
        opacity={opacity}
      >
        <ControlOption Icon={SwitchCamera} action={changeCameraPosition} />
        <ControlOption Icon={Settings} action={onPressSettings} />
      </MovableWrapper>

      <Alignment horizontal="center" vertical="end" style={{ flex: 1 }}>
        <Pressable
          style={{ marginBottom: (height || 0) + 20 }}
          onPress={onTakePhoto}
        >
          <Circle size={100} strokeWidth={2} color="#fff" />
        </Pressable>
      </Alignment>
    </View>
  );
};

export default Controls;
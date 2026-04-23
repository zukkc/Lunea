import React from 'react';
import { View } from 'react-native';
import { Pressable } from 'react-native';

import Alignment from '@/src/core/components/ui/Alignment';
import MovableWrapper from '@/src/core/components/animated/MovableWrapper';
import ControlOption from './ControlOption';
import { Circle, Settings, SwitchCamera } from 'lucide-react-native';

import { useCamera } from '@/src/core/hooks/cameraHooks';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '@/src/core/hooks/settingsHooks';
import { useGetControlsHeight, useHideControls } from '../store/controls.store';

import { AppRoutes } from '@/src/navigation/constants/routes';
import { RootStackParamList } from '@/src/navigation/types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Controls = (): React.JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const controlsHeight = useGetControlsHeight();
  const { takePhoto } = useCamera('takePhoto');
  const { changeCameraPosition: swapPositions } = useSettings(
    'changeCameraPosition',
  );
  const hideControls = useHideControls();

  const onPressSettings = () => {
    hideControls();
    navigation.navigate(AppRoutes.Settings);
  };

  return (
    <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <MovableWrapper
        style={{
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          height: controlsHeight,
          padding: 5,
        }}
      >
        <ControlOption Icon={SwitchCamera} action={swapPositions} />
        <ControlOption Icon={Settings} action={onPressSettings} />
        <ControlOption Icon={SwitchCamera} action={swapPositions} />
        <ControlOption Icon={Settings} action={onPressSettings} />
      </MovableWrapper>

      <Alignment horizontal="center" vertical="end" style={{ flex: 1 }}>
        <Pressable
          style={{ marginBottom: (controlsHeight || 0) + 20 }}
          onPress={() => takePhoto()}
        >
          <Circle size={100} strokeWidth={2} color="#fff" />
        </Pressable>
      </Alignment>
    </View>
  );
};

export default Controls;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Camera from '../features/camera/screens/Camera';
import CameraLayout from '../features/camera/layout/CameraLayout';
import Settings from '../features/settings/screens/Settings';

import { RootStackParamList } from './types/types';
import { AppRoutes } from './constants/routes';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name={AppRoutes.Camera}
          component={Camera}
          options={{ headerShown: false }}
          layout={CameraLayout}
        />
        <RootStack.Screen
          name={AppRoutes.Settings}
          component={Settings}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

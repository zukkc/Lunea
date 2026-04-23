import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native';
import { WriteText } from '../../../core/components/ui/WriteText';
import { Linking } from 'react-native';
import { Settings } from 'lucide-react-native';

const HasNoPermissionView = (): React.JSX.Element => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#2A2A2A" }}>
      <WriteText>Nie zazwoliłeś na używanie kamery i mikrofonu</WriteText>
      <Button
        style={{ BackgroundColor: "#1A1A1A" }}
        onPress={() => Linking.openSettings()}
      >
        <Settings />
        <WriteText>Ustawienia</WriteText>
      </Button>
    </View>
  );
};

export default HasNoPermissionView;

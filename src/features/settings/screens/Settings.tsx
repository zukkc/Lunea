import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

import { useSettingsStore } from '@/shared/settings/store';

import Divider from '../components/Divider';
import SettingOption from '../components/SettingOption';
import { Rounded, WriteText } from '@/shared/ui';
import { ChartSplineIcon } from 'lucide-react-native';
import { PHOTO_QUALITY } from '../constants/settings';
import { QualityPrioritization } from 'react-native-vision-camera';
import { useMakeSetting } from '../hooks/useMakeSetting';

const Settings = () => {
  const photoQuality = useSettingsStore(s => s.photoQuality)
  const changePhotoQuality = useSettingsStore(s => s.changePhotoQuality)
  const [title, photoQualityData] = useMakeSetting(PHOTO_QUALITY, 'settings.photoQuality')

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#2A2A2A',
        paddingVertical: 20,
        paddingHorizontal: 30,
      }}
    >
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <WriteText
          style={{ color: '#ffffff', fontSize: 20, paddingVertical: 30 }}
        >
          Ustawienia zdjec
        </WriteText>

        <Rounded
          rounded={30}
          style={{
            paddingVertical: 20,
            paddingHorizontal: 10,
            backgroundColor: '#3A3A3A',
          }}
        >
          <SettingOption<QualityPrioritization>
            titleKey={title}
            value={photoQuality}
            data={photoQualityData}
            onChange={quality => changePhotoQuality(quality)}
            LeftIcon={ChartSplineIcon}
            leftIconSize={22}
          />

          <Divider marginV={20} thickness={0.5} color="#bbbbbb" />

        </Rounded>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

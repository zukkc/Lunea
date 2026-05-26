import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import Divider from '../components/Divider';
import SettingOption from '../components/SettingOption';
import ProfileButton from '../components/ProfileButton';
import { Rounded, WriteText } from '@/shared/ui';
import { ChartSplineIcon } from 'lucide-react-native';

import { useSettingsStore } from '@/shared/settings/store';
import { useMakeSetting } from '../hooks/useMakeSetting';
import { useTranslation } from 'react-i18next'; 

import { PHOTO_QUALITY } from '../constants/constants';
import type { QualityPrioritization } from 'react-native-vision-camera';

const Settings = () => {
  const { t } = useTranslation();

  const devicePreference = useSettingsStore(s => s.devicePreference);
  const changeDevicePreference = useSettingsStore(s => s.changeDevicePreference)

  const photoQuality = useSettingsStore(s => s.photoQuality)
  const changePhotoQuality = useSettingsStore(s => s.changePhotoQuality)
  const [title, photoQualityData] = useMakeSetting(PHOTO_QUALITY, 'settings.photo.quality')

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <WriteText
          style={{ color: '#ffffff', textAlign: "center", fontSize: 20 }}
        >
          {t('settings.profiles.title')} 
        </WriteText>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15 }}>
          <ProfileButton
            title={t('settings.profiles.speed')}
            active={devicePreference === 'fast'}
            onPress={() => changeDevicePreference('fast')}
          />
          <ProfileButton
            title={t('settings.profiles.balanced')}
            active={devicePreference === 'balanced'}
            onPress={() => changeDevicePreference('balanced')}
          />
          <ProfileButton
            title={t('settings.profiles.quality')}
            active={devicePreference === 'quality'}
            onPress={() => changeDevicePreference('quality')}
          />
        </View>

        <WriteText
          style={styles.optionsGroupTitle}
        >
          {t('settings.photo.title')} 
        </WriteText>

        <Rounded
          rounded={30}
          style={styles.optionContainer}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  optionContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#3A3A3A'
  },
  optionsGroupTitle: {
    color: '#ffffff',
    fontSize: 20,
    paddingVertical: 30
  }
})

export default Settings;

import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import Divider from '../components/Divider';
import SettingOption from '../components/SettingOption';
import ProfileButton from '../components/ProfileButton';
import { Rounded, WriteText } from '@/shared/ui';
import { ChartSplineIcon, ActivityIcon } from 'lucide-react-native';

import { useSettingsStore } from '@/shared/settings/store';
import { makeSetting } from '../utils/utils';
import { useTranslation } from 'react-i18next';

import { PHOTO_QUALITY, VIDEO_STABILIZATION } from '../constants/constants';
import type { QualityPrioritization, StabilizationMode } from 'react-native-vision-camera';

const Settings = () => {
  const { t } = useTranslation();
  const deviceSnapshot = useSettingsStore(s => s.deviceSnapshot);

  const devicePreference = useSettingsStore(s => s.devicePreference);
  const changeDevicePreference = useSettingsStore(s => s.changeDevicePreference)
  
  const fps = useSettingsStore(s => s.fps);
  const setFps = useSettingsStore(s => s.setFps);

  //photo
  const photoQuality = useSettingsStore(s => s.photoQuality);
  const changePhotoQuality = useSettingsStore(s => s.changePhotoQuality);
  
  const photoHDR = useSettingsStore(s => s.photoHDR);
  const togglePhotoHDR = useSettingsStore(s => s.togglePhotoHDR);
  
  //video
  const videoStabilizationMode = useSettingsStore(s => s.videoStabilizationMode)
  const setVideoStabilizationMode = useSettingsStore(s => s.setVideoStabilizationMode)
  

  if (!deviceSnapshot) return;

  // photo
  const [fpsTitleKey, availableFps] = makeSetting(deviceSnapshot.supportedFpsValues, 'settings.general.fps')
  const [photoQualityTitleKey, photoQualityData] = makeSetting(PHOTO_QUALITY, 'settings.photo.quality')
  
  // video
  const [videoStabilizationTitleKey, videoStabilizationData] = makeSetting(VIDEO_STABILIZATION, 'settings.video.stabilization')
  
  console.log(photoHDR)

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/*///////////////////PROFILE_SETTINGS////////////////////////////*/}

        <WriteText
          style={{ color: '#ffffff', textAlign: "center", fontSize: 20 }}
        >
          {t('settings.profiles.title')}
        </WriteText>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 15 }}>
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
          {t('settings.general.title')}
        </WriteText>

        <Rounded
          rounded={30}
          style={styles.optionContainer}
        >
          <SettingOption<number>
            variant='list'
            titleKey={fpsTitleKey}
            value={fps}
            data={availableFps}
            rawData={true}
            onChange={fps => setFps(fps)}
            LeftIcon={ActivityIcon}
            leftIconSize={22}
          />
        </Rounded>

        {/*///////////////////PHOTO_SETTINGS////////////////////////////*/}

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
            variant='list'
            titleKey={photoQualityTitleKey}
            value={photoQuality}
            data={photoQualityData}
            onChange={quality => changePhotoQuality(quality)}
            LeftIcon={ChartSplineIcon}
            leftIconSize={22}
          />

          <Divider marginV={20} thickness={0.5} color="#bbbbbb" />

           <SettingOption<boolean>
            variant='switch'
            titleKey='settings.photo.hdr.title'
            value={photoHDR}
            onChange={e => togglePhotoHDR()}
            LeftIcon={ChartSplineIcon}
            leftIconSize={22}
          />

        </Rounded>
        
        
        {/*///////////////////VIDEO_SETTINGS////////////////////////////*/}

        <WriteText
          style={styles.optionsGroupTitle}
        >
          {t('settings.video.title')}
        </WriteText>

        <Rounded
          rounded={30}
          style={styles.optionContainer}
        >
          <SettingOption<StabilizationMode>
            variant='list'
            titleKey={videoStabilizationTitleKey}
            value={videoStabilizationMode}
            data={videoStabilizationData}
            onChange={mode => setVideoStabilizationMode(mode)}
            LeftIcon={ChartSplineIcon}
            leftIconSize={22}
          />

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

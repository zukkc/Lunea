import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

import { useCamera } from '@/src/core/hooks/cameraHooks';
import { useSettings } from '../../../core/hooks/settingsHooks';
import { useAllBackDevicesOptions, useAllFrontDevicesOptions, useBackDeviceSelectedOption, useFrontDeviceSelectedOption } from '../hooks/deviceHooks';
import { useAllPhotoQualityOptions, useSelectedPhotoQuality } from '../hooks/photoHooks';

import Divider from '../components/Divider';
import SettingOption from '../components/SettingOption';
import Rounded from '../../../core/components/ui/Rounded';
import { WriteText } from '@/src/core/components/ui/WriteText';
import { CameraIcon, ChartSplineIcon } from 'lucide-react-native';

const Settings = () => {
  const { setDeviceForPosition } = useCamera(
    'setDeviceForPosition',
  );

  const { changePhotoQuality } = useSettings('changePhotoQuality');

  const allFrontDevicesOptions = useAllFrontDevicesOptions();
  const frontDeviceSelectedOption = useFrontDeviceSelectedOption() 

  const allBackDevicesOptions = useAllBackDevicesOptions();
  const backDeviceSelectedOption = useBackDeviceSelectedOption()

  const allPhotoQualityOptions = useAllPhotoQualityOptions();
  const selectedPhotoQuality = useSelectedPhotoQuality();

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
          Ustawienia urządzeń
        </WriteText>

        <Rounded
          rounded={30}
          style={{
            paddingVertical: 20,
            paddingHorizontal: 10,
            backgroundColor: '#3A3A3A',
          }}
        >
          <SettingOption
            show={allFrontDevicesOptions.length > 0}
            title="Przednia"
            value={frontDeviceSelectedOption}
            data={allFrontDevicesOptions}
            setValue={value => setDeviceForPosition('front', value)}
            LeftIcon={CameraIcon}
            leftIconSize={22}
          />

          <Divider marginV={20} thickness={0.5} color="#bbbbbb" />

          <SettingOption
            show={allBackDevicesOptions.length > 0}
            title="Tylnia"
            value={backDeviceSelectedOption}
            data={allBackDevicesOptions}
            setValue={value => setDeviceForPosition('back', value)}
            LeftIcon={CameraIcon}
            leftIconSize={22}
          />
        </Rounded>
      
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
          <SettingOption
            title="jakosc"
            value={selectedPhotoQuality}
            data={allPhotoQualityOptions}
            setValue={quality => changePhotoQuality(quality)}
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

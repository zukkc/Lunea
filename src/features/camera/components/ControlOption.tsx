import Rounded from '../../../core/components/ui/Rounded';
import BlurViewManager from '../../../core/components/ui/BlurViewManager';
import { Pressable } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

type ControlOptionType = {
  action: () => void;
  Icon: LucideIcon;
};

const ControlOption = ({ action, Icon }: ControlOptionType) => {
  return (
    <Rounded
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginHorizontal: 5,
      }}
    >
      <BlurViewManager isGlassInteractive={true} />

      <Pressable onPress={() => action()} style={{ paddingVertical: 5 }}>
        <Icon size={35} strokeWidth={1} color={'#ffffff'} />
      </Pressable>
    </Rounded>
  );
};

export default ControlOption;

import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { WriteText } from '../../../core/components/ui/WriteText';
import { Dropdown } from 'react-native-element-dropdown';
import BlurViewManager from '../../../core/components/ui/BlurViewManager';
import { ChevronDown } from 'lucide-react-native';
import type { OptionType } from '@/src/core/types/settings.types';

import type { LucideIcon } from 'lucide-react-native';

type SettingOptionProps<T> = {
  show?: boolean;
  value?: OptionType<T>;
  data?: Array<OptionType<T>>;
  title: string;
  LeftIcon?: LucideIcon;
  leftIconSize?: number;
  setValue: (value: T) => void;
};

const SettingOption = <T,>({
  show = true,
  value,
  data,
  title = 'TITLE',
  LeftIcon,
  leftIconSize = 30,
  setValue,
}: SettingOptionProps<T>): React.JSX.Element | null => {
  if (!show || !data?.length) return null;

  const renderLeftIcon = (): React.JSX.Element | null => {
    if (!LeftIcon) return null;
    return (
      <LeftIcon style={styles.icon} color={'#aaaaaa'} size={leftIconSize} />
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {renderLeftIcon()}
        <WriteText style={styles.titleText}>{title}</WriteText>
      </View>

      <View style={styles.dropDownContainer}>
        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.listStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          selectedTextProps={{numberOfLines: 1, ellipsizeMode: 'tail'}}
          activeColor='rgba(0,0,0,0.3)'
          fontFamily="Exo2-regular"
          data={data}
          showsVerticalScrollIndicator={false}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={value?.label ?? '...'}
          value={value?.value}
          onChange={(item: OptionType<T>) => {
            setValue(item.value);
          }}
          renderRightIcon={() => (
              <ChevronDown style={styles.icon} color={'#aaaaaa'} size={25} />
            )
          }
          renderItem={(item: OptionType<T>) => (
              <View style={styles.itemStyle}>
                <BlurViewManager
                  type="blur"
                  blurType="prominent"
                  blurAmount={40}
                />
                <WriteText style={styles.itemText}>{item.label}</WriteText>
              </View>
            )
          }
        />
      </View>
    </View>
  );
};

export default SettingOption;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: '#eeeeee',
    fontSize: 16,
  },
  dropDownContainer: {
    maxWidth: '50%',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  listStyle: {
    overflow: 'hidden',
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  itemStyle: {
    padding: 10,
  },
  itemText: {
    color: '#bbbbbb',
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  dropdown: {
    padding: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#ffffff',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#dddddd"
  },
});

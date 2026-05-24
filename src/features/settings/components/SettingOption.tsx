import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WriteText } from '../../../shared/ui/WriteText';
import { Dropdown } from 'react-native-element-dropdown';
import { BlurViewManager } from '@/shared/ui';
import { ChevronDown } from 'lucide-react-native';

import { useTranslation } from 'react-i18next';

import type { OptionType } from '@/shared/settings/types';
import type { LucideIcon } from 'lucide-react-native';

type SettingOptionProps<T> = {
  value: T;
  data: Array<OptionType<T>>;
  titleKey: string;
  LeftIcon?: LucideIcon;
  leftIconSize?: number;
  onChange: (value: T) => void;
};

const SettingOption = <T,>({
  value,
  data,
  titleKey,
  LeftIcon,
  leftIconSize = 30,
  onChange,
}: SettingOptionProps<T>): React.JSX.Element | null => {
  const { t } = useTranslation();

  const translatedData = React.useMemo(() =>
    data.map(option => ({
      ...option,
      label: t(option.i18nKey),
    })),
    [data, t],
  );
  
  const translatedTitle = React.useMemo(() => {
    return t(titleKey);
  }, [titleKey, t]) 

  const renderLeftIcon = (): React.JSX.Element | null => {
    if (!LeftIcon) return null;
    return (
      <LeftIcon style={styles.icon} color={'#aaaaaa'} size={leftIconSize} />
    );
  };

  const findLabelfromValue = (val: T | undefined): string => {
    const option = translatedData.find(el => el.value === val)
    if (option)
      return option.label
    else
      return 'error'
  }
  
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
        <WriteText style={styles.titleText}>{translatedTitle}</WriteText>
      </View>

      <View style={styles.dropDownContainer}>
        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.listStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          selectedTextProps={{ numberOfLines: 1, ellipsizeMode: 'tail' }}
          activeColor='rgba(0,0,0,0.3)'
          fontFamily="Exo2-regular"
          data={translatedData}
          showsVerticalScrollIndicator={false}
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={value}
          onChange={(item: OptionType<T>) => {
            onChange(item.value);
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
              <WriteText style={styles.itemText}>{findLabelfromValue(item.value)}</WriteText>
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
  dropdown: {
    padding: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#ffffff',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#dddddd",
    textAlign: 'right',
    marginRight: 5,
  },
});

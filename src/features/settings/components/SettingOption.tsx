import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { WriteText } from '../../../shared/ui/WriteText';
import { Dropdown } from 'react-native-element-dropdown';
import { BlurViewManager } from '@/shared/ui';
import { ChevronDown } from 'lucide-react-native';

import { useTranslation } from 'react-i18next';

import type { OptionType } from '@/shared/settings/types';
import type { LucideIcon } from 'lucide-react-native';

type SettingOptionProps<T> = ListProps<T> | SwitchProps;

type BaseProps = {
  titleKey: string;
  LeftIcon?: LucideIcon;
  leftIconSize?: number;
};

type ListProps<T> = BaseProps & {
  variant: 'list';
  value: T;
  data: Array<OptionType<T>>;
  rawData?: boolean;
  onChange: (value: T) => void;
};

type SwitchProps = BaseProps & {
  variant: 'switch';
  value: boolean;
  onChange: (value: boolean) => void;
};

const SettingOption = <T,>(
  props: SettingOptionProps<T>,
): React.JSX.Element | null => {
  const { t } = useTranslation();

  const {
    titleKey,
    LeftIcon,
    leftIconSize = 30,
  } = props;

  const translatedTitle = React.useMemo(() => {
    return t(titleKey);
  }, [titleKey, t]);

  const renderLeftIcon = (): React.JSX.Element | null => {
    if (!LeftIcon) return null;

    return (
      <LeftIcon style={styles.icon} color="#aaaaaa" size={leftIconSize} />
    );
  };

  const renderHeader = () => (
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
  );

  if (props.variant === 'switch') {
    return (
      <View style={styles.container}>
        {renderHeader()}

        <View style={{ padding: 10 }}>
          <Switch
            value={props.value}
            onValueChange={props.onChange}
          />
        </View>
      </View>
    );
  }

  const translatedData = props.data?.map(option => ({
    ...option,
    label: props.rawData ? String(option.value) : t(option.i18nKey),
  }));

  const findLabelFromValue = (val: T): string => {
    const option = translatedData.find(el => el.value === val);
    return option ? String(option.label) : 'error';
  };

  return (
    <View style={styles.container}>
      {renderHeader()}

      <View style={styles.dropDownContainer}>
        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.listStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          selectedTextProps={{ numberOfLines: 1, ellipsizeMode: 'tail' }}
          activeColor="rgba(0,0,0,0.3)"
          fontFamily="Exo2-regular"
          data={translatedData}
          showsVerticalScrollIndicator={false}
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={props.value}
          onChange={(item: OptionType<T>) => {
            props.onChange(item.value);
          }}
          renderRightIcon={() => (
            <ChevronDown style={styles.icon} color="#aaaaaa" size={25} />
          )}
          renderItem={(item: OptionType<T>) => (
            <View style={styles.itemStyle}>
              <BlurViewManager
                type="blur"
                blurType="prominent"
                blurAmount={40}
              />
              <WriteText style={styles.itemText}>
                {findLabelFromValue(item.value)}
              </WriteText>
            </View>
          )}
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

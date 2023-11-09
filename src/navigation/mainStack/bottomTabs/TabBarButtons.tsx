import { ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { hp } from '../../../utils/sizes';
import colors from '../../../utils/colors';
import HomeIcon from '../../../assets/icons/homeIcon.png';
import SettingsIcon from '../../../assets/icons/profile.png';
import HomeIconWhite from '../../../assets/icons/homeWhite.png';
import SettingsIconWhite from '../../../assets/icons/profileWhite.png';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

interface ITabBarButtons {
  index: number;
  name: string;
  props: BottomTabBarButtonProps;
}

type IconType = Record<string, ImageSourcePropType>;

const TabBarButtons = ({ props, index, name }: ITabBarButtons) => {
  const { onPress, accessibilityState } = props;
  const isFocus = accessibilityState!.selected;
  const color = isFocus ? colors.MAIN_GREEN : colors.MAIN_WHITE;
  const ifFirstTab = index === 0;
  const ifLastTab = index === 2;

  const getIcon = (name: string, isFocus: boolean = false): ImageSourcePropType => {
    const icons: IconType = {
      Dashboard: isFocus ? HomeIcon : HomeIconWhite,
      Settings: isFocus ? SettingsIcon : SettingsIconWhite,
    };
    return icons[name];
  };

  return (
    <Pressable style={styles.buttonBlock} onPress={onPress}>
      <View
        style={[
          styles.buttonStyle,
          {
            borderTopLeftRadius: ifFirstTab ? 15 : 0,
            borderTopRightRadius: ifLastTab ? 15 : 0,
            borderColor: isFocus ? colors.MAIN_GREEN : colors.MAIN_WHITE,
            borderLeftWidth: ifFirstTab ? 0.5 : 0,
            borderRightWidth: ifLastTab ? 0.5 : 0,
          },
        ]}
      >
        <View style={[{ alignItems: 'center' }]}>
          <Image source={getIcon(name, isFocus)} style={styles.icon} />
          <Text
            style={[
              styles.labelStyle,
              {
                color: color,
              },
            ]}
          >
            {name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default TabBarButtons;

const styles = StyleSheet.create({
  buttonBlock: {
    flex: 1,
    borderTopWidth: 2,
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: colors.SECONDARY_GRAY,
    borderTopWidth: 1.5,
  },
  labelStyle: {
    fontSize: hp(1.6),
    textAlign: 'center',
    fontWeight: '500',
    position: 'absolute',
    bottom: -25,
    zIndex: 10,
  },
  icon: {
    width: 28,
    height: 28,
    marginTop: 6,
  },
});

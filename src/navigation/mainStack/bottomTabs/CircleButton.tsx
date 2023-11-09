import { Alert, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../../../utils/colors';
import { Path, Svg } from 'react-native-svg';
import PlayIcon from '../../../assets/icons/playIcon.png';

const TabBg = ({ color = colors.SECONDARY_GRAY, ...props }) => {
  return (
    <Svg width={75} height={61.5} viewBox="0 0 75 61" {...props}>
      <Path
        d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
        fill={color}
      />
    </Svg>
  );
};

const CircleButton = () => {
  return (
    <View style={styles.container} pointerEvents="box-none">
      <TabBg style={styles.background} />
      <TouchableOpacity style={styles.plusIcon} onPress={() => Alert.alert('some logic')}>
        <Image source={PlayIcon} style={{ width: 30, height: 30, zIndex: 20 }} />
      </TouchableOpacity>
    </View>
  );
};

export default CircleButton;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
  },
  container: {
    position: 'relative',
    width: 75,
    alignItems: 'center',
  },
  plusIcon: {
    top: -22.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 27,
    backgroundColor: colors.MAIN_GREEN,
  },
});

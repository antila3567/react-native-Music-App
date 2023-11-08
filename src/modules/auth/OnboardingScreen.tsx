import React, { useEffect } from 'react';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Container from '../../common/baseComponents/Container';
import BaseText from '../../common/baseComponents/BaseText';
import OnboardImage from '../../assets/images/onboarding/onboardBackground.jpeg';
import PlayIcon from '../../assets/icons/playIcon.png';
import { hp, width } from '../../utils/sizes';
import colors from '../../utils/colors';
import { useIsFocused } from '@react-navigation/native';
import { useAppDispatch } from '../../hooks/useRedux';
import { setAuthStatus, setOnboardingStatus } from '../../redux/slices/auth/authSlice';

const OnboardingScreen = () => {
  const isFocused = useIsFocused();
  const scale = useSharedValue(0.8);
  const dp = useAppDispatch();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    if (!isFocused) {
      cancelAnimation(scale);
    } else {
      scale.value = withRepeat(withTiming(1, { duration: 700 }), -1, true);
    }
  }, [isFocused]);

  return (
    <Container>
      <View style={styles.mainImageBlock}>
        <Image source={OnboardImage} style={styles.image} />
      </View>
      <View style={styles.infoBlock}>
        <BaseText textStyle={styles.infoTitle}>Millions of music!</BaseText>
        <BaseText textStyle={styles.infoDescription}>
          Be the first to discover, play and share your favorite songs from the app
        </BaseText>
        <Animated.View style={animatedStyle}>
          <TouchableOpacity onPress={() => dp(setAuthStatus(true))} style={styles.playIconBtn}>
            <Image source={PlayIcon} style={styles.playIcon} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  infoBlock: {
    padding: hp(2.5),
    alignItems: 'center',
  },
  mainImageBlock: {
    borderColor: colors.MAIN_GREEN,
    borderBottomWidth: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  image: {
    width: width,
    height: width / 1.2,
  },
  infoTitle: {
    fontSize: hp(2.8),
    fontWeight: '700',
  },
  infoDescription: {
    textAlign: 'center',
    fontSize: hp(2),
    fontWeight: '400',
    marginTop: hp(2.5),
  },
  playIconBtn: {
    backgroundColor: colors.MAIN_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: 50,
  },
  playIcon: {
    width: 60,
    height: 60,
  },
});

export default OnboardingScreen;

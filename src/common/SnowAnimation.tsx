import React, { useRef, useEffect, useState } from 'react';
import { Animated, StyleSheet, Easing, View, Dimensions, ScaledSize } from 'react-native';
import useIsMounted from '../hooks/useIsMounted';

type TSpeed = 'slow' | 'medium' | 'fast';

type TScene = ScaledSize | null | { width: number; height: number };

type TLayout = { nativeEvent: { layout: { width: number; height: number } } };

interface IFallingSnow {
  snowflakesCount?: number;
  fallSpeed?: TSpeed;
  fullScreen?: boolean;
}

interface IAnimationConfig {
  scene: { width: number; height: number };
  initialDelay?: boolean;
  fallSpeed: TSpeed;
}

interface ISnowAnimation {
  scene: { width: number; height: number };
  fallSpeed: TSpeed;
}

const START_Y_POSITION = -50;
const FALL_DURATIONS = {
  fast: [8000, 15000],
  medium: [15000, 30000],
  slow: [30000, 60000],
};
const SNOWFLAKE_TYPES = ['❄️', '❅', '❃', '❇', '❈', '❊', '❋'];

const fullDimensions = Dimensions.get('window');

const SnowAnimation = React.memo(({ scene, fallSpeed }: ISnowAnimation) => {
  const [config, setConfig] = useState(() =>
    animationConfig({ scene, fallSpeed, initialDelay: true })
  );
  const animatedY = useRef(new Animated.Value(START_Y_POSITION)).current;
  const animatedRotation = useRef(new Animated.Value(0)).current;
  const animatedSideMovement = useRef(new Animated.Value(0)).current;
  const isMounted = useIsMounted();

  const runAnimation = () => {
    animatedY.setValue(START_Y_POSITION);
    animatedRotation.setValue(0);
    animatedSideMovement.setValue(0);

    Animated.loop(
      Animated.timing(animatedRotation, {
        toValue: 1,
        duration: config.rotationDuration,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedSideMovement, {
          toValue: -1,
          duration: config.sideMovementDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedSideMovement, {
          toValue: 1,
          duration: config.sideMovementDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.sequence([
      Animated.delay(config.fallDelay),
      Animated.timing(animatedY, {
        toValue: scene.height,
        duration: config.fallDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      const newConfig = animationConfig({ scene, fallSpeed });
      setConfig(newConfig);
    });
  };

  useEffect(() => {
    if (config && isMounted()) {
      runAnimation();
    }
  }, [config, isMounted]);

  const rotate = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: config.rotationDirection ? ['0deg', '360deg'] : ['360deg', '0deg'],
    extrapolate: 'clamp',
  });

  const translateX = animatedSideMovement.interpolate({
    inputRange: [-1, 1],
    outputRange: [-config.sideMovementAmplitude, config.sideMovementAmplitude],
  });

  return (
    <Animated.Text
      style={[
        styles.snowflake,
        {
          transform: [{ translateY: animatedY }, { rotate }, { translateX }],
        },
        {
          left: config.xPosition,
          fontSize: config.size,
          opacity: config.opacity,
        },
      ]}
    >
      {config.type}
    </Animated.Text>
  );
});

function animationConfig({ scene, initialDelay = false, fallSpeed = 'medium' }: IAnimationConfig) {
  const size = randomInt(10, 18);
  const opacity = randomInt(4, 10) / 10;
  const type = SNOWFLAKE_TYPES[randomInt(0, 2)];
  const xPosition = randomInt(0, scene.width);
  const [minDur, maxDur] = FALL_DURATIONS[fallSpeed];

  //fall animation
  const fallDuration = randomInt(minDur, maxDur);
  const fallDelay = randomInt(500, initialDelay ? 20000 : 10000);
  // rotate animation
  const rotationDuration = randomInt(2000, 10000);
  const rotationDirection = randomInt(0, 1);
  // side shake animation
  const sideMovementDuration = randomInt(3000, 8000);
  const sideMovementAmplitude = randomInt(0, 50);

  return {
    size,
    opacity,
    type,
    xPosition,
    fallDuration,
    fallDelay,
    rotationDuration,
    rotationDirection,
    sideMovementDuration,
    sideMovementAmplitude,
  };
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const FallingSnow = React.memo(
  ({ snowflakesCount = 100, fallSpeed = 'medium', fullScreen = false }: IFallingSnow) => {
    const isFullScreen = fullScreen ? fullDimensions : null;

    const [scene, setScene] = useState<TScene>(isFullScreen);

    const dimensionsStyle = fullScreen ? fullDimensions : styles.stretchDimensions;

    const onLayout = ({
      nativeEvent: {
        layout: { width, height },
      },
    }: TLayout) => {
      if (!fullScreen) {
        setScene({ width, height });
      }
    };

    return (
      <View pointerEvents="none" style={[styles.container, dimensionsStyle]} onLayout={onLayout}>
        {!!scene &&
          new Array(snowflakesCount)
            .fill(true)
            .map((_, i) => <SnowAnimation key={i} scene={scene} fallSpeed={fallSpeed} />)}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  snowflake: {
    color: 'white',
    position: 'absolute',
  },
  container: {
    position: 'absolute',
  },
  stretchDimensions: {
    width: '100%',
    height: '100%',
  },
});

export default FallingSnow;

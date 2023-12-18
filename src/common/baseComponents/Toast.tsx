import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../../utils/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { height, hp, width } from '../../utils/sizes';
import Color from 'color';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import PlayIcon from '../../assets/icons/playIcon.png';

type TMessage = { id: number; message: string };

interface IToastComponent {
  messages: TMessage[];
  removeMsg: (id: number) => void;
}

interface IToast {
  message: TMessage;
  itemsLength: number;
  index: number;
  removeMsg: (id: number) => void;
}

const Toast = ({ message, itemsLength, index, removeMsg }: IToast) => {
  const displayValue = index > 3 ? 'none' : 'flex';
  const MARGIN_FROM_TOP = 20;
  const msgScales = 1 - index * 0.07;
  const delta = 10;
  const transX = useSharedValue(0);
  const itemPosition = MARGIN_FROM_TOP - index * delta;
  const isFirstItem = index === 0;
  const isOpened = useSharedValue(false);

  const BG = colors.MAIN_WHITE;
  const BGwithShadow = Color(BG)
    .darken(index * 0.2)
    .hex();

  const showNextMsg = useDerivedValue(() => {
    return isFirstItem
      ? withTiming(itemPosition, {
          duration: 500,
          easing: Easing.inOut(Easing.quad),
        })
      : itemPosition;
  }, [itemsLength]);

  const containerStyles = useAnimatedStyle(() => {
    return {
      height: withTiming(isOpened.value ? height / 2 : 65),
      display: displayValue,
      backgroundColor: BGwithShadow,
      top: isFirstItem ? showNextMsg.value : withTiming(showNextMsg.value),
      transform: [
        {
          scale: withTiming(msgScales),
        },
        { translateX: transX.value },
      ],
    };
  });

  const arrowStyle = useAnimatedStyle(() => {
    const rotationAngle = !isOpened.value ? '90deg' : '29deg';
    return {
      transform: [
        {
          rotate: withSpring(rotationAngle, {
            duration: 1500,
          }),
        },
      ],
    };
  });

  const additionalInfoStyle = useAnimatedStyle(() => {
    const status = isOpened.value ? 'flex' : 'none';
    return {
      opacity: withTiming(isOpened.value ? 1 : 0, {
        duration: isOpened.value ? 1500 : 200,
      }),
    };
  });

  function skipMessage() {
    'worklet';
    runOnJS(removeMsg)(message.id);
  }

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      if (isFirstItem) {
        transX.value = e.translationX;
      }
    })
    .onEnd(() => {
      const curValue = Math.abs(transX.value);
      const isNegative = transX.value < 0 ? -700 : 700;

      if (curValue < width * 0.5) {
        transX.value = withTiming(0);
        return;
      }

      transX.value = withTiming(isNegative, {}, skipMessage);
    });

  return (
    <GestureHandlerRootView style={{ zIndex: itemsLength - index }}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, containerStyles]}>
          <View style={styles.previewBlock}>
            <Text style={styles.text}>{`id - ${message.id} ${message.message}`}</Text>
            <TouchableOpacity
              onPress={() => {
                isOpened.value = !isOpened.value;
              }}
            >
              <Animated.Image source={PlayIcon} style={[styles.icon, arrowStyle]} />
            </TouchableOpacity>
          </View>
          <Animated.View style={additionalInfoStyle}>
            <Text>
              Transforms are style properties that will help you modify the appearance and position
              of your components using 2D or 3D transformations. However, once you apply transforms,
              the layouts remain the same around the transformed component hence it might overlap
              with the nearby components. You can apply margin to the transformed nearby components.
              You can apply margin to the transformed
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#000',
                padding: 20,
                borderRadius: 30,
                alignItems: 'center',
                width: '90%',
                marginLeft: 10,
                marginTop: 15,
              }}
            >
              <Text style={{ color: '#fff' }}>Read something</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const ToastComponent = ({ messages, removeMsg }: IToastComponent) => {
  return (
    <>
      {[...messages].reverse().map((el, i) => (
        <Toast
          key={el.id}
          index={i}
          message={el}
          itemsLength={messages.length}
          removeMsg={removeMsg}
        />
      ))}
    </>
  );
};

export default ToastComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.MAIN_WHITE,
    marginHorizontal: 20,
    position: 'absolute',
    width: width * 0.9,
    padding: hp(2.5),
    borderRadius: 12,
  },
  previewBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: '700',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

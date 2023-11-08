import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../../../../utils/colors';
import { width } from '../../../../utils/sizes';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Color from 'color';
import BaseText from '../../../../common/baseComponents/BaseText';

interface IDropdownListItem {
  el: {
    label?: string;
    author: string;
    name: string;
    avatar: ImageSourcePropType;
    isHeader?: boolean;
  };
  index: number;
  dropdownItemsCount: number;
  isExpanded: SharedValue<boolean>;
  heightOfDropdown: SharedValue<number>;
}

const DropdownListItem = ({
  el,
  index,
  dropdownItemsCount,
  isExpanded,
  heightOfDropdown,
}: IDropdownListItem) => {
  const DROPDOWN_WIDTH = width * 0.95;
  const DROPDOWN_HEIGHT = 80;
  const MARGIN_BTW_ITEMS = 10;

  const FULL_HEIGHT_OF_DROPDOWN = dropdownItemsCount * (DROPDOWN_HEIGHT + MARGIN_BTW_ITEMS);

  const positionTop = -DROPDOWN_HEIGHT;
  const collapsedTop = FULL_HEIGHT_OF_DROPDOWN / 2 - DROPDOWN_HEIGHT;
  const expandedTop = (DROPDOWN_HEIGHT + MARGIN_BTW_ITEMS) * index - DROPDOWN_HEIGHT;

  const expandedScale = 1;
  const collapsedScale = 1 - index * 0.09;

  const isHeader = index === 0;
  const itemsOrder = dropdownItemsCount - index;

  const expandedBGC = '#181818';
  const collapsedBGC = Color(expandedBGC)
    .lighten(index * 0.1)
    .hex();

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isExpanded.value ? expandedBGC : collapsedBGC),
      top: withSpring(isExpanded.value ? expandedTop : positionTop),
      transform: [
        {
          scale: withSpring(isExpanded.value ? expandedScale : collapsedScale),
        },
        {
          translateY: collapsedTop,
        },
      ],
    };
  }, []);

  const manipulateWithDropdown = () => {
    if (!isHeader) return;

    isExpanded.value = !isExpanded.value;
    heightOfDropdown.value = isExpanded.value
      ? DROPDOWN_HEIGHT
      : DROPDOWN_HEIGHT * dropdownItemsCount + MARGIN_BTW_ITEMS * 2;
  };

  return (
    <Animated.View
      onTouchEnd={manipulateWithDropdown}
      style={[
        rStyle,
        {
          zIndex: itemsOrder,
          position: 'absolute',
          width: DROPDOWN_WIDTH,
          height: DROPDOWN_HEIGHT,
          borderRadius: 10,
          justifyContent: 'center',
        },
      ]}
    >
      {isHeader ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <BaseText
            textStyle={{
              fontWeight: '600',
            }}
          >
            {el.label}
          </BaseText>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Image source={el.avatar} style={{ width: 50, height: 50, borderRadius: 10 }} />
          <BaseText>{el.name}</BaseText>
          <BaseText>{el.author}</BaseText>
        </View>
      )}
    </Animated.View>
  );
};

export default DropdownListItem;

const styles = StyleSheet.create({});

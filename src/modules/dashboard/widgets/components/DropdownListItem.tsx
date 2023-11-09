import React, { ReactNode } from 'react';
import { width } from '../../../../utils/sizes';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Color from 'color';
import colors from '../../../../utils/colors';

interface IDropdownListItem {
  index: number;
  itemsCount: number;
  isExpanded: SharedValue<boolean>;
  heightOfDropdown: SharedValue<number>;
  children: ReactNode;
}

const DropdownListItem = ({
  index,
  itemsCount,
  isExpanded,
  heightOfDropdown,
  children,
}: IDropdownListItem) => {
  const DD_HEIGHT = 80;
  const MARGIN = 10;
  const MAX_HEIGHT_OF_DD = itemsCount * (DD_HEIGHT + MARGIN);

  const defaultTop = -DD_HEIGHT;
  const collapsedTop = MAX_HEIGHT_OF_DD / 2 - DD_HEIGHT;
  const expandedTop = (DD_HEIGHT + MARGIN) * index - DD_HEIGHT;

  const expandedScale = 1;
  const collapsedScale = 1 - index * 0.09;
  const isHeader = index === 0;

  const expandedBGC = colors.SECONDARY_GRAY;
  const collapsedBGC = Color(expandedBGC)
    .lighten(index * 0.7)
    .hex();

  const limitItems = index > 4;

  const rStyle = useAnimatedStyle(() => {
    const displayValue = limitItems ? 'none' : 'flex';
    const backgroundColor = withTiming(isExpanded.value ? expandedBGC : collapsedBGC);
    const topValue = withSpring(isExpanded.value ? expandedTop : defaultTop, {
      damping: 15,
    });
    const scaleValue = withSpring(isExpanded.value ? expandedScale : collapsedScale);

    return {
      display: displayValue,
      backgroundColor,
      top: topValue,
      transform: [{ scale: scaleValue }, { translateY: collapsedTop }],
    };
  }, []);

  const manipulateWithDropdown = () => {
    if (!isHeader) return;
    const isCollapsed = isExpanded.value;

    isExpanded.value = !isCollapsed;
    const dropdownHeight = isCollapsed ? DD_HEIGHT : DD_HEIGHT * itemsCount + MARGIN * 2;
    heightOfDropdown.value = dropdownHeight;
  };

  return (
    <Animated.View
      onTouchEnd={manipulateWithDropdown}
      style={[
        rStyle,
        {
          zIndex: itemsCount - index,
          position: 'absolute',
          width: width * 0.95,
          height: 80,
          borderRadius: 10,
          justifyContent: 'center',
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default DropdownListItem;

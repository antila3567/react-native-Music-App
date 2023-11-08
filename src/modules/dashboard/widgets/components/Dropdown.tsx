import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../../../../utils/colors';
import DropdownListItem from './DropdownListItem';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { log } from '../../../../utils/log';

interface IDropdown {
  header: { label: string; isHeader: true };
  options: { label: string }[];
}

const Dropdown = ({ header, options }: IDropdown) => {
  const dropdownItems = [header, ...options];

  const isExpanded = useSharedValue(false);
  const heightOfDropdown = useSharedValue(80);
  console.log('heightOfDropdown', heightOfDropdown);

  const rs = useAnimatedStyle(() => {
    return {
      height: withTiming(heightOfDropdown.value),
    };
  }, []);

  return (
    <Animated.View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        },
        rs,
      ]}
    >
      {dropdownItems.map((el, i) => {
        return (
          <DropdownListItem
            heightOfDropdown={heightOfDropdown}
            isExpanded={isExpanded}
            key={i}
            el={el}
            index={i}
            dropdownItemsCount={dropdownItems.length}
          />
        );
      })}
    </Animated.View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({});

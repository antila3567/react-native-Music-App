import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import React from 'react';
import DropdownListItem from './DropdownListItem';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import BaseText from './BaseText';
import { Image } from 'react-native';

interface IElement {
  label?: string;
  author?: string;
  name?: string;
  avatar?: ImageSourcePropType;
  isHeader?: boolean;
}

interface IDropdown {
  header: { label: string };
  options: IElement[];
}

const Dropdown = ({ header, options }: IDropdown) => {
  const dropdownItems = [header, ...options];
  const isExpanded = useSharedValue(false);
  const heightOfDropdown = useSharedValue(80);

  const rs = useAnimatedStyle(() => {
    return {
      height: withTiming(heightOfDropdown.value),
    };
  }, []);

  return (
    <Animated.View style={[styles.dropdownBlock, rs]}>
      {dropdownItems.map((el: IElement, i: number) => {
        const isHeader = i == 0;
        return (
          <DropdownListItem
            heightOfDropdown={heightOfDropdown}
            isExpanded={isExpanded}
            key={i}
            index={i}
            itemsCount={dropdownItems.length}
          >
            {isHeader ? (
              <View style={styles.itemCard}>
                <BaseText textStyle={styles.headerLabel}>{el.label}</BaseText>
              </View>
            ) : (
              <View style={styles.itemCard}>
                <Image source={el.avatar} style={styles.trackImg} />
                <BaseText>{el.name}</BaseText>
                <BaseText>{el.author}</BaseText>
              </View>
            )}
          </DropdownListItem>
        );
      })}
    </Animated.View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerLabel: {
    fontWeight: '600',
  },
  trackImg: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  dropdownBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

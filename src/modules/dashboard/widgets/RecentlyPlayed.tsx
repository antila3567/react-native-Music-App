import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import BaseText from '../../../common/baseComponents/BaseText';
import { hp } from '../../../utils/sizes';
import colors from '../../../utils/colors';
import { lastPlayed } from '../../../mock/lastPlayed';
import Animated, { SlideInRight } from 'react-native-reanimated';

interface IData {
  name: string;
  avatar: ImageSourcePropType;
  author: string;
}

const RecentlyPlayed = () => {
  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    setData(lastPlayed);
  }, []);

  if (data.length === 0) return null;

  return (
    <View>
      <View style={styles.widgetHeader}>
        <BaseText textStyle={styles.label}>Recently played</BaseText>
        <BaseText textStyle={styles.seeMoreBtn}>see more... </BaseText>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((el, i) => (
          <Animated.View
            entering={SlideInRight.duration(700)}
            key={i}
            style={styles.lastPlayedTrackCard}
          >
            <Image source={el.avatar} style={styles.trackImage} />
            <View>
              <BaseText textStyle={styles.trackTitle}>{el.name}</BaseText>
              <BaseText textStyle={styles.author}>{el.author}</BaseText>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecentlyPlayed;

const styles = StyleSheet.create({
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  label: {
    fontSize: hp(1.9),
    fontWeight: '600',
    marginVertical: 10,
  },
  seeMoreBtn: {
    fontSize: hp(1.5),
    color: colors.MAIN_GRAY,
  },
  trackImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  lastPlayedTrackCard: {
    marginLeft: 10,
  },
  author: {
    color: colors.MAIN_GRAY,
    fontSize: hp(1.6),
  },
  trackTitle: {
    fontSize: hp(1.9),
    marginVertical: 5,
  },
});

import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Easing } from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';
import BaseText from '../../../common/baseComponents/BaseText';
import { ImageSourcePropType } from 'react-native';
import { hp } from '../../../utils/sizes';
import { followedArtists } from '../../../mock/followedArtists';
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated';

interface IData {
  name: string;
  avatar: ImageSourcePropType;
}

const FollowedArtist = (): ReactElement | null => {
  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    setData(followedArtists);
  }, []);

  if (data.length == 0) return null;

  return (
    <View>
      <BaseText textStyle={styles.label}>Followed Artists</BaseText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((el, i) => (
          <Animated.View entering={SlideInRight.duration(700)} key={i}>
            <TouchableOpacity style={styles.artistCard}>
              <Image source={el.avatar} style={styles.avatar} />
              <BaseText textStyle={styles.artistName}>{el.name}</BaseText>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: hp(1.9),
    fontWeight: '600',
    marginVertical: 20,
    marginLeft: 10,
  },
  artistCard: {
    marginLeft: 10,
    marginRight: 15,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  artistName: {
    fontSize: hp(1.5),
    marginTop: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default React.memo(FollowedArtist);

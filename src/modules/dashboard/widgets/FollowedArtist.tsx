import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Easing } from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';
import BaseText from '../../../common/baseComponents/BaseText';
import { ImageSourcePropType } from 'react-native';
import { hp } from '../../../utils/sizes';
import { followedArtists } from '../../../mock/followedArtists';
import Animated, {
  SharedTransition,
  SlideInLeft,
  SlideInRight,
  withSpring,
} from 'react-native-reanimated';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IData {
  name: string;
  avatar: ImageSourcePropType;
  id: number;
}

type StackParamList = {
  ArtistProfileScreen: { artistId: number };
};

type ProfileScreenNavigationProp<T extends ParamListBase> = NativeStackNavigationProp<
  T,
  'ArtistProfileScreen'
>;

const FollowedArtist = (): ReactElement | null => {
  const [data, setData] = useState<IData[]>([]);
  const navigation = useNavigation<ProfileScreenNavigationProp<StackParamList>>();

  const goToArtistProfile = (id: number) =>
    navigation.navigate('ArtistProfileScreen', {
      artistId: id,
    });

  useEffect(() => {
    setData(followedArtists);
  }, []);

  if (data.length == 0) return null;

  const customTransition = SharedTransition.custom((values) => {
    'worklet';
    return {
      height: withSpring(values.targetHeight),
      width: withSpring(values.targetWidth),
      originX: withSpring(values.targetOriginX),
      originY: withSpring(values.targetOriginY),
    };
  });

  return (
    <View>
      <BaseText textStyle={styles.label}>Followed Artists</BaseText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((el, i) => (
          <Animated.View entering={SlideInRight.duration(700)} key={el.id}>
            <TouchableOpacity onPress={() => goToArtistProfile(el.id)} style={styles.artistCard}>
              <Animated.Image
                // sharedTransitionTag={`artistImgTag-${el.id}`}
                source={el.avatar}
                style={styles.avatar}
              />
              <Animated.Text
                // sharedTransitionTag={`artistName-${el.id}`}
                style={styles.artistName}
              >
                {el.name}
              </Animated.Text>
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
    color: '#fff',
  },
});

export default React.memo(FollowedArtist);

import React from 'react';
import Container from '../../common/baseComponents/Container';
import FollowedArtist from './widgets/FollowedArtist';
import BaseText from '../../common/baseComponents/BaseText';
import { hp } from '../../utils/sizes';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import AvatarIcon from '../../assets/images/musicians/scott.webp';
import colors from '../../utils/colors';
import RecentlyPlayed from './widgets/RecentlyPlayed';
import RecomendedTracks from './widgets/RecomendedTracks';
import LatestReleases from './widgets/LatestReleases';

const Dashboard = () => {
  return (
    <Container>
      <View style={styles.headerBlock}>
        <BaseText textStyle={styles.greeting}>Welcome back 🌟</BaseText>
        <Image source={AvatarIcon} style={styles.avatar} />
      </View>
      <ScrollView>
        <LatestReleases />
        <FollowedArtist />
        <RecentlyPlayed />
        <RecomendedTracks />
      </ScrollView>
    </Container>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  greeting: {
    fontSize: hp(2.6),
    fontWeight: '700',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.MAIN_GREEN,
  },
  headerBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

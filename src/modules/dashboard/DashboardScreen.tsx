import React, { useState } from 'react';
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
import Toast from '../../common/baseComponents/Toast';

const DashboardScreen = () => {
  const [messages, setMessages] = useState([{ id: 1, message: 'Some toast message' }]);

  const removeMsg = (id: number) => {
    setMessages((prevState) => prevState.filter((el) => el.id !== id));
  };

  const addMessage = () => {
    setMessages((prevState) => [
      ...prevState,
      { id: Math.floor(Math.random() * 1000), message: 'text' },
    ]);
  };

  return (
    <Container>
      <Toast messages={messages} removeMsg={removeMsg} />
      <View style={styles.headerBlock}>
        <BaseText textStyle={styles.greeting}>Welcome back 🌟</BaseText>
        <Image source={AvatarIcon} style={styles.avatar} />
      </View>
      <ScrollView>
        <LatestReleases />
        <FollowedArtist />
        <RecentlyPlayed addMessage={addMessage} />
        <RecomendedTracks />
      </ScrollView>
    </Container>
  );
};

export default DashboardScreen;

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
    paddingVertical: 10,
  },
});

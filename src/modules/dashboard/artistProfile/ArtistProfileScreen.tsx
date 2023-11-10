import {
  ActivityIndicator,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Container from '../../../common/baseComponents/Container';
import BaseText from '../../../common/baseComponents/BaseText';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { followedArtists } from '../../../mock/followedArtists';
import Animated, {
  FadeIn,
  FadeOut,
  SharedTransition,
  SlideInDown,
  SlideInUp,
  withSpring,
} from 'react-native-reanimated';
import { hp, width } from '../../../utils/sizes';
import colors from '../../../utils/colors';

interface ParamList<T> {
  key: string;
  name: string;
  path: string;
  params: T;
}

interface IArtist {
  id: number;
  avatar: ImageSourcePropType;
  name: string;
}

const ArtistProfileScreen = () => {
  const { params } = useRoute<ParamList<{ artistId: number }>>();
  const [artistData, setArtistData] = useState<IArtist>();
  const navigation = useNavigation();

  useEffect(() => {
    if (params.artistId) {
      const getArtist = followedArtists.find((el) => el.id === params.artistId);
      setArtistData(getArtist);
    }
  }, [params.artistId]);

  if (!artistData) {
    return (
      <Container viewStyle={{ justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={'#fff'} />
      </Container>
    );
  }

  return (
    <Container withSafeArea>
      <Animated.Image
        source={artistData.avatar}
        style={styles.artistImg}
        entering={FadeIn.duration(1000)}
        // sharedTransitionTag={`artistImgTag-${artistData.id}`}
      />
      <Animated.Text
        //   sharedTransitionTag={`artistName-${artistData.id}`}
        style={styles.artistName}
      >
        {artistData.name}
      </Animated.Text>
      <BaseText textStyle={styles.description}>
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
        aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
        dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
        consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
        molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
      </BaseText>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.addBtn}>
        <Text style={styles.addBtnLabel}>FOLLOW</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default ArtistProfileScreen;

const styles = StyleSheet.create({
  artistImg: {
    width: width,
    height: 300,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  artistName: {
    fontSize: hp(3),
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '700',
    color: '#fff',
  },
  description: {
    fontSize: hp(1.9),
    marginTop: 20,
    fontWeight: '500',
    marginLeft: 20,
  },
  addBtn: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: colors.MAIN_GREEN,
    padding: 15,
    borderRadius: 12,
    width: width - 40,
    marginLeft: 20,
    alignItems: 'center',
  },
  addBtnLabel: {
    fontWeight: '700',
  },
});

import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import BaseText from '../../../common/baseComponents/BaseText';
import { hp } from '../../../utils/sizes';
import colors from '../../../utils/colors';
import { lastPlayed } from '../../../mock/lastPlayed';
import DownloadIcon from '../../../assets/icons/download.png';

interface IData {
  name: string;
  avatar: ImageSourcePropType;
  author: string;
}

const RecomendedTracks = () => {
  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    setData([...lastPlayed, ...lastPlayed, ...lastPlayed]);
  }, []);

  if (data.length === 0) return null;
  return (
    <View>
      <View style={styles.widgetHeader}>
        <BaseText textStyle={styles.label}>Recommended played</BaseText>
        <BaseText textStyle={styles.seeMoreBtn}>see more... </BaseText>
      </View>

      <ScrollView>
        {data.map((el, i) => (
          <View key={i} style={styles.trackCard}>
            <Image style={styles.trackImg} source={el.avatar} />
            <View style={styles.metaBlock}>
              <View>
                <BaseText textStyle={styles.trackTitle}>{el.name}</BaseText>
                <BaseText textStyle={styles.author}>{el.author}</BaseText>
              </View>
              <Image source={DownloadIcon} style={styles.downloadIcon} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecomendedTracks;

const styles = StyleSheet.create({
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 20,
  },
  label: {
    fontSize: hp(1.9),
    fontWeight: '600',
  },
  seeMoreBtn: {
    fontSize: hp(1.5),
    color: colors.MAIN_GRAY,
  },
  trackImg: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 20,
  },
  trackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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
  downloadIcon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  metaBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
});

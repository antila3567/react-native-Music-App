import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import useRenderCount from '../../hooks/useRenderCount';
import Container from '../../common/baseComponents/Container';
import colors from '../../utils/colors';
import BaseText from '../../common/baseComponents/BaseText';
import { hp } from '../../utils/sizes';

const AuthScreen = () => {
  const renderCount = useRenderCount();
  console.log(renderCount, 'renderCount');

  return (
    <Container viewStyle={styles.container}>
      <BaseText textStyle={styles.title}>Welcome to Music App!</BaseText>
      <BaseText textStyle={styles.title}>
        You need to login before you jump in the world of music
      </BaseText>
    </Container>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: hp(2.8),
  },
});

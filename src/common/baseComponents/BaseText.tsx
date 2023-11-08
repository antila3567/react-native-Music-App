import { StyleSheet, Text, TextStyle, View } from 'react-native';
import React, { ReactElement, ReactNode } from 'react';
import colors from '../../utils/colors';

interface IBaseText {
  textStyle?: TextStyle;
  children: ReactNode;
}

const BaseText = ({ textStyle, children }: IBaseText): ReactElement => {
  return <Text style={[styles.text, textStyle]}>{children}</Text>;
};

export default BaseText;

const styles = StyleSheet.create({
  text: {
    color: colors.MAIN_WHITE,
    fontSize: 17,
  },
});

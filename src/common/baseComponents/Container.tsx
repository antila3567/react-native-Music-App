import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { ReactElement, ReactNode } from 'react';
import colors from '../../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IContainer {
  viewStyle?: ViewStyle;
  children: ReactNode;
  withSafeArea?: boolean;
}

const Container = ({ viewStyle, children, withSafeArea }: IContainer): ReactElement => {
  const Wrapper = withSafeArea ? View : SafeAreaView;
  return <Wrapper style={[styles.container, viewStyle]}>{children}</Wrapper>;
};

export default React.memo(Container);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MAIN_BLACK,
  },
});

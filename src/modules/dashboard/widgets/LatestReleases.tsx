import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BaseText from '../../../common/baseComponents/BaseText';
import Dropdown from './components/Dropdown';
import { lastPlayed } from '../../../mock/lastPlayed';

const header = {
  label: 'Check the latest tracks',
};

const LatestReleases = () => {
  return <Dropdown header={header} options={[...lastPlayed]} />;
};

export default LatestReleases;

const styles = StyleSheet.create({});

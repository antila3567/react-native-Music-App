/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
export * from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  renderer.create(<App />);
});

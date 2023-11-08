import { Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export { wp, hp };

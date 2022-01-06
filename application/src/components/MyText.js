import { Text } from 'react-native';
import colors from '../theme/colors';

export default (props) => (
  <Text {...props} style={[{ fontFamily: 'HSRegular', color: colors.text }, props.style]}>
    {props.children}
  </Text>
);

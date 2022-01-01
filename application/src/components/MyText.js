import { Text } from 'react-native';

export default (props) => (
  <Text {...props} style={[{ fontFamily: 'HansSans' }, props.style]}>
    {props.children}
  </Text>
);

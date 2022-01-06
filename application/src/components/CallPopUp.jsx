import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import { phoneNumber } from '../assets/const-info';

export default function CallPopUp() {
  return (
    <View style={styles.callPopUp}>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(`tel:${phoneNumber}`);
        }}
      >
        <Ionicons name='ios-call' size={30} color={colors.textLight} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.point1,
  },
  callPopUp: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 10,
    width: 60,
    aspectRatio: 1,
    borderRadius: 1000,
    backgroundColor: colors.point1,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

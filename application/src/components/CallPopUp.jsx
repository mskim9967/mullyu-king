import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import axiosInstance from '../axios-instance';

export default function CallPopUp() {
  const [phoneNumber, setPhoneNumber] = useState();

  useEffect(async () => {
    const res = await axiosInstance.get('/storeInfo/phoneNumber');
    setPhoneNumber(res.data.phoneNumber);
  }, []);

  return (
    <TouchableOpacity
      style={styles.callPopUp}
      onPress={async () => {
        Linking.openURL(`tel:${phoneNumber}`);
      }}
    >
      <Ionicons name='ios-call' size={30} color={colors.textLight} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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

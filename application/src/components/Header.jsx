import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import Text from '../components/MyText';
import colors from '../theme/colors';

export default function Header() {
  return (
    <View style={styles.Box}>
      <Text> Header</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Box: {
    width: '100%',
    height: 40,
    backgroundColor: colors.point1,
    alignItems: 'center',
    justifyContent: 'center',

    // shadowColor: '#000000',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.5,
    // shadowRadius: 10,
    // elevation: 7,
  },
});

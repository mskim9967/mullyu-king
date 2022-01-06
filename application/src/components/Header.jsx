import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Text from '../components/MyText';
import colors from '../theme/colors';
import { useRoute } from '@react-navigation/native';

export default function Header({ navigation }) {
  const route = useRoute();
  return (
    <View style={styles.Box}>
      {route.name === 'ItemSearch' ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='ios-arrow-back-outline' size={20} color={colors.textLight} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('ItemSearch')}>
          <Ionicons name='ios-search' size={20} color={colors.textLight} />
        </TouchableOpacity>
      )}
      <Text style={{ color: colors.textLight }}> 물류킹</Text>
      <TouchableOpacity>
        <Ionicons name='ios-earth' size={20} color={colors.textLight} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Box: {
    position: 'relative',
    width: '100%',
    height: 40,
    backgroundColor: colors.point1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,

    // shadowColor: '#000000',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.5,
    // shadowRadius: 10,
    // elevation: 7,
  },
});

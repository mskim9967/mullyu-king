import { Pressable, StyleSheet, TouchableOpacity, View, Platform, Image, Text, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import { useRoute } from '@react-navigation/native';
import imgSrc from '../assets/images/logo_outline_s.png';
import { INTRO_URL, zz } from '@env';

export default function Header({ navigation }) {
  const route = useRoute();
  return (
    <View style={styles.Box}>
      {route.name === 'ItemSearch' ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='ios-arrow-back-outline' size={25} color={colors.textLight} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('ItemSearch')}>
          <Ionicons name='ios-search' size={24} color={colors.textLight} />
        </TouchableOpacity>
      )}
      <View>
        <Image
          source={imgSrc}
          style={{
            resizeMode: 'contain',
            height: Platform.OS === 'ios' ? 40 : 45,
            width: 100,
          }}
        />
      </View>
      <TouchableOpacity onPress={() => Linking.openURL(INTRO_URL)}>
        <Ionicons name='ios-earth' size={24} color={colors.textLight} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Box: {
    position: 'relative',
    width: '100%',
    height: Platform.OS === 'ios' ? 45 : 50,
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

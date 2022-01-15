import { Pressable, StyleSheet, TouchableOpacity, View, Platform, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import { useRoute } from '@react-navigation/native';
import imgSrc from '../assets/images/logo_outline_s.png';

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
      <View>
        <Image
          source={imgSrc}
          style={{
            resizeMode: 'contain',
            height: Platform.OS === 'ios' ? 43 : 53,
            width: 100,
          }}
        />
      </View>
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
    height: Platform.OS === 'ios' ? 45 : 55,
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

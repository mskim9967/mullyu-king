import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import MainNavi from './src/navigation/MainNavi';
import colors from './src/theme/colors';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [fontLoaded] = useFonts({ HansSans: require('./src/assets/fonts/SpoqaHanSansNeo-Regular.ttf') });

  if (!fontLoaded) return null;

  return (
    <SafeAreaProvider>
      {Platform.OS === 'ios' && <StatusBar style='auto' />}
      <SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
        <MainNavi />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.point1,
  },
});

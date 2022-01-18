import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import MainNavi from './src/navigation/MainNavi';
import colors from './src/theme/colors';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import CallPopUp from './src/components/CallPopUp';

export default function App() {
  const [fontLoaded] = useFonts({
    HSRegular: require('./src/assets/fonts/SpoqaHanSansNeo-Regular.ttf'),
    HSBold: require('./src/assets/fonts/SpoqaHanSansNeo-Bold.ttf'),
    HSLight: require('./src/assets/fonts/SpoqaHanSansNeo-Light.ttf'),
    HSThin: require('./src/assets/fonts/SpoqaHanSansNeo-Thin.ttf'),
    HSMedium: require('./src/assets/fonts/SpoqaHanSansNeo-Medium.ttf'),
  });

  if (!fontLoaded) return null;

  return (
    <SafeAreaProvider>
      {Platform.OS === 'ios' && <StatusBar style='auto' />}
      <SafeAreaView edges={['top']} style={styles.container}>
        <NavigationContainer>
          <MainNavi />
          <CallPopUp />
        </NavigationContainer>
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

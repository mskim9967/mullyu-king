import ItemsScreen from '../screens/ItemsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ItemSearchScreen from '../screens/ItemSearchScreen';

const Stack = createStackNavigator();

export default function MainNavi() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name='Items'
          component={ItemsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='ItemSearch'
          component={ItemSearchScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
}

import { StyleSheet, View } from 'react-native';
import Text from '../components/MyText';
import colors from '../theme/colors';

export default function Category(props) {
  return (
    <View style={styles.categoryView}>
      <Text
        numberOfLines={2}
        style={{
          letterSpacing: 1,
          lineHeight: 18,
          fontSize: 16,
          fontFamily: 'HSMedium',
          ...(props.category.id === props.selectedCategoryId && { color: colors.point1 }),
        }}
      >
        {props.category.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryView: {
    width: '100%',
    height: 60,
    padding: 7,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

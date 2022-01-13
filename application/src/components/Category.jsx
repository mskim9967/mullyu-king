import { StyleSheet, View } from 'react-native';
import Text from '../components/MyText';
import colors from '../theme/colors';

export default function Category({ categoryBoxWidth, category, selectedCategoryId }) {
  return (
    <View style={[styles.categoryView, { width: categoryBoxWidth }]}>
      <View
        style={[
          { padding: 6, borderRadius: 7, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
          category.id === selectedCategoryId && { backgroundColor: colors.point1 },
        ]}
      >
        <Text
          numberOfLines={4}
          style={{
            letterSpacing: 1,
            lineHeight: 18,
            fontSize: 16,
            fontFamily: 'HSMedium',
            textAlign: 'center',
            ...(category.id === selectedCategoryId && { color: colors.textLight }),
          }}
        >
          {category.name}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryView: {
    width: '100%',
    padding: 3,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

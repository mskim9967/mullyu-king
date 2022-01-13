import { StyleSheet, View, TouchableOpacity, ScrollView, Dimensions, RefreshControl } from 'react-native';
import Text from '../components/MyText';
import colors from '../theme/colors';
import axiosInstance from '../axios-instance';
import { useState, useEffect, useRef } from 'react';
import Item from '../components/Item';

const categoryBoxWidth = 60;
const itemBoxWidth = Dimensions.get('window').width - categoryBoxWidth;

export default function ItemList({ selectedCategoryId, category, modalActived, setModalActived, setSelectedItem }) {
  const [items, setItems] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (category.id === selectedCategoryId) setReload(true);
  }, [selectedCategoryId]);

  useEffect(async () => {
    if (!reload) return;

    const itemsRes = await axiosInstance.get(category.id === -1 ? '/items/onSale/onDiscount' : `items/onsale/category?id=${category.id}`);
    setItems(itemsRes.data);
    setReload(false);
  }, [reload]);

  return (
    <>
      <View key={category.id} style={styles.itemsView}>
        <Text style={{ fontSize: 25, fontFamily: 'HSBold', margin: 7, marginBottom: 12 }}>{category.name}</Text>

        <ScrollView
          key={category.id}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={reload} onRefresh={() => setReload(true)} />}
        >
          {items.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  setSelectedItem(item);
                  setModalActived(true);
                }}
              >
                <Item item={item} />
              </TouchableOpacity>
            );
          })}
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    width: '100%',
    height: '100%',
  },

  headerWrapper: {
    top: 0,
    position: 'relative',
    zIndex: 10,
  },

  categoriesView: {
    width: categoryBoxWidth,
    backgroundColor: colors.bgLight,
    alignItems: 'center',
    paddingVertical: 10,
  },

  itemsScrollView: {
    width: itemBoxWidth,
    backgroundColor: colors.bgLight,
  },

  itemsView: {
    width: itemBoxWidth,
    height: '100%',
    padding: 10,
  },
});

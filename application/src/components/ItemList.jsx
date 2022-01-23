import { StyleSheet, View, TouchableOpacity, ScrollView, Dimensions, RefreshControl, ActivityIndicator } from 'react-native';
import Text from '../components/MyText';
import colors from '../theme/colors';
import axiosInstance from '../axios-instance';
import { useState, useEffect, useRef } from 'react';
import Item from '../components/Item';
import { useNavigationState } from '@react-navigation/native';

const categoryBoxWidth = 60;
const itemBoxWidth = Dimensions.get('window').width - categoryBoxWidth;

export default function ItemList({ category, modalActived, setModalActived, setSelectedItem }) {
  const [items, setItems] = useState(null);
  const [reload, setReload] = useState(false);
  const [loadOnce, setLoadOnce] = useState(false);
  const state = useNavigationState((state) => state);

  useEffect(async () => {
    if (!loadOnce && state.routeNames[state.index] == category.name) {
      setReload(true);
      setLoadOnce(true);
    }
  }, [state]);

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
        {!loadOnce && <ActivityIndicator size='large' color={colors.point1} style={{ marginTop: 20 }} />}
        <ScrollView
          key={category.id}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={reload} onRefresh={() => setReload(true)} />}
        >
          {items &&
            items.map((item) => {
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
          <View style={{ height: 300 }} />
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
    flex: 1,
    padding: 10,
    backgroundColor: colors.bgLight,
  },
});

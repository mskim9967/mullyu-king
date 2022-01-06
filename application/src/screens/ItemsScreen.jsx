import { StyleSheet, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Image from 'react-native-image-progress';
import Text from '../components/MyText';
import Header from '../components/Header';
import colors from '../theme/colors';
import axiosInstance from '../axios-instance';
import { useState, useEffect, useRef } from 'react';
import Category from '../components/Category';
import Item from '../components/Item';
import ItemModal from '../components/ItemModal';

const categoryBoxWidth = 60;
const itemBoxWidth = Dimensions.get('window').width - categoryBoxWidth;
const modalBorderRadius = 16;

export default function ItemsScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState();

  const [items, setItems] = useState([]);
  const [item, setItem] = useState();
  const itemsScrollViewRef = useRef();

  useEffect(async () => {
    const categoriesRes = await axiosInstance.get('/categories/item');
    setCategories([{ id: 0, name: '특가상품' }, ...categoriesRes.data]);
    setSelectedCategoryIdx(0);

    const itemsRes = await axiosInstance.get('/items/onSale');
    setItems(itemsRes.data);
  }, []);

  useEffect(() => {
    itemsScrollViewRef.current?.scrollTo({ x: itemBoxWidth * selectedCategoryIdx, animated: true });
  }, [selectedCategoryIdx]);

  const [modalFlag, setModalFlag] = useState(false);
  const pullModalStatus = (flag) => {
    setModalFlag(flag);
  };

  return (
    <View style={styles.screenWrapper}>
      <Header navigation={navigation} style={styles.headerWrapper} />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.categoriesView}>
          {categories.map((category, i) => {
            return (
              <TouchableOpacity
                key={category.id}
                onPress={() => {
                  setSelectedCategoryIdx(i);
                }}
              >
                <Category category={category} selectedCategoryId={categories[selectedCategoryIdx]?.id} />
              </TouchableOpacity>
            );
          })}
        </View>
        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.itemsScrollView}
          ref={itemsScrollViewRef}
          scrollEventThrottle={400}
          onMomentumScrollEnd={(e) => {
            setSelectedCategoryIdx(Math.round(e.nativeEvent.contentOffset.x / itemBoxWidth));
          }}
        >
          {categories.map((category) => {
            return (
              <View key={category.id} style={styles.itemsView}>
                <Text style={{ fontSize: 25, fontFamily: 'HSBold', margin: 7, marginBottom: 12 }}>{category.name}</Text>

                <ScrollView key={category.id} showsVerticalScrollIndicator={false}>
                  {items.map((item) => {
                    return (
                      (item.category.id === category.id || (category.name === '특가상품' && item.onDiscount)) && (
                        <TouchableOpacity
                          key={item.id}
                          onPress={() => {
                            setItem(item);
                            setModalFlag(true);
                          }}
                        >
                          <Item item={item} />
                        </TouchableOpacity>
                      )
                    );
                  })}
                  <View style={{ height: 100 }} />
                </ScrollView>
              </View>
            );
          })}
        </ScrollView>
      </View>

      {modalFlag && <ItemModal func={pullModalStatus} item={item}></ItemModal>}
    </View>
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
    padding: 10,
  },
});

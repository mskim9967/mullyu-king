import { StyleSheet, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Text from '../components/MyText';
import Header from '../components/Header';
import colors from '../theme/colors';
import axiosInstance from '../axios-instance';
import { useState, useEffect, useRef } from 'react';
import Category from '../components/Category';
import ItemModal from '../components/ItemModal';
import ItemList from '../components/ItemList';

const categoryBoxWidth = 60;
const itemBoxWidth = Dimensions.get('window').width - categoryBoxWidth;

export default function ItemsScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState();

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const itemsScrollViewRef = useRef();

  useEffect(async () => {
    const categoriesRes = await axiosInstance.get('/categories/item');
    setCategories([{ id: -1, name: '특가상품' }, ...categoriesRes.data]);
    setSelectedCategoryIdx(0);
    const itemsRes = await axiosInstance.get('/items/onSale');
    setItems(itemsRes.data);
  }, []);

  useEffect(() => {
    itemsScrollViewRef.current?.scrollTo({ x: itemBoxWidth * selectedCategoryIdx, animated: true });
  }, [selectedCategoryIdx]);

  const [modalActived, setModalActived] = useState(false);

  return (
    <>
      <View style={styles.screenWrapper}>
        {modalActived && <ItemModal modalActived={modalActived} setModalActived={setModalActived} item={selectedItem}></ItemModal>}

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
            {categories.map((category, i) => {
              return (
                <ItemList
                  key={category.id}
                  selectedCategoryId={categories[selectedCategoryIdx]?.id}
                  modalActived={modalActived}
                  setModalActived={setModalActived}
                  category={categories[i]}
                  setSelectedItem={setSelectedItem}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    width: '100%',
    height: Dimensions.get('window').height,
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

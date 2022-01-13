import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Text from '../components/MyText';
import Header from '../components/Header';
import colors from '../theme/colors';
import axiosInstance from '../axios-instance';
import { useState, useEffect, useRef } from 'react';
import Item from '../components/Item';
import { Ionicons } from '@expo/vector-icons';
import ItemModal from '../components/ItemModal';

export default function ItemSearchScreen({ navigation }) {
  const [searchBarText, setSearchBarText] = useState('');
  const [items, setItems] = useState([]);
  const [item, setItem] = useState();
  const [isLoading, setLoading] = useState(false);
  const [modalActived, setModalActived] = useState(false);

  useEffect(() => {
    setItems([]);
    let timer;
    if (searchBarText) {
      setLoading(true);
      timer = setTimeout(() => {
        axiosInstance.get(`/items/onSale/search?name=${searchBarText}`).then((res) => {
          setItems(res.data);
          setLoading(false);
        });
      }, 1400);
    } else {
      setLoading(false);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [searchBarText]);

  return (
    <View style={styles.screenWrapper}>
      <Header navigation={navigation} style={styles.headerWrapper} />
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Text style={{ fontSize: 25, fontFamily: 'HSBold', marginBottom: 12 }}>상품 검색</Text>
        <View style={styles.searchBar}>
          <Ionicons name='ios-search' size={24} color={colors.text} style={{ marginRight: 10 }} />
          <TextInput style={styles.searchBarText} onChangeText={setSearchBarText} value={searchBarText} placeholder='상품명을 입력하세요' />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading && <ActivityIndicator size='large' color={colors.point1} />}
          {items &&
            items.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setItem(item);
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

      {modalActived && <ItemModal modalActived={modalActived} setModalActived={setModalActived} item={item}></ItemModal>}
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.bgLight,
  },

  headerWrapper: {
    top: 0,
    position: 'relative',
    zIndex: 10,
  },

  searchBar: {
    width: '100%',
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  searchBarText: {
    flex: 1,
  },
});

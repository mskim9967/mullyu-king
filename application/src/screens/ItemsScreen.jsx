import { StyleSheet, View } from 'react-native';
import Text from '../components/MyText';
import Header from '../components/Header';
import colors from '../theme/colors';
import axiosInstance from '../axios-instance';
import { useState, useEffect } from 'react';
const axios = require('axios');

export default function ItemsScreen() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(async () => {
    const res = await axiosInstance.get('/categories/item');
    //const res = await axios.get('http://127.0.0.1:3000/api/categories/item');
    setCategories(res.data);
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <View style={styles.screenWrapper}>
      <Header styles={styles.headerWrapper} />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.categoryBox}></View>
        <View style={styles.itemsBox}>
          {categories.map((e) => {
            return <Text> {e.name}</Text>;
          })}
        </View>
      </View>
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
  },

  categoryBox: {
    width: 80,
    backgroundColor: colors.bgGray,
  },

  itemsBox: {
    flex: 1,
    backgroundColor: colors.bgLight,
  },
});

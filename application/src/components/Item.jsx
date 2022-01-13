import { StyleSheet, View } from 'react-native';
import Image from 'react-native-image-progress';
import Text from '../components/MyText';
import axiosInstance from '../axios-instance';

export default function Item(props) {
  return (
    <View style={styles.itemView}>
      <View style={styles.imageView}>
        <Image
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
          source={{ uri: `${axiosInstance.defaults.baseURL}/static/${props.item.primaryImg?.thumbKey}` }}
        />
      </View>
      <View style={styles.textView}>
        <Text style={{ marginBottom: 6, fontSize: 17, fontFamily: 'HSMedium' }}>{props.item.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: '#666666', ...(props.item.onDiscount && { textDecorationLine: 'line-through' }) }}>
            {props.item.price}원
          </Text>
          {props.item.onDiscount && <Text style={{ fontSize: 14, color: '#ff0000', fontFamily: 'HSBold' }}> → {props.item.discountPrice}원</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemView: {
    flexDirection: 'row',
    width: '100%',
    height: 90,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0.6,
    borderColor: '#d0d0d0',
    // marginBottom: 20,
    // backgroundColor: colors.bgLight,
    // shadowColor: '#000000',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.3,
    // shadowRadius: 3,
    // elevation: 5,
    // borderRadius: 10,
  },

  imageView: {
    aspectRatio: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  textView: {
    justifyContent: 'center',
  },
});

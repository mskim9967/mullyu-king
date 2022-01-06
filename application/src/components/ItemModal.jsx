import { StyleSheet, View, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Animated, Linking } from 'react-native';
import Image from 'react-native-image-progress';
import Text from '../components/MyText';
import colors from '../theme/colors';
import axiosInstance from '../axios-instance';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { phoneNumber } from '../assets/const-info';

const categoryBoxWidth = 60;
const itemImgsBoxWidth = 270;
const modalBorderRadius = 16;

export default function ItemModal({ item, func }) {
  const [modalActived, setModalActived] = useState(true);
  const itemImgsScrollViewRef = useRef();

  useEffect(() => {
    if (modalActived) modalFadeIn();
    func(modalActived);
  }, [modalActived]);

  const modalFadeAnim = useRef(new Animated.Value(0)).current;
  const modalFadeIn = () => {
    Animated.timing(modalFadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const modalFadeOut = () => {
    Animated.timing(modalFadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(({ finished }) => {
      setModalActived(false);
    });
  };

  return (
    <>
      {modalActived && (
        <>
          <TouchableWithoutFeedback
            onPress={() => {
              modalFadeOut();
            }}
          >
            <Animated.View style={{ ...styles.modalBg, opacity: modalFadeAnim }}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <View style={styles.modalHeader}>
                    <Text style={{ color: colors.textLight, fontFamily: 'HSBold', fontSize: 17 }}>{item.name}</Text>
                  </View>
                  <View style={styles.modalDetails}>
                    <Text style={{ marginBottom: 10 }}>{item.description}</Text>
                    <ScrollView
                      pagingEnabled
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={{ width: itemImgsBoxWidth, aspectRatio: 1, marginBottom: 10 }}
                      ref={itemImgsScrollViewRef}
                    >
                      {item.imgs.map((img) => {
                        return (
                          <View key={img.key} style={{ width: itemImgsBoxWidth, aspectRatio: 1 }} onStartShouldSetResponder={() => true}>
                            <Image
                              style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                              source={{ uri: `${axiosInstance.defaults.baseURL}/static/${img.key}` }}
                            />
                          </View>
                        );
                      })}
                    </ScrollView>
                    <View style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'center' }}>
                      {item.imgs.map((img, i) => {
                        return (
                          <View key={img.key} style={{ height: '100%', aspectRatio: 1, marginHorizontal: 3 }} onStartShouldSetResponder={() => true}>
                            <TouchableOpacity
                              onPress={() => {
                                itemImgsScrollViewRef.current?.scrollTo({ x: itemImgsBoxWidth * i, animated: true });
                              }}
                            >
                              <Image
                                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                source={{ uri: `${axiosInstance.defaults.baseURL}/static/${img.key}` }}
                              />
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                  <View style={styles.modalFooter}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontFamily: 'HSBold', fontSize: 13, ...(item.onDiscount && { textDecorationLine: 'line-through' }) }}>
                        ₩ {item.price}
                      </Text>

                      {item.onDiscount && <Text style={{ fontSize: 14, color: '#ff0000', fontFamily: 'HSBold' }}> → ₩ {item.discountPrice}</Text>}
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(`tel:${phoneNumber}`);
                      }}
                    >
                      <View style={styles.modalCallButton}>
                        <Ionicons name='ios-call' size={20} color={colors.textLight} />
                        <Text style={{ color: colors.textLight, fontFamily: 'HSMedium', fontSize: 14 }}>전화 문의</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </TouchableWithoutFeedback>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modalBg: {
    position: 'absolute',
    zIndex: 999,
    elevation: 999,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  modalView: {
    maxWidth: 500,
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: modalBorderRadius,

    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },

  modalHeader: {
    width: '100%',
    height: 50,
    backgroundColor: colors.point1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderTopLeftRadius: modalBorderRadius,
    borderTopRightRadius: modalBorderRadius,
  },
  modalDetails: {
    width: '100%',
    padding: 20,
    justifyContent: 'center',
  },
  modalFooter: {
    width: '100%',
    height: 55,
    backgroundColor: colors.bgGray,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: modalBorderRadius,
    borderBottomRightRadius: modalBorderRadius,
  },
  modalCallButton: {
    width: 100,
    height: '75%',
    borderRadius: 5,
    backgroundColor: colors.point1,
    paddingHorizontal: 7,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

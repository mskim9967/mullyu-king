import { Modal, Platform, StyleSheet, View, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Animated, Linking } from 'react-native';
import Image from 'react-native-image-progress';
import Text from '../components/MyText';
import colors from '../theme/colors';
import axiosInstance from '../axios-instance';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import ImageViewer from 'react-native-image-zoom-viewer';

const modalBorderRadius = 16;

export default function ItemModal({ item, modalActived, setModalActived, itemBoxWidth }) {
  const itemImgsBoxWidth = Math.min(itemBoxWidth, 500) * 0.94;
  const itemImgsScrollViewRef = useRef();
  const [pressedImgIdx, setPressedImgIdx] = useState();
  const [isImgPressed, setImgPressed] = useState(false);
  const [urlList, setUrlList] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  useEffect(async () => {
    const res = await axiosInstance.get('/storeInfo/phoneNumber');
    setPhoneNumber(res.data.phoneNumber);
  }, []);

  useEffect(() => {
    if (modalActived) modalFadeIn();
    const urlList = [];
    item.imgs.map((img) => {
      urlList.push({ url: `${axiosInstance.defaults.baseURL}/static/${img.key}` });
    });
    setUrlList(urlList);
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
        <View style={styles.modalWrap}>
          <Modal visible={isImgPressed} transparent={true}>
            <ImageViewer imageUrls={urlList} onCancel={() => setImagePressed(false)} onClick={() => setPressedImgIdx()} index={pressedImgIdx} />
            <TouchableOpacity
              style={{ position: 'absolute', top: Platform.OS === 'ios' ? 40 : 25, right: 25, zIndex: 100 }}
              onPress={() => setImgPressed(false)}
            >
              <Ionicons name='ios-close' size={32} color='white' />
            </TouchableOpacity>
          </Modal>

          <TouchableWithoutFeedback
            onPress={() => {
              modalFadeOut();
            }}
          >
            <Animated.View style={[styles.modalBg, { opacity: modalFadeAnim }]}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <View style={styles.modalHeader}>
                    <Text style={{ color: colors.textLight, fontFamily: 'HSBold', fontSize: 17 }}>{item.name}</Text>
                    <TouchableOpacity style={{ position: 'absolute', top: 10, right: 12 }} onPress={() => modalFadeOut()}>
                      <Ionicons name='ios-close' size={27} color='white' />
                    </TouchableOpacity>
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
                      {item.imgs.map((img, i) => {
                        return (
                          <View key={img.key} style={{ width: itemImgsBoxWidth, aspectRatio: 1 }} onStartShouldSetResponder={() => true}>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                setPressedImgIdx(i);
                                setImgPressed(true);
                              }}
                            >
                              <Image
                                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                source={{ uri: `${axiosInstance.defaults.baseURL}/static/${img.key}` }}
                              />
                            </TouchableWithoutFeedback>
                          </View>
                        );
                      })}
                    </ScrollView>
                    <View style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'center' }}>
                      {item.imgs.map((img, i) => {
                        return (
                          <View key={img.key} style={{ height: '100%', aspectRatio: 1, marginHorizontal: 3 }} onStartShouldSetResponder={() => true}>
                            {Platform.OS === 'web' ? (
                              <TouchableWithoutFeedback
                                onPress={() => {
                                  itemImgsScrollViewRef.current?.scrollTo({ x: itemImgsBoxWidth * i, animated: true });
                                }}
                              >
                                <Image
                                  style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                  source={{ uri: `${axiosInstance.defaults.baseURL}/static/${img.thumbKey}` }}
                                />
                              </TouchableWithoutFeedback>
                            ) : (
                              <TouchableOpacity
                                onPress={() => {
                                  itemImgsScrollViewRef.current?.scrollTo({ x: itemImgsBoxWidth * i, animated: true });
                                }}
                              >
                                <Image
                                  style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                  source={{ uri: `${axiosInstance.defaults.baseURL}/static/${img.thumbKey}` }}
                                />
                              </TouchableOpacity>
                            )}
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
                      style={styles.modalCallButton}
                    >
                      <Ionicons name='ios-call' size={20} color={colors.textLight} />
                      <Text style={{ color: colors.textLight, fontFamily: 'HSMedium', fontSize: 14 }}>전화 문의</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modalWrap: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 999,
    elevation: 999,
    width: '100%',
    height: '100%',
  },

  modalBg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  modalView: {
    maxWidth: 500,
    width: '90%',
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
    alignItems: 'center',
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

import { StyleSheet, View, Image } from 'react-native';
import Text from '../components/MyText';
import colors from '../theme/colors';

export default function Modal(props) {
  return (
    <>
      {modalActived && (
        <>
          <TouchableWithoutFeedback
            onPress={() => {
              fadeOut();
            }}
          >
            <Animated.View style={{ ...styles.modalBg, opacity: modalFadeAnim }}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <Text>sadadsdsfjsjdsj</Text>
                  <Text>sadadsdsfjsjdsj</Text>
                  <Text>sadadsdsfjsjdsj</Text>
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

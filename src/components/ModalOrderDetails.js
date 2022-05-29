import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Alert,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectModal, openOrClose} from '../redux/orderDetailSlide';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../common/Color';
import {selectAllProduct} from '../redux/orderDetailSlide';
import OrderDetail from './OrderDetail';

export default ModalOrderDetails = () => {
  const modalVisible = useSelector(selectModal);
  const arrProduct = useSelector(selectAllProduct);

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Text>Lịch sử đơn hàng</Text>
          <Ionicons
            name="chevron-forward-outline"
            style={{fontSize: 20, paddingStart: 10, alignSelf: 'flex-end'}}
          />
        </TouchableOpacity>
        <ScrollView>
          {arrProduct.map((item, index) => (
            <View key={index}>
              <OrderDetail item={item} />
            </View>
          ))}
        </ScrollView>
        <BtnClose />
      </View>
    </Modal>
  );
};

const BtnClose = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(openOrClose());
  };
  return (
    <TouchableOpacity onPress={closeModal} style={styles.closeBtn}>
      <Ionicons
        name="close-circle"
        style={{fontSize: 50, color: COLORS.custom}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 10,
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    elevation: 5,
    height: '95%',
  },
  closeBtn: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignSelf: 'center',
    bottom: 15,
    transparent: true,
  },
});

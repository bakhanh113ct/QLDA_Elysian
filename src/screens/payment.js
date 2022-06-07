import {View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import HeaderPayment from '../components/HeaderPayment';
import AddressPayment from '../components/AddressPayment';
import PaymentDetail from '../components/PaymentDetail';
import TotalPayment from '../components/TotalPayment';
import fireAuth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {setValue, setSelected, selectCompleted} from '../redux/addressSlice';
import AlertCompleted from '../components/AlertCompleted';
import CalculatePayment from '../components/CalculatePayment';
import Loading from '../components/Loading';
import ChooseTime from '../components/ChooseTime';

const Payment = () => {
  const dispatch = useDispatch();
  const completed = useSelector(selectCompleted);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const loadAddress = () => {
      firestore()
        .collection('Addresses')
        .where('userID', '==', fireAuth().currentUser.uid)
        .where('selected', '==', true)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            dispatch(setValue(documentSnapshot.data()));
            dispatch(setSelected(documentSnapshot.data().idAddress));
          });
        });
    };
    loadAddress();
  }, []);

  return (
    <>
      <View style={{flex: 1}}>
        <HeaderPayment />
        <View style={{flex: 7}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AddressPayment />
            <PaymentDetail />
            <CalculatePayment />
          </ScrollView>
        </View>
        <TotalPayment />
        <AlertCompleted />
      </View>
      {completed && (
        <Loading
          uri={require('../assets/107573-llove-you.json')}
          title="Đang xử lý..."
        />
      )}
      <ChooseTime />
    </>
  );
};

export default Payment;

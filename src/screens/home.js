import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
  SafeAreaView,
  LogBox,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Swiper from 'react-native-swiper';
import auth from '@react-native-firebase/auth';
// import {keyExtractor} from 'react-native/Libraries/Lists/VirtualizeUtils';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SharedElement} from 'react-navigation-shared-element';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import ItemBanner from '../components/itemBanner';
import ItemProduct from '../components/itemProduct';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');
const Home = ({navigation}) => {
  const navigator = useNavigation();
  const [notificationNum, setNotiNum] = useState('0');
  // console.log('first');
  // const [text, setText] = useState('gggg');
  // const [rerender, SetRerender] = useState(false);
  const [databanner, setDatabanner] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);
  const getData = async () => {
    const listBanner = [];
    const listProduct = [];
    await firestore()
      .collection('Banners')
      .get()
      .then(querySnapshot => {
        // console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          listBanner.push(documentSnapshot.data());
          // console.log(documentSnapshot.data());
        });
        setDatabanner(listBanner);
      });
    await firestore()
      .collection('Products')
      .limit(5)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          listProduct.push(documentSnapshot.data());
          // console.log(documentSnapshot.data());
        });
        setDataProducts(listProduct);
      });
  };
  const getCountNewNotification = async () => {
    await firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .onSnapshot(doc => {
        try {
          const data = Object.values(doc.data().Notifications);
          const count = data.filter(value => value === true).length;
          // console.log(count)
          setNotiNum(count);
        } catch (error) {
          setNotiNum(0);
        }
      });
  };
  useEffect(() => {
    getData();
    getCountNewNotification();
  }, []);

  return (
    <View style={styles.container} nestedScrollEnabled={false}>
      <View style={styles.header}>
        <Image
          source={require('../assets/coffee-cup.png')}
          style={styles.imageLogo}
        />
        <Text style={styles.txtHeader}>
          Xin chào, {auth().currentUser.displayName}
        </Text>
        <View style={styles.notificationContainer}>
          <Icon
            name="bell"
            size={28}
            onPress={() => navigator.navigate('Notification')}
          />
          <View style={styles.NotiNum}>
            <Text style={styles.txtNotiNum}>{notificationNum}</Text>
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 15}}>
        <Text style={styles.txtBST}>Bộ sưu tập</Text>
        <View style={styles.slider}>
          <Swiper
            activeDotColor="white"
            dotStyle={{marginTop: 40}}
            activeDotStyle={{marginTop: 40}}
            style={{height: width / 2 + 22}}
            autoplay={true}
            autoplayTimeout={3}
            loop={true}
            key={1}>
            {databanner.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => {
                    navigator.navigate('Banner', {item: item});
                  }}>
                  <Image
                    // key={index}
                    style={{
                      borderRadius: 20,
                      // flex: 1,
                      width: width - 30,
                      height: width / 2,
                      resizeMode: 'contain',
                    }}
                    source={{uri: item.image}}
                    // resizeMethod='resize'
                  />
                </TouchableWithoutFeedback>
              );
            })}
          </Swiper>
        </View>
        <Text style={styles.txtSuggest}>Gợi ý riêng cho bạn</Text>
        <View>
          {dataProducts.map((item, index) => {
            return <ItemProduct item={item} key={index} />;
          })}
        </View>
        <Text style={styles.txtDiscover}>Khám phá thêm</Text>
        <View
          style={styles.Banner}>
          {databanner.map((item, index) => {
            return (
              <ItemBanner item={item} navigation={navigation} key={index} />
            );
          })}
        </View>
        {/* <View>
          <Text>ác</Text>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 100,
  },
  header: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  txtHeader: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 5,
  },
  imageLogo: {
    marginHorizontal: 5,
    width: 30,
    height: 30,
  },
  notificationContainer: {
    position: 'absolute',
    right: 15,
  },
  NotiNum: {
    backgroundColor: 'red',
    height: 15,
    width: 15,
    borderRadius: 7.5,
    position: 'absolute',
    left: 14,
    top: 0,
  },
  txtNotiNum: {
    fontSize: 10,
    alignSelf: 'center',
    color: 'white',
    fontWeight: '500',
  },
  txtBST: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
  },
  slider: {
    flex: 1,
    paddingVertical: 20,
  },
  txtSuggest: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  txtDiscover: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 40,
    color: 'black',
  },
  Banner: {
    // flex: 2,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: -5,
  }
});

import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from '../styles/View.Payment.container';
import NumberFormat from 'react-number-format';

const ProductPayment = ({item}) => {
  return (
    <View style={styles.productPayment}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <Image
            source={{uri: item.product.linkImage}}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingStart: 15}}>
          <Text style={styles.textColor}>
            x{item.count} {item.product.name}
          </Text>
          <Text>
            Kích cỡ: <Text style={styles.textColor}> {item.size.name}</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.textColor, {fontWeight: '500'}]}>
        <NumberFormat
          value={parseInt(item.total)}
          displayType="text"
          thousandSeparator
          suffix="đ"
          renderText={value => <Text>{value}</Text>}
        />
      </Text>
    </View>
  );
};

export default ProductPayment;

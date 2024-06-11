import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import React from 'react';

export default ({
  label = '',
  source = require('../../assets/house-keeper.png'),
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity style={styles.categoryHeaderContainer} onPress={onPress}>
      <Image
        source={source}
        resizeMode={'stretch'}
        style={styles.categoryImage}
      />
      <Text style={styles.categoryLabel}>{label}</Text>
      {/* <View style={styles.categoryLabelContainer}>
        {label.length > 6 ? (
          <Text style={styles.longCategoryLabel}>{label}</Text>
        ) : (
          <Text style={styles.shortCategoryLabel}>{label}</Text>
        )}
      </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryHeaderContainer: {
    alignItems: 'center',
    paddingRight: rf(2),
  },
  categoryImage: {
    borderRadius: 14,
    width: rw(30),
    height: rh(10),
  },
  categoryLabel: {
    color: '#4B4B4B',
    fontSize: rf(1.5),
    marginRight: rw(1),
    flex: 1,
  },
  longCategoryLabel: {
    color: '#4B4B4B',
    fontSize: 12,
  },
  shortCategoryLabel: {
    color: '#4B4B4B',
    fontSize: 12,
  },
  categoryLabelContainer: {},
});

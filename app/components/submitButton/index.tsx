import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
export default ({onPress = () => {}, title = '', disabled = false}) => {
  return (
    <TouchableOpacity
      style={[styles.submitButton, {opacity: disabled ? 0.5 : 1}]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.submmitButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    alignItems: 'center',
    backgroundColor: '#FF3131',
    borderRadius: rw(1.25),
    padding: rw(4),
    marginHorizontal: rw(6),
    shadowColor: '#FF31311A',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: rh(0.5),
    },
    shadowRadius: rw(1),
    elevation: 4,
  },
  submmitButtonText: {
    color: '#FFFFFF',
    fontSize: rf(2.25),
    fontWeight: 'bold',
  },
});

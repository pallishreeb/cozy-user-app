import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {monitorNetworkStatus} from '../../redux/slices/networkSlice';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';

const ConnectionErrorScreen: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const retryConnection = () => {
    dispatch(monitorNetworkStatus());
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/no-internet.png')}
        style={styles.image}
      />
      <Text style={styles.errorText}>No Internet Connection</Text>
      <TouchableOpacity style={styles.button} onPress={retryConnection}>
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: rw(60),
    height: rh(30),
    marginBottom: rh(5),
    backgroundColor: '#fff', // Ensures the background is white
  },
  errorText: {
    fontSize: rf(2.5),
    marginBottom: rh(2),
    color: 'red',
  },
  button: {
    backgroundColor: '#FF3131',
    paddingVertical: rh(1.5),
    paddingHorizontal: rw(8),
    borderRadius: rw(2),
  },
  buttonText: {
    color: '#fff',
    fontSize: rf(2),
  },
});

export default ConnectionErrorScreen;

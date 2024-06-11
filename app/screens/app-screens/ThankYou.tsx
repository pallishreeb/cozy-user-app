import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import CustomHeader from '../../components/customHeader';
import {AppStackParamList} from '../../navigations/app-navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type ThankYouScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'ThankYou'
>;
const ThankYou = ({navigation}: ThankYouScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('MyTabs', {screen: 'Home'});
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        isNotification={true}
        title="Thank You"
        onBackPress={() => navigation.navigate('MyTabs')}
        onNotificationPress={() => navigation.navigate('Notification')}
      />
      <View style={styles.thankYouContainer}>
        <View style={styles.content}>
          <Image
            source={require('../../assets/thank-you.png')}
            style={styles.image}
          />
          <Text style={styles.successText}>Your Booking was Successful</Text>
          <Text
            style={styles.redirectText}
            onPress={() =>
              navigation.navigate('MyTabs', {screen: 'Appointment'})
            }>
            You will be redirected to the home page shortly or{' '}
            <Text style={styles.clickHereText}>click here</Text> to go to My
            Bookings.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('MyTabs', {screen: 'Home'})}>
            <Text style={styles.buttonText}>Go To Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ThankYou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thankYouContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  content: {
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
  image: {
    width: responsiveWidth(50),
    height: responsiveHeight(25),
    marginBottom: responsiveHeight(2.5),
  },
  successText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: responsiveHeight(1.25),
  },
  redirectText: {
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    marginBottom: responsiveHeight(2.5),
  },
  clickHereText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: responsiveHeight(1.875),
    borderRadius: responsiveWidth(1.25),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
});

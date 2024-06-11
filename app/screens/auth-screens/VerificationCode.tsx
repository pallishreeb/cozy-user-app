import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import SubmitButton from '../../components/submitButton';
import OtpInput from '../../components/otpInput';
import {axiosPublic} from '../../utils/axiosConfig';
import {endpoints} from '../../constants';
import {AuthStackParamList} from '../../navigations/auth-navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type VerificationCodeScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'VerificationCode'
>;
export default ({navigation, route}: VerificationCodeScreenProps) => {
  const {email, previousRoute} = route.params;
  const [currentOtp, setCurrentOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPublic.post(`${endpoints.VERIFY_OTP}`, {
        email,
        otp: currentOtp,
      });
      Alert.alert('Info', `Verification Successfull`, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('SignIn'),
        },
      ]);
    } catch (error: Error | any) {
      console.log('inside catch', error?.response);
      Alert.alert(
        'Information',
        `Verification Failed Due To ${error?.response.data.error}  \nPlease try again later`,
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar backgroundColor={'#FF3131'} barStyle="light-content" />
        <View style={styles.formContainer}>
          <View style={styles.mainHeading}>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <AntdIcon name="left" size={25} />
            </TouchableOpacity>
            <Text style={styles.mainHeadingText}>{'Verification Code'}</Text>
          </View>
          <Text style={styles.subHeadingText1}>
            {`Please type the verification code\nsend to  ${email}`}
          </Text>
          <ImageBackground
            source={require('../../assets/auth-image.png')}
            resizeMode={'stretch'}
            style={styles.illustrationImage}>
            <View style={styles.overlayView} />
          </ImageBackground>

          <View style={styles.fieldContainer}>
            <OtpInput setCurrentOtp={setCurrentOtp} />
          </View>
          <View style={styles.submitButtonConatiner}>
            <SubmitButton
              title={isLoading ? 'Verifing' : 'Verify'}
              onPress={handleVerifyOtp}
              disabled={isLoading}
            />
          </View>
          <TouchableOpacity style={styles.resendButton}>
            <Text style={styles.resendButtonText}>Resend Code</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: '#FF3131',
  },
  illustrationImage: {
    paddingHorizontal: rw(0.5),
    marginBottom: rh(2),
    height: rh(20),
    width: rw(40),
    alignSelf: 'center',
  },
  overlayView: {
    width: rw(40),
    height: rh(20),
    borderRadius: rf(30),
    position: 'absolute',
    backgroundColor: '#FF3130',
    opacity: 0.8,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: rw(20),
    borderBottomLeftRadius: rw(20),
    paddingTop: rh(10),
    paddingBottom: rh(6.25),
    marginBottom: rh(3.75),
    height: rh(90),
  },
  mainHeading: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: rh(1.375),
    marginHorizontal: rw(6.25),
    gap: 20,
  },
  mainHeadingText: {
    color: '#FF3131',
    fontSize: rf(6.25),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subHeadingText1: {
    color: '#84868A',
    fontSize: rf(4),
    marginBottom: rh(3.125),
    marginHorizontal: rw(8.75),
  },

  fieldContainer: {
    marginVertical: rh(2.5),
    marginHorizontal: rw(6),
  },
  label: {
    color: '#5B5B5B',
    fontSize: rf(3.5),
    marginBottom: rh(0.625),
    marginHorizontal: rw(2.5),
  },
  submitButtonConatiner: {
    marginBottom: rh(4),
    marginTop: rh(4),
  },
  resendButtonText: {
    textDecorationLine: 'underline',
    color: '#FF3131',
    fontSize: rf(1.9),
  },
  resendButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: rh(2.5),
  },
});

import React, {useEffect, useState} from 'react';
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
import Input from '../../components/input';
import SubmitButton from '../../components/submitButton';
import {axiosPublic} from '../../utils/axiosConfig';
import {endpoints} from '../../constants';
import {AuthStackParamList} from '../../navigations/auth-navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type ForgotPasswordScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'ForgotPassword'
>;
export default ({navigation}: ForgotPasswordScreenProps) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{
    email: string | null;
  }>();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const validateForm = () => {
    let errors: {email: string | null} = {
      email: null,
    };
    // Validate email field
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }

    setErrors(errors);
    const isErrors = errors.email === null;
    setIsFormValid(isErrors);
  };
  const handleSubmit = async () => {
    if (!isFormValid) {
      // Form is invalid, display error messages
      console.log('Form has errors. Please correct them.');
      Alert.alert('Errors', 'Form has errors. Please correct them.');
    }
    try {
      setIsLoading(true);
      const response = await axiosPublic.post(`${endpoints.FORGOT_PASSWORD}`, {
        email,
      });
      // console.log('forgot password response', response?.data);
      Alert.alert('Info', `${response?.data?.message}`, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('ResetPassword', {email}),
        },
      ]);
    } catch (error: Error | any) {
      console.log('inside catch', error?.response);
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
            <Text style={styles.mainHeadingText}>{'Forgot Password'}</Text>
          </View>
          <Text style={styles.subHeadingText1}>
            {'Did someone forgot their password'}
          </Text>
          <ImageBackground
            source={require('../../assets/auth-image.png')}
            resizeMode={'stretch'}
            style={styles.illustrationImage}>
            <View style={styles.overlayView} />
          </ImageBackground>
          <Text style={styles.subHeadingText2}>
            {
              'Just enter the email address you have used to register\nwith us and we’ll send you a reset link!'
            }
          </Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email</Text>
            <Input
              placeholder="johndoe@gmail.com"
              keyboardType="email-address"
              autoCompleteType="email"
              leftIconName="envelope"
              value={email}
              setValue={setEmail}
            />
            <Text style={styles.errorMSg}>{errors?.email}</Text>
          </View>

          <SubmitButton
            title={isLoading ? 'Submitting' : 'Submit'}
            onPress={handleSubmit}
            disabled={!isFormValid || isLoading}
          />
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
    width: rw(43),
    alignSelf: 'center',
  },
  overlayView: {
    width: rw(43),
    height: rh(20),
    borderRadius: rf(4),
    position: 'absolute',
    backgroundColor: '#FF3130',
    opacity: 0.8,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: rw(20),
    borderBottomLeftRadius: rw(20),
    paddingTop: rh(10),
    paddingBottom: rh(6),
    marginBottom: rh(4),
    height: rh(90),
  },
  mainHeading: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: rh(1.5),
    marginHorizontal: rw(6),
    gap: rw(5),
  },
  mainHeadingText: {
    color: '#FF3131',
    fontSize: rf(3.1),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subHeadingText1: {
    color: '#84868A',
    fontSize: rf(2),
    marginBottom: rh(3),
    marginHorizontal: rw(9),
  },
  subHeadingText2: {
    color: '#84868A',
    fontSize: rf(1.75),
    marginBottom: rh(1.2),
    marginHorizontal: rw(10),
    width: rw(95),
  },
  fieldContainer: {
    marginVertical: rh(2.5),
    marginHorizontal: rw(6),
  },
  label: {
    color: '#5B5B5B',
    fontSize: rf(1.75),
    marginBottom: rh(0.6),
    marginHorizontal: rw(2.5),
  },
  errorMSg: {
    color: 'red',
    fontSize: rf(1.75),
    marginBottom: rh(1),
  },
});

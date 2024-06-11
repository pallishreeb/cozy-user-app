import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import CustomHeader from '../../components/customHeader';
import SubmitButton from '../../components/submitButton';
import {axiosPrivate} from '../../utils/axiosConfig';
import {endpoints} from '../../constants';
import ProfileInput from '../../components/profileInput';
import useProfileData from '../../hooks/useProfileData';
import Loader from '../../components/loader';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import {AppStackParamList} from '../../navigations/app-navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type BookServiceScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'BookService'
>;
const BookService = ({navigation, route}: BookServiceScreenProps) => {
  const {providerId, serviceId} = route.params;
  const {profileData, isLoading, error: profileError} = useProfileData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Add one day to get tomorrow
  tomorrow.setHours(9, 0, 0, 0);
  const [date, setDate] = useState(tomorrow);
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined,
  ) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const displayDatePicker = () => {
    setShowDatePicker(true);
  };

  const displayTimePicker = () => {
    setShowTimePicker(true);
  };
  const validateForm = () => {
    let isValid = true;

    if (phone.trim() === '') {
      setPhoneError('Phone number is required');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (address.trim() === '') {
      setAddressError('Address is required');
      isValid = false;
    } else {
      setAddressError('');
    }

    return isValid;
  };
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    const BookingDetails = {
      provider_id: providerId,
      service_id: serviceId,
      user_id: profileData?.id,
      address,
      booking_date: format(date, 'yyyy-MM-dd'),
      booking_time: date,
      mobile_number: phone,
    };
    // console.log(BookingDetails, 'Booking Details');
    setIsSubmitting(true);
    try {
      const response = await axiosPrivate.post(
        `${endpoints.BOOK_SERVICE}`,
        BookingDetails,
      );
      if (response.status === 201) {
        navigation.navigate('ThankYou');
      } else {
        Alert.alert(
          'Error',
          'Something went wrong while processing your request.',
        );
        setAddress('');
        setDate(new Date());
        setPhone('');
      }
      // console.log(response.data, 'Booking Service response');
    } catch (error) {
      console.log(error, 'Booking Service Error');
      Alert.alert(
        'something-went-wrong',
        'An error occurred while processing your request. Please try again later.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isLoading) {
    return <Loader />;
  } else if (profileError || !profileData) {
    return <Text>{profileError || 'An error occurred'}</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        isNotification={false}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('Notification')}
      />
      {isLoading ? (
        <Loader />
      ) : profileError || !profileData ? (
        <Text style={[styles.errorText, {textAlign: 'center'}]}>
          {profileError || 'An error occurred'}
        </Text>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>
            Before Booking ,Provide Some Information
          </Text>

          <Text style={styles.nameLabel}>Name</Text>
          <Text style={styles.nameText}>{profileData?.name}</Text>
          <ProfileInput
            value={phone}
            onChangeText={text => setPhone(text)}
            label="Phone"
            placeholder="Enter Your Contact Number"
          />
          {phoneError ? (
            <Text style={styles.errorText}>{phoneError}</Text>
          ) : null}
          <ProfileInput
            value={address}
            onChangeText={text => setAddress(text)}
            label="Address"
            placeholder="Enter Complete Address"
            multiline={true}
          />
          {addressError ? (
            <Text style={styles.errorText}>{addressError}</Text>
          ) : null}
          <Text style={styles.label}>Select Date</Text>
          <TouchableOpacity
            onPress={displayDatePicker}
            style={styles.dateInput}>
            <Text style={styles.dateText}>{format(date, 'PP')}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
              minimumDate={new Date()}
            />
          )}

          {/* Time Picker */}
          <Text style={styles.label}>Select Time</Text>
          <TouchableOpacity
            onPress={displayTimePicker}
            style={styles.dateInput}>
            <Text style={styles.dateText}>{format(date, 'p')}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={date}
              mode="time"
              is24Hour={false} // Explicitly set to false for AM/PM selection
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(Platform.OS === 'ios');
                if (selectedTime) {
                  setDate(selectedTime);
                }
              }}
            />
          )}

          <View style={styles.buttonContainer}>
            <SubmitButton
              title={isSubmitting ? 'Booking Service' : 'Book Service'}
              disabled={isSubmitting}
              onPress={handleSubmit}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BookService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: rh(2),
  },
  headerText: {
    fontSize: rf(2),
    textTransform: 'uppercase',
    color: '#333',
    fontWeight: 'bold',
    marginLeft: rw(1),
    marginVertical: rh(2),
  },
  buttonContainer: {
    marginVertical: rh(2),
  },
  datePickerInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: rw(2.5),
    marginBottom: rh(1),
    borderRadius: rw(1.2),
    justifyContent: 'center',
    height: rh(6), // Adjust the height as necessary
  },
  datePickerText: {
    fontSize: rf(2),
    color: '#000',
  },
  label: {
    fontSize: rf(2),
    color: '#000',
    marginBottom: rh(1),
    marginLeft: rw(2),
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: rw(2.5),
    marginBottom: rh(1),
    borderRadius: rw(1.2),
    width: '100%',
  },
  dateText: {
    fontSize: rf(2),
  },
  nameText: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: rw(2.5),
    marginBottom: rh(1),
    borderRadius: rw(1.2),
    width: '100%',
    color: '#333',
    fontWeight: '500',
    textAlignVertical: 'top', // Ensures text starts from top
  },
  nameLabel: {
    fontSize: rf(2),
    color: '#000',
    marginBottom: rh(1),
    marginLeft: rw(2),
  },
  errorText: {
    color: 'red',
    fontSize: rf(1.8),
    marginLeft: rw(2),
    marginVertical: rh(0.5),
  },
});

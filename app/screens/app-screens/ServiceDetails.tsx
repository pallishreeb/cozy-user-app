import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import CustomHeader from '../../components/customHeader';
import {useProviderDetails} from '../../hooks/useProviderDetails';
import Loader from '../../components/loader';
import {IMAGE_URL, experience} from '../../constants';
import {WorkingHours} from '../../components/workingHours';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../navigations/app-navigator';
type ServiceDetailsScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'ServiceDetails'
>;
const ServiceDetails = ({navigation, route}: ServiceDetailsScreenProps) => {
  const {providerId} = route.params;
  const {provider, loading, error} = useProviderDetails(providerId);
  const calculateDiscountedPrice = (
    rate: number,
    discountPercentage: number,
  ) => {
    if (!rate || !discountPercentage) return rate;
    const discountFraction = discountPercentage / 100;
    const discountAmount = rate * discountFraction;
    const discountedPrice = rate - discountAmount;
    return discountedPrice.toFixed(2);
  };
  const parseWorkingHours = (workingHoursStr: string) => {
    try {
      const onceParsed = JSON.parse(workingHoursStr);
      const twiceParsed = JSON.parse(onceParsed);
      const thriceParsed = JSON.parse(twiceParsed);
      return thriceParsed;
    } catch (error) {
      console.error('Error parsing working hours:', error);
      return [];
    }
  };
  const originalRate = provider?.rate ? parseFloat(provider.rate) : 0;
  const discountPercentage = provider?.service?.category?.discount
    ? parseFloat(provider.service.category.discount)
    : 0;
  const discountedRate = calculateDiscountedPrice(
    originalRate,
    discountPercentage,
  );
  const fullAddress = `${provider?.address || ''} ${provider?.city} ${
    provider?.state
  }  ${provider?.country}  ${provider?.zipcode}`;
  const serviceName = provider?.service?.name || 'N/A';
  const categoryName = provider?.service?.category?.name || 'N/A';
  const providerProfilePic = provider?.profile_pic
    ? {uri: `${IMAGE_URL}/profile_pic/${provider?.profile_pic}`}
    : require('../../assets/user-placeholder.png');
  const serviceImages = provider?.service?.images;
  const workingHours = provider?.working_hours
    ? parseWorkingHours(provider.working_hours)
    : [];

  const rateValue = (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {discountPercentage > 0 ? (
        <>
          <Text style={{textDecorationLine: 'line-through', marginRight: 4}}>
            ${originalRate}
          </Text>
          <Text style={{fontWeight: 'bold', marginRight: 4}}>
            ${discountedRate}
          </Text>
          <Text>({discountPercentage}% off)</Text>
        </>
      ) : (
        <Text>${originalRate}</Text>
      )}
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        isNotification={false}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('Notification')}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Text style={styles.errorText}>
          {error.message || 'An Unexpected Error  Occurred'}
        </Text>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.detailsContainer}>
            <Image source={providerProfilePic} style={styles.serviceImage} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{provider?.name}</Text>
              <View style={styles.locationRow}>
                <Icon2 name="location-on" size={20} color="#5B5B5B" />
                <Text style={styles.address}>{fullAddress}</Text>
              </View>
              {provider?.mobile_number && (
                <View style={styles.locationRow}>
                  <Icon2 name="phone" size={20} color="#5B5B5B" />
                  <Text style={styles.phone}>{provider?.mobile_number}</Text>
                </View>
              )}

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    // navigation.navigate('BookService', {
                    //   providerId,
                    //   serviceId: provider?.service_id as number,
                    // });
                  }}>
                  <Icon
                    name="calendar-clock-outline"
                    size={24}
                    color={'white'}
                  />
                  <Text style={styles.buttonText}>Book Service</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                style={[styles.button, styles.chatButton]}
                onPress={() => {
                  // navigation.navigate('Chat');
                }}>
                <Icon name="android-messages" size={24} color={'white'} />
                <Text style={styles.buttonText}>Chat</Text>
              </TouchableOpacity> */}
              </View>
            </View>
          </View>
          <View style={styles.simpleDottedLine} />
          <View style={styles.additionalDetails}>
            <DetailCard
              icon="briefcase-outline"
              title="Experience"
              value={
                provider?.experience
                  ? experience[String(provider.experience)]
                  : 'N/A'
              }
            />
            <DetailCard icon="cash" title="Rate" value={rateValue} />
            <DetailCard
              icon="format-list-bulleted"
              title="Service"
              value={serviceName || 'N/A'}
            />
            <DetailCard
              icon="account-group-outline"
              title="Category"
              value={categoryName || 'N/A'}
            />
            <DetailCard
              icon="calendar-clock"
              title="Current Availability"
              value={
                provider?.business_hours_enabled === 1
                  ? 'Available'
                  : 'Not Available'
              }
            />
            {provider?.specialization && (
              <>
                <SubHeading text="Specialization" />
                <Text style={styles.cardValue}>
                  {provider?.specialization! || 'N/A'}
                </Text>
              </>
            )}
            {provider?.skills && (
              <>
                <SubHeading text="Skills" />
                <Text style={styles.cardValue}>
                  {provider?.skills! || 'N/A'}
                </Text>
              </>
            )}
            {serviceImages && <SubHeading text="Service Images" />}
            <FlatList
              data={serviceImages}
              renderItem={({item}) => (
                <Image
                  source={{uri: `${IMAGE_URL}${item}`}}
                  style={styles.serviceImage}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />

            {workingHours?.length > 0 && <SubHeading text="Working Hours" />}
            <WorkingHours days={workingHours} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const DetailCard: React.FC<{
  icon: string;
  title: string;
  value: string | React.ReactNode;
}> = ({icon, title, value}) => (
  <View style={styles.detailCard}>
    <Icon name={icon} size={24} style={styles.cardIcon} />
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      {typeof value === 'string' ? (
        <Text style={styles.cardValue}>{value}</Text>
      ) : (
        value
      )}
    </View>
  </View>
);

const SubHeading: React.FC<{text: string}> = ({text}) => (
  <Text style={styles.subHeading}>{text}</Text>
);

export default ServiceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    padding: responsiveWidth(4),
  },
  serviceImage: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    marginRight: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
  },
  address: {
    fontSize: responsiveFontSize(1.8),
  },
  phone: {
    fontSize: responsiveFontSize(1.8),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#FF3131',
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(2.5),
    borderRadius: responsiveWidth(1.5),
  },
  chatButton: {
    backgroundColor: '#3F3F3F',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(1.8),
  },
  simpleDottedLine: {
    height: 1,
    backgroundColor: 'gray',
    width: '95%',
    alignSelf: 'center',
    marginVertical: responsiveHeight(2),
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
  },
  scrollView: {
    flex: 1,
  },
  additionalDetails: {
    paddingHorizontal: responsiveWidth(4),
  },
  detailCard: {
    flexDirection: 'row',
    // padding: responsiveWidth(4),
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: responsiveHeight(1),
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: responsiveWidth(4),
  },
  cardTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: responsiveFontSize(2),
  },
  subHeading: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1),
  },

  errorText: {
    fontSize: responsiveFontSize(2),
    color: 'red',
    textAlign: 'center',
    marginTop: responsiveHeight(20),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: responsiveHeight(0.5),
  },
});

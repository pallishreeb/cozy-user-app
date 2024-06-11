import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {IMAGE_URL} from '../../constants';
import {Provider} from '../../types';

interface ServiceCardProps {
  service: Provider;
  handleBookService: () => {};
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  handleBookService,
}) => {
  const profileImage = service?.profile_pic
    ? {
        uri: `${IMAGE_URL}/profile_pic/${service?.profile_pic}`,
      }
    : require('../../assets/user-placeholder.png');
  return (
    <View style={styles.card}>
      <Image source={profileImage} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.providerName}>{service.name}</Text>
        <View style={styles.locationRow}>
          <Icon2 name="location-on" size={20} color="#5B5B5B" />
          <Text style={styles.location}>
            {service.address} {service.city} {service.state} {service.country}{' '}
            {service.zipcode}
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleBookService}>
          <Icon
            name="calendar-clock-outline"
            size={responsiveFontSize(2.5)}
            color={'#5B5B5B'}
          />
          <Text style={styles.buttonText}>Book Service</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(2.5),
    paddingVertical: responsiveHeight(2),
    marginVertical: responsiveHeight(0.625),
    marginHorizontal: responsiveWidth(2.5),
    borderColor: '#E3E3E3',
    borderWidth: 2,
    borderRadius: responsiveWidth(2.5),
  },
  image: {
    width: responsiveWidth(30),
    height: responsiveHeight(15),
    borderRadius: responsiveWidth(5),
  },
  details: {
    marginLeft: responsiveWidth(2.5),
    flex: 1,
    justifyContent: 'space-around',
  },
  providerName: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: responsiveFontSize(2.25),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    color: '#666',
    marginLeft: responsiveWidth(1),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#E3E3E3',
    width: responsiveWidth(32.5),
    paddingVertical: responsiveHeight(0.75),
    paddingHorizontal: responsiveWidth(2.5),
    borderRadius: responsiveWidth(5),
  },
  buttonText: {
    textAlign: 'center',
    color: '#5B5B5B',
    fontWeight: 'bold',
  },
});

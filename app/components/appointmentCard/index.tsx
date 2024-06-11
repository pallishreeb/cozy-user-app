import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {IMAGE_URL} from '../../constants';
import {Appointment} from '../../types';
import {format} from 'date-fns';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface AppointmentCardProps {
  appointment: Appointment;
  onEdit?: () => void;
  onCancel?: () => void;
  onChat?: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onEdit,
  onCancel,
  onChat,
}) => {
  const providerProfilePic = appointment?.service?.images
    ? `${IMAGE_URL}${appointment?.service?.images[0]}`
    : 'https://via.placeholder.com/150';
  return (
    <View style={styles.card}>
      <Image source={{uri: providerProfilePic}} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.header}>
          <Text style={styles.providerName}>{appointment.provider.name}</Text>
          {appointment.status === 'pending' && (
            <TouchableOpacity onPress={onEdit} style={styles.editIconContainer}>
              <Icon name="edit" size={24} color="#5B5B5B" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.locationRow}>
          <Icon name="location-on" size={20} color="#5B5B5B" />
          <Text style={styles.location}>{appointment.address}</Text>
        </View>
        <View style={styles.phoneRow}>
          <Icon name="phone" size={20} color="#5B5B5B" />
          <Text style={styles.phoneNumber}>{appointment.mobile_number}</Text>
        </View>

        <View style={styles?.dateTimeRow}>
          <Text>{appointment?.booking_date}</Text>
          <Text>{format(appointment?.booking_time, 'p')}</Text>
        </View>
        <View style={styles.actionButtonContainer}>
          {appointment.status === 'cancelled' ? (
            <TouchableOpacity
              style={[styles.button, styles.disabledButton]}
              disabled>
              <Text style={styles.buttonText}>Cancelled</Text>
            </TouchableOpacity>
          ) : appointment.status === 'completed' ? (
            <TouchableOpacity
              style={[styles.button, styles.completedButton]}
              disabled>
              <Text style={[styles.buttonText, styles.completedButtontext]}>
                Completed
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={onChat}>
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(2.5),
    paddingVertical: responsiveHeight(1),
    marginVertical: responsiveHeight(0.5),
    marginHorizontal: responsiveWidth(2),
    borderColor: '#E3E3E3',
    borderWidth: 1,
    borderRadius: responsiveWidth(1),
  },
  image: {
    width: responsiveWidth(30),
    height: responsiveHeight(18), // Adjust based on your aspect ratio requirements
    borderRadius: responsiveWidth(5),
  },
  details: {
    marginLeft: responsiveWidth(4),
    flex: 1,
    // justifyContent: 'space-between',
  },
  providerName: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: responsiveFontSize(2),
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: responsiveHeight(0.5),
    paddingHorizontal: responsiveWidth(2.5),
    borderRadius: responsiveWidth(1),
    marginVertical: responsiveHeight(0.5),
    backgroundColor: '#D7D7D7',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(0.5),
  },
  phoneNumber: {
    marginLeft: responsiveWidth(1),
    color: '#666',
  },
  location: {
    marginLeft: responsiveWidth(1),
    color: '#666',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 10,
  },
  button: {
    backgroundColor: '#E3E3E3',
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(5),
    borderRadius: responsiveWidth(1),
    marginRight: responsiveWidth(2),
  },
  buttonText: {
    textAlign: 'center',
    color: '#5B5B5B',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  editIconContainer: {
    // Add styles for the edit icon container if necessary
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedButton: {
    backgroundColor: '#9ACC5A',
  },
  completedButtontext: {
    color: '#fff',
  },
  disabledButton: {
    backgroundColor: '#BEBEBE',
  },
});

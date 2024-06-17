// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   TouchableOpacity,
//   FlatList,
//   Image,
// } from 'react-native';
// import {
//   responsiveHeight as rh,
//   responsiveWidth as rw,
//   responsiveFontSize as rf,
// } from 'react-native-responsive-dimensions';
// import AppointmentCard from '../../components/appointmentCard';
// import CustomHeader from '../../components/customHeader';
// import useProfileData from '../../hooks/useProfileData';
// import useAppointments from '../../hooks/useAppointments';
// import {
//   useFocusEffect,
// } from '@react-navigation/native';

// import Loader from '../../components/loader';
// import {BottomTabParamList} from '../../navigations/bottom-navigator';
// import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
// type AppointmentScreenProps = BottomTabScreenProps<
//   BottomTabParamList,
//   'Appointment'
// >;

// const Appointment = ({navigation}: AppointmentScreenProps) => {
//   const [shorwastAppointments, setShorwastAppointments] = useState(false);

//   const {
//     profileData,
//     isLoading: profileLoading,
//     error: profileError,
//   } = useProfileData();
//   const {
//     appointments,
//     isLoading,
//     error,
//     refreshAppointments,
//     cancelAppointment,
//   } = useAppointments(profileData?.id!, shorwastAppointments);
//   useFocusEffect(
//     React.useCallback(() => {
//       if (profileData?.id) {
//         refreshAppointments();
//       }
//     }, [shorwastAppointments, profileData?.id!]),
//   );
//   const getContent = () => {
//     if (isLoading || profileLoading) {
//       return <Loader />;
//     }

//     if (error || profileError) {
//       return (
//         <Text style={styles.errorText}>
//           Error:{' '}
//           {profileError || error?.message || 'An Unexpected Error occurred!'}
//         </Text>
//       );
//     }

//     if (appointments.length === 0) {
//       return (
//         <View style={styles.noResultsContainer}>
//           <Image
//             source={require('../../assets/no-result.png')}
//             style={styles.noResultsImage}
//           />
//           <Text style={styles.noResultsText}>
//             No {shorwastAppointments ? 'appointments' : 'recent appointments'}{' '}
//             found
//           </Text>
//         </View>
//       );
//     }

//     return (
//       <FlatList
//         data={appointments}
//         renderItem={({item}) => (
//           <AppointmentCard
//             appointment={item}
//             onEdit={() =>
//               navigation.navigate('EditBooking', {appointment: item})
//             }
//             onCancel={() => {
//               cancelAppointment(item?.id);
//               refreshAppointments();
//             }}
//             onChat={() =>
//               navigation.navigate('Chat', {provider: item.provider})
//             }
//           />
//         )}
//         keyExtractor={item => item?.id?.toString()}
//         contentContainerStyle={styles.flatListContentContainer}
//       />
//     );
//   };
//   const renderHeader = () => (
//     <>
//       <Text style={styles.headerText1}>
//         <Text style={{color: '#333'}}>Your</Text> Appointments
//       </Text>
//       <Text style={styles.headerText2}>Your Appointments List</Text>
//       <View style={styles.grayBar}></View>
//       <View style={styles.toggleButtonsContainer}>
//         <TouchableOpacity
//           onPress={() => setShorwastAppointments(false)}
//           style={[
//             styles.toggleButton,
//             !shorwastAppointments && styles.toggleButtonActive,
//           ]}>
//           <Text
//             style={[
//               styles.toggleButtonText,
//               !shorwastAppointments && styles.toggleActiveButtonText,
//             ]}>
//             Recent Appointments
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => setShorwastAppointments(true)}
//           style={[
//             styles.toggleButton,
//             shorwastAppointments && styles.toggleButtonActive,
//           ]}>
//           <Text
//             style={[
//               styles.toggleButtonText,
//               shorwastAppointments && styles.toggleActiveButtonText,
//             ]}>
//             All Appointments
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </>
//   );
//   return (
//     <SafeAreaView style={styles.container}>
//       <CustomHeader
//         isNotification={false}
//         onBackPress={() => {
//           navigation.goBack();
//         }}
//         onNotificationPress={() => {
//           navigation.navigate('Notification');
//         }}
//       />
//       {renderHeader()}
//       {getContent()}
//     </SafeAreaView>
//   );
// };

// export default Appointment;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollViewContainer: {
//     paddingTop: rh(2),
//     paddingBottom: rh(4),
//   },
//   flatListContentContainer: {
//     paddingBottom: rh(4),
//   },
//   headerText1: {
//     fontSize: rf(2.8),
//     textTransform: 'uppercase',
//     color: '#FF3131',
//     fontWeight: 'bold',
//     marginLeft: rw(5),
//     marginTop: rh(2),
//   },
//   headerText2: {
//     fontSize: rf(1.7),
//     textTransform: 'uppercase',
//     color: '#5B5B5B',
//     marginLeft: rw(5),
//     marginVertical: rh(0.5),
//   },
//   grayBar: {
//     height: rh(0.2),
//     backgroundColor: '#D3D3D3',
//     marginVertical: rh(1.7),
//     marginHorizontal: rw(1),
//   },
//   toggleButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginVertical: rh(1),
//   },
//   toggleButton: {
//     borderWidth: 1,
//     borderColor: '#E3E3E3',
//     paddingVertical: rh(1.5),
//     paddingHorizontal: rw(4),
//     marginHorizontal: rw(1),
//   },
//   toggleButtonActive: {
//     backgroundColor: '#FF3131',
//   },
//   toggleButtonText: {
//     color: '#333',
//     fontWeight: 'bold',
//     textTransform: 'uppercase',
//   },
//   toggleActiveButtonText: {
//     color: '#fff',
//   },
//   noResultsContainer: {
//     flex: 1,
//     // justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: rw(10),
//   },
//   noResultsImage: {
//     width: rw(60),
//     height: rh(40),
//     resizeMode: 'contain',
//   },
//   noResultsText: {
//     // marginTop: rh(1),
//     fontSize: rf(2.2),
//     color: '#5B5B5B',
//   },
//   errorText: {
//     fontSize: rf(2),
//     color: 'red',
//     textAlign: 'center',
//     marginTop: rh(20),
//   },
// });

import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';

const Appointment = () => {
  return (
    <SafeAreaView>
      <Text style={{color: '#000'}}>Appointment Screen is in progress</Text>
    </SafeAreaView>
  );
};

export default Appointment;

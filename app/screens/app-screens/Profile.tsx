import React from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import CustomHeader from '../../components/customHeader';
import PersonalProfile from '../../components/profile';

import useProfileData from '../../hooks/useProfileData';
import Loader from '../../components/loader';
import {BottomTabParamList} from '../../navigations/bottom-navigator';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
type ProfileScreenProps = BottomTabScreenProps<BottomTabParamList, 'Profile'>;
const Profile = ({navigation}: ProfileScreenProps) => {
  const {profileData, isLoading, error, updateProfileData} = useProfileData();

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        isNotification={false}
        onBackPress={() => {
          navigation.goBack();
        }}
        onNotificationPress={() => {
          navigation.navigate('Notification');
        }}
      />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Text style={styles.errorText}>
          {error || 'Something Went Wrong!'}{' '}
        </Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Text style={styles.headerText1}>
            <Text style={{color: '#333'}}>My</Text> Profile
          </Text>
          <PersonalProfile
            initialValues={profileData!}
            updateProfileData={updateProfileData}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    paddingTop: rh(2),
    paddingBottom: rh(4),
  },
  headerText1: {
    fontSize: rf(2.8),
    textTransform: 'uppercase',
    color: '#FF3131',
    fontWeight: 'bold',
    marginLeft: rw(5),
    marginVertical: rh(0.6),
  },
  headerText2: {
    fontSize: rf(1.7),
    textTransform: 'uppercase',
    color: '#5B5B5B',
    marginLeft: rw(5),
    marginVertical: rh(0.5),
  },
  errorText: {
    fontSize: rf(2),
    color: 'red',
    textAlign: 'center',
    marginTop: rh(20),
  },
});

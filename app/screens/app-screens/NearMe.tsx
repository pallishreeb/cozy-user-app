import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import Header from '../../components/homeHeader';
import ServiceCard from '../../components/serviceCard';
import useProfileData from '../../hooks/useProfileData';
import Loader from '../../components/loader';
import {useSearchProviders} from '../../hooks/useSearchProviders';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from '../../navigations/bottom-navigator';
type NearMeScreenProps = BottomTabScreenProps<BottomTabParamList, 'NearMe'>;
const NearMe = ({navigation}: NearMeScreenProps) => {
  const {
    profileData,
    isLoading: profileLoading,
    error: profileError,
  } = useProfileData();
  const [zipcode, setZipcode] = useState('');
  const [searchZipcode, setSearchZipcode] = useState('');
  const [manualSearchInitiated, setManualSearchInitiated] = useState(false);

  const {providers, loading, error, fetchProviders} = useSearchProviders();

  useEffect(() => {
    // If there's profile data and no manual search has been initiated, use the profile's zipcode
    if (profileData?.zipcode && !manualSearchInitiated) {
      setSearchZipcode(profileData.zipcode);
      fetchProviders({zipcode: profileData.zipcode});
    }
  }, [profileData, manualSearchInitiated]);

  const renderHeader = () => (
    <Text style={styles.headerText2}>Near You ({providers.length})</Text>
  );
  const searchResults = () => {
    setManualSearchInitiated(true); // Indicate that a manual search has been initiated
    setSearchZipcode(zipcode); // Update the searchZipcode to trigger the search
    fetchProviders({zipcode});
  };
  const getContent = () => {
    if (profileLoading || loading) {
      return <Loader />;
    }
    if (profileError || error) {
      return (
        <Text style={styles.errorText}>
          {profileError || error?.message || 'An unexpected error occured'}
        </Text>
      );
    }
    if (providers.length === 0) {
      return (
        <View style={styles.noResultsContainer}>
          <Image
            source={require('../../assets/no-result-2.png')}
            style={styles.noResultsImage}
          />
        </View>
      );
    }
    return (
      <FlatList
        data={providers}
        renderItem={({item}) => (
          <ServiceCard
            service={item}
            handleBookService={() =>
              navigation.navigate('ServiceDetails', {providerId: item?.id})
            }
          />
        )}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        // Add padding at the bottom to ensure nothing is cut off
        contentContainerStyle={styles.flatListContentContainer}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <Header
          handleSearch={text => {
            setZipcode(text as string);
          }}
          onPressSearch={searchResults}
          handleNavigation={() => {
            navigation.navigate('Notification');
          }}
          screenType="nearMe"
          label="Your location"
          placeholder="Enter Your Pin/Zip Code"
        />
        {/* {getContent()} */}
      </View>
    </SafeAreaView>
  );
};

export default NearMe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF3131',
  },
  scrollViewContainer: {
    paddingTop: rh(2),
    paddingBottom: rh(4),
  },
  flatListContentContainer: {
    paddingBottom: rh(4),
  },

  headerText2: {
    fontSize: rf(1.7),
    textTransform: 'uppercase',
    color: '#333',
    fontWeight: 'bold',
    marginLeft: rw(5),
    marginVertical: rh(0.5),
  },
  serviceImageConatiner: {
    flex: 1, // Takes up all available space below the header
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center',
  },
  serviceImage: {
    height: rh(60),
    width: rw(90),
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // paddingHorizontal: rw(10),
  },
  noResultsImage: {
    width: rw(90),
    height: rh(40),
    resizeMode: 'contain',
  },

  errorText: {
    fontSize: rf(2),
    color: 'red',
    textAlign: 'center',
    marginTop: rh(20),
  },
});

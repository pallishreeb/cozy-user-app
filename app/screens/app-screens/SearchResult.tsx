import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import CustomHeader from '../../components/customHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import ServiceCard from '../../components/serviceCard';
import {useSearchProviders} from '../../hooks/useSearchProviders';
import Loader from '../../components/loader';
import {AppStackParamList} from '../../navigations/app-navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type SearchResultScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'SearchResult'
>;

const SearchResult = ({navigation, route}: SearchResultScreenProps) => {
  const {keyword} = route.params;
  const {providers, loading, error, fetchProviders} = useSearchProviders();

  useEffect(() => {
    // Fetch providers based on the keyword when the component mounts or the keyword changes
    fetchProviders({serviceName: keyword});
  }, [keyword]);

  const renderHeader = () => (
    <>
      <Text style={styles.headerText}>Results for {keyword}</Text>
    </>
  );
  const getContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return (
        <Text style={styles.errorText}>
          {error.message || 'Something Went Wrong!'}
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
      {/* <Header /> */}
      <CustomHeader
        isNotification={false}
        onBackPress={() => {
          navigation.goBack();
        }}
        onNotificationPress={() => {
          navigation.navigate('Notification');
        }}
      />
      {getContent()}
    </SafeAreaView>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  headerText: {
    fontSize: rf(1.7),
    textTransform: 'uppercase',
    color: '#333',
    fontWeight: 'bold',
    marginLeft: rw(5),
    marginVertical: rh(0.5),
  },
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    paddingTop: rh(2),
    paddingBottom: rh(4),
  },
  flatListContentContainer: {
    paddingBottom: rh(4),
  },
  serviceImageConatiner: {
    flex: 1, // Takes up all available space below the header
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center',
  },
  serviceImage: {
    height: rh(80),
    width: rw(100),
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

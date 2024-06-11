import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/homeHeader';
import CategoryCard from '../../components/categoryCard';
import useCategories, {Category, Service} from '../../hooks/useCategories';
import Loader from '../../components/loader';
import {IMAGE_URL} from '../../constants';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from '../../navigations/bottom-navigator';

type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, 'Home'>;
export default ({navigation}: HomeScreenProps) => {
  const {categories, isLoading, error} = useCategories();
  const [keyword, setKeyword] = useState<string | undefined>('');
  let handleNavigation = () => {
    navigation.navigate('Notification');
  };
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    <Text>{error.message}</Text>;
  }
  const renderService = ({item}: {item: Service}) => {
    // console.log(item?.images)
    // let images = item?.images && JSON.parse(item?.images);
    const serviceImageUri = item?.images
      ? `${IMAGE_URL}${item?.images[0]}`
      : 'https://via.placeholder.com/150';

    return (
      <CategoryCard
        label={item.name}
        onPress={() => {
          navigation.navigate('SearchResult', {keyword: item?.name});
        }}
        source={{uri: serviceImageUri}}
      />
    );
  };

  const renderTopCategory = ({item}: {item: Category}) => {
    const categoryImageUri = item?.image
      ? `${IMAGE_URL}/category_images/${item?.image}`
      : 'https://via.placeholder.com/150';
    return (
      <CategoryCard
        label={item.name}
        onPress={() => {
          navigation.navigate('SearchResult', {keyword: item?.name});
        }}
        source={{uri: categoryImageUri}}
      />
    );
  };

  const renderCategoryServices = ({
    item,
    index,
  }: {
    item: Category;
    index: number;
  }) => {
    if (item.services.length === 0) {
      return null; // Skip rendering categories with no services
    }

    const isGradient = index % 2 === 0;
    // Only define gradientProps within the scope it's needed
    const renderContent = () => (
      <>
        <View style={styles.categoryHeaderContainer}>
          <Text style={styles.categoryTitle}>{item.name}</Text>
        </View>
        <View style={styles.categoryHeaderContainer}>
          <FlatList
            data={item.services}
            renderItem={renderService}
            keyExtractor={service => `${service.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </>
    );

    if (isGradient) {
      return (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#FC5A54', '#E6E6E6']}
          style={styles.linearGradientStyle}>
          {renderContent()}
        </LinearGradient>
      );
    } else {
      return renderContent();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        handleNavigation={handleNavigation}
        handleSearch={text => {
          setKeyword(text);
        }}
        onPressSearch={() => {
          setKeyword('');
          navigation.navigate('SearchResult', {keyword});
        }}
      />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Text style={styles.errorText}>
          {error.message || 'An error occurred.'}
        </Text>
      ) : (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
          }}>
          <View style={styles.categoryHeaderContainer}>
            <Text style={[styles.categoryTitle]}>{'Top Categories'}</Text>
          </View>
          <View style={styles.categoryHeaderContainer}>
            <FlatList
              data={categories}
              renderItem={renderTopCategory}
              keyExtractor={category => `${category.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          {categories?.length > 0 &&
            categories.map((category, index) => (
              <React.Fragment key={category.id}>
                {renderCategoryServices({item: category, index})}
              </React.Fragment>
            ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  categoryHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rh(1.5),
    marginHorizontal: rw(5),
    // paddingHorizontal: rw(3),
    // paddingRight: rf(2),
  },
  categoryImage: {
    borderRadius: rw(5.5),
    width: rw(30),
    height: rh(10),
  },
  linearGradientStyle: {
    paddingTop: rh(0.5),
    paddingBottom: rh(0.5),
  },
  categoryTitle: {
    fontWeight: 'bold',
    color: '#6D5C38',
    fontSize: rf(2.5),
    textTransform: 'uppercase',
  },
  errorText: {
    fontSize: rf(2),
    color: 'red',
    textAlign: 'center',
    marginTop: rh(20),
  },
});

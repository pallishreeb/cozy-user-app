import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  GestureResponderEvent,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import {useDispatch} from 'react-redux';
import {remove} from '../../utils/storage';
import {setSignOut} from '../../redux/slices/authSlice';

interface HeaderProps {
  handleNavigation: (event: GestureResponderEvent) => void;
  screenType?: 'home' | 'nearMe';
  label?: string;
  handleSearch?: (text?: string) => void;
  icon?: string;
  placeholder?: string;
  onPressSearch?: (event: GestureResponderEvent) => void;
}

const Header: React.FC<HeaderProps> = ({
  handleNavigation = () => {},
  screenType = 'home',
  label = 'Find and book best service',
  handleSearch = () => {},
  placeholder = 'Find and book best service',
  onPressSearch = () => {},
}) => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out', // Alert Title
      'Are you sure you want to sign out?', // Alert Message
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            remove('@auth');
            dispatch(setSignOut());
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#FF3131'} barStyle="light-content" />
      <View style={styles.topHeaderContainer}>
        <View></View>
        {screenType === 'home' && (
          <Image
            source={require('../../assets/header-image.png')}
            resizeMode={'stretch'}
            style={styles.headerImage}
          />
        )}
        <Icon
          name="logout"
          size={rf(2.5)}
          color={'white'}
          onPress={handleSignOut}
          style={styles.logoutIcon}
        />
        {/* <Icon
          name="notifications"
          size={rf(2.5)}
          color={'white'}
          style={{display: 'none'}}
          onPress={handleNavigation}
        /> */}
      </View>
      <View style={styles.whiteBar}></View>
      <Text style={styles.headerText}>{label}</Text>
      <View style={styles.bottomHeaderContainer}>
        <TextInput
          placeholder={placeholder}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
        <TouchableOpacity onPress={onPressSearch} style={styles.searchButton}>
          <Icon name="search" size={rf(3.5)} color={'#5B5B5B'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF3131',
    paddingTop: rh(1),
    paddingBottom: rh(4.5),
    marginBottom: rh(2),
  },
  topHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rh(1),
    marginHorizontal: rw(5),
    paddingVertical: rh(0.75),
    justifyContent: 'center',
  },
  headerImage: {
    width: rw(18),
    height: rh(4),
    // alignSelf: 'center', // This is redundant due to justifyContent: 'center' in the container.
  },
  logoutIcon: {
    position: 'absolute',
    right: rw(5), // Position the logout icon to the right.
  },
  whiteBar: {
    backgroundColor: '#FFFFFF',
    marginBottom: rh(2),
    width: rw(100),
    height: rh(0.1),
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: rf(2.25),
    marginBottom: rh(2),
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  bottomHeaderContainer: {
    width: rw(95),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: rw(2),
  },
  searchInput: {
    padding: rw(2.5),
    borderRadius: rw(1.2),
    color: '#6D5C38',
    fontSize: rf(2),
    backgroundColor: '#FFFFFF',
    width: '78%',
  },
  searchButton: {
    backgroundColor: 'white',
    paddingVertical: rh(1.1),
    paddingHorizontal: rh(1.5),
    borderRadius: 10,
  },
});

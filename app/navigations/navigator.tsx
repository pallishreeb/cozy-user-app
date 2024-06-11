import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';
import {axiosPrivate} from '../utils/axiosConfig';
// import {remove} from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectIsLoggedIn,
  selectToken,
  setSignIn,
  setSignOut,
} from '../redux/slices/authSlice';
export default () => {
  let isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  // Check if user is logged in on
  let loadAuthToken = async () => {
    try {
      const data = await AsyncStorage.getItem('@auth');
      if (data != null) {
        const userData = JSON.parse(data);
        dispatch(setSignIn(userData));
        // axiosPrivate.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      // error reading value
      // console.log(error, 'error from redaing async stoarge');
      Alert.alert('Unable to get data from async stoarge');
    }
  };
  useEffect(() => {
    loadAuthToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token, isLoggedIn]);
  axiosPrivate.defaults.headers.common.Authorization = `Bearer ${token}`;
  axiosPrivate.interceptors.response.use(
    async function (response) {
      return response;
    },
    async function (error) {
      let res = error?.response;
      if (res?.status === 401 && res?.config && !res?.config.__isRetryRequest) {
        await AsyncStorage.removeItem('@auth');
        dispatch(setSignOut());
      }
    },
  );
  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

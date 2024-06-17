import {Platform} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppRoute from './app/navigations/navigator';
import {store, RootState, AppDispatch} from './app/redux/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {monitorNetworkStatus} from './app/redux/slices/networkSlice';
import ConnectionErrorScreen from './app/screens/auth-screens/ConnectionErrorScreen';
const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};
const MainApp = () => {
  const dispatch: AppDispatch = useDispatch();
  const isConnected = useSelector(
    (state: RootState) => state.network.isConnected,
  );

  useEffect(() => {
    dispatch(monitorNetworkStatus());
  }, [dispatch]);

  return isConnected ? <AppRoute /> : <ConnectionErrorScreen />;
};
export default App;

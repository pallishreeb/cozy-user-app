import {Platform} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppRoute from './app/navigations/navigator';
import {store} from './app/redux/store';
import {Provider} from 'react-redux';
const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <Provider store={store}>
      <AppRoute />
    </Provider>
  );
};

export default App;

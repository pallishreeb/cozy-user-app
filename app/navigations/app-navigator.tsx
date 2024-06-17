import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import MyTabs, {BottomTabParamList} from './bottom-navigator';
import Notification from '../screens/app-screens/Notification';
import Chat from '../screens/app-screens/Chat';
import SearchResult from '../screens/app-screens/SearchResult';
import ServiceDetails from '../screens/app-screens/ServiceDetails';
import BookService from '../screens/app-screens/BookService';
import Payment from '../screens/app-screens/Payment';
import ThankYou from '../screens/app-screens/ThankYou';
import EditBooking from '../screens/app-screens/EditBooking';
import {Appointment, Provider} from '../types';
// import messaging from '@react-native-firebase/messaging';
import {Alert,PermissionsAndroid} from 'react-native';
// import {getNewFCMToken} from '../utils/getFCMTToken';
import {axiosPrivate} from '../utils/axiosConfig';
import {saveString, loadString} from '../utils/storage';
import {endpoints} from '../constants';
// PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export type AppStackParamList = {
  MyTabs: NavigatorScreenParams<BottomTabParamList> | undefined;
  Notification: undefined;
  Chat: {provider: Provider};
  SearchResult: {keyword: string};
  ServiceDetails: {providerId: number};
  BookService: {providerId: number; serviceId: number};
  Payment: undefined;
  ThankYou: undefined;
  EditBooking: {appointment: Appointment};
};
const Stack = createNativeStackNavigator<AppStackParamList>();
const TOKEN_SENT_KEY = 'TokenSent';
const AppNavigator = () => {
  const sendTokenToBackend = async (token: string) => {
    const tokenSent = await loadString(TOKEN_SENT_KEY);
    if (!tokenSent || tokenSent !== token) {
      try {
        const response = await axiosPrivate.post(endpoints.SAVE_TOKEN, {
          device_token: token,
        });
        // console.log(response, 'device_token response');

        if (response.status === 200) {
          await saveString(TOKEN_SENT_KEY, token);
        } else {
          console.error('Failed to send token to backend.');
        }
      } catch (error) {
        console.error('Error sending token to backend:', error);
      }
    }
  };
  // useEffect(() => {
  //   const initializeFCM = async () => {
  //     try {
  //       const token = await getNewFCMToken();
  //       if (token) {
  //         sendTokenToBackend(token);
  //       }
  //     } catch (error) {
  //       console.error('Error during FCM initialization:', error);
  //     }
  //     try {
  //       const unsubscribeTokenRefresh = messaging().onTokenRefresh(
  //         async newToken => {
  //           sendTokenToBackend(newToken);
  //         },
  //       );
  //       const unsubscribeOnMessage = messaging().onMessage(
  //         async remoteMessage => {
  //           Alert.alert(
  //             'New Notification!',
  //             remoteMessage?.data?.message as string,
  //           );
  //         },
  //       );
  //       return () => {
  //         unsubscribeTokenRefresh();
  //         unsubscribeOnMessage();
  //       };
  //     } catch (error) {
  //       console.error('Error setting up FCM listeners:', error);
  //     }
  //   };
  //   initializeFCM();
  // }, []);
  // Since we're now returning a cleanup function inside `initializeFCM`, we don't need a separate return here
  // Ensure dependencies are correctly managed. Empty array means this effect runs once on mount.
  return (
    <Stack.Navigator
      initialRouteName="MyTabs"
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}
      // screenOptions={{headerShown: false}}
    >
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ServiceDetails"
        component={ServiceDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookService"
        component={BookService}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditBooking"
        component={EditBooking}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ThankYou"
        component={ThankYou}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default AppNavigator;

import messaging from '@react-native-firebase/messaging';

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const token = await messaging().getToken();
    // console.log('FCM Token:', token);
    return token; // Return the token if permission is granted
  } else {
    console.log('REQUEST PERMISSION DENIED');
    return null; // Return null if permission is denied
  }
};
export const getNewFCMToken = async () => {
  try {
    const token = await requestUserPermission();
    if (token) {
      // console.log('Token:', token);
      return token; // Return the token up the chain
    }
  } catch (error) {
    console.error('Error getting new FCM token:', error);
  }
  return null; // Return null if there was an error or no token
};

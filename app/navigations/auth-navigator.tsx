import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/auth-screens/SignIn';
import SignUp from '../screens/auth-screens/SignUp';
import ForgotPassword from '../screens/auth-screens/ForgotPassword';
import ResetPassword from '../screens/auth-screens/ResetPassword';
import VerificationCode from '../screens/auth-screens/VerificationCode';
export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  VerificationCode: {email: string; previousRoute: string};
  ForgotPassword: undefined;
  ResetPassword: {email: string};
};
const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="VerificationCode" component={VerificationCode} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default AuthNavigator;

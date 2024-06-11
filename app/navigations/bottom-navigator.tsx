import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/app-screens/Home';
import NearMe from '../screens/app-screens/NearMe';
import Appointment from '../screens/app-screens/Appointment';
import Profile from '../screens/app-screens/Profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions';
export type BottomTabParamList = {
  Home: undefined;
  NearMe: undefined;
  Appointment: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();
export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#f5610a',
        tabBarInactiveTintColor: '#555',
        tabBarStyle: {
          height: hp(7),
          backgroundColor: '#FF3131',
          //   borderTopLeftRadius: 10,
          //   borderTopRightRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: fp(1.3),
          color: 'white',
          paddingBottom: hp(1),
        },
        tabBarIcon: ({}) => {
          let iconName = 'question';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'NearMe') {
            iconName = 'location-arrow';
          } else if (route.name === 'Appointment') {
            iconName = 'calendar-check-o';
          } else if (route.name === 'Profile') {
            iconName = 'user-circle';
          }

          // Return the icon component

          return <Icon name={iconName} size={20} color={'white'} />;
        },
        tabBarLabel: ({}) => {
          let labelStyle = {color: 'white'};

          // Change label color based on focus
          //   if (focused) {
          //     labelStyle.color = 'gray;
          //   }

          return (
            <Text
              style={[{fontSize: fp(1.4), paddingBottom: hp(1)}, labelStyle]}>
              {route.name}
            </Text>
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="NearMe"
        component={NearMe}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={Appointment}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

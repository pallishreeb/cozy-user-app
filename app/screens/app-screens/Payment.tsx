import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/customHeader';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../navigations/app-navigator';
type PaymentScreenProps = NativeStackScreenProps<AppStackParamList, 'Payment'>;
const Payment = ({navigation}: PaymentScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        isNotification={false}
        title="PAYMENT"
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('Notification')}
      />
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

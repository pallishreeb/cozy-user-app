// hooks/useAppointments.js
import {useState, useEffect, useCallback} from 'react';
import {axiosPrivate} from '../utils/axiosConfig';
import {endpoints} from '../constants';
import {Appointment} from '../types';
import {Alert} from 'react-native';
const useAppointments = (userId: number, showPastAppointments: boolean) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // Refresh key for manual refresh

  const refreshAppointments = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1); // This will trigger the useEffect below
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Replace with your actual endpoint and add your desired request configuration
        const endpoint = showPastAppointments
          ? endpoints.USER_BOOKINGS
          : endpoints.USER_PENDING_BOOkINGS;
        const response = await axiosPrivate.post(endpoint, {user_id: userId});
        // console.log(response, 'appointments');

        setAppointments(response?.data?.bookings);
      } catch (err) {
        console.log(err, 'error from appointments');
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (userId) {
      // Ensure userId is available before fetching
      fetchAppointments();
    }
  }, [userId, showPastAppointments, refreshKey]);
  const cancelAppointment = async (id: number) => {
    try {
      const response = axiosPrivate.delete(`${endpoints.CANCEL_BOOKING}/${id}`);
      Alert.alert('Information', 'Successfully Cancelled Appointment!');
      //   console.log(response, 'cancel appointment response');
      return true;
    } catch (error) {
      console.log(error, 'error in cancel Appointment');
      Alert.alert('Error', 'Error in cancelling appointment');
      return false;
    }
  };
  return {
    appointments,
    isLoading,
    error,
    refreshAppointments,
    cancelAppointment,
  };
};

export default useAppointments;

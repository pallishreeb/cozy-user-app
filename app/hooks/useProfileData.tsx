// useProfileData.js

import {useState, useEffect} from 'react';
import {axiosPrivate} from '../utils/axiosConfig';
import {endpoints} from '../constants';
export interface ProfileData {
  id?: number;
  name: string;
  email?: string;
  profile_pic: string | null;
  mobile_number: string | null;
  address: string | null;
  zipcode: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
}

const useProfileData = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      // console.log(axiosPrivate.head, 'axios');

      const response = await axiosPrivate.get(`${endpoints.GET_PROFILE}`);
      const data = response?.data?.user;
      // console.log(data, 'provider ');
      setProfileData(data);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      console.log(err, 'error from load profile');

      setError('Failed to fetch profile data');
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

  const updateProfileData = async (updatedData: any) => {
    try {
      const formData = new FormData();
      Object.keys(updatedData).forEach(key => {
        if (
          key !== 'profile_pic' &&
          key !== 'portfolio' &&
          updatedData[key] !== null
        ) {
          formData.append(key, updatedData[key]);
        }
      });
      if (updatedData?.profile_pic) {
        formData.append('profile_pic', {
          uri: updatedData.profile_pic.uri,
          type: updatedData.profile_pic.type || 'image/jpeg', // Fallback MIME type
          name: updatedData?.profile_pic.name || 'profile_pic.jpg', // Fallback file name
        });
        // Directly append the portfolio object from data if it's a professional profile update and not null
      }
      // console.log(formData, 'formdata');

      const response = await axiosPrivate.post(
        `${endpoints.UPDATE_PROFILE}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      fetchProfileData();
      // console.log(response);

      return true;
    } catch (error) {
      console.error(error);
      setError('Failed to update profile data');
      return false; // Indicate failure
    }
  };

  return {profileData, isLoading, error, updateProfileData};
};

export default useProfileData;

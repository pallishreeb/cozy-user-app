export const BASE_URL = 'http://13.36.243.41/api/';
export const endpoints = {
  SIGN_UP: 'user/register',
  VERIFY_OTP: 'user/verify',
  LOGIN: 'user/login',
  FORGOT_PASSWORD: 'user/forgot-password',
  RESET_PASSWORD: 'user/reset-password',
  GET_PROFILE: 'user/profile',
  CATEGORIES: 'categories',
  UPDATE_PROFILE: 'user/update-profile',
  SEARCH_SERVICE: 'providers/search',
  NEAR_ME: 'providers/near-me',
  PROVIDER_DETAILS: '/providers',
  BOOK_SERVICE: 'bookings',
  EDIT_BOOKING: 'bookings',
  USER_BOOKINGS: 'bookings/user/',
  USER_PENDING_BOOkINGS: 'bookings/user/pending',
  CANCEL_BOOKING: 'bookings',
  SAVE_TOKEN: 'user/save-token',
};
export const experience: {[key: string]: string} = {
  '1': '0-1 Years',
  '2': '1-2 Years',
  '3': '2-3 Years',
  '4': '3-4 Years',
  '5': '4-5 Years',
  '6': '5-6 Years',
  '7': '6-7 Years',
  '8': '7-8 Years',
  '9': '8-9 Years',
  '10': '9-10 Years',
  '11': '10+ Years',
};
export const IMAGE_URL = 'http://13.36.243.41/';

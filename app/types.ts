import {Service} from './hooks/useCategories';

export interface Provider {
  id: number;
  name: string;
  email: string;
  device_token: null;
  isNotificationAllowed: number;
  mobile_number: string;
  address: string;
  zipcode: string;
  city: string;
  state: string;
  country: string;
  working_hours: string; // This appears to be a JSON string; consider parsing it if needed
  timezone: null;
  experience: number;
  rate: string;
  specialization: string;
  portfolio: string;
  profile_pic: string | null;
  created_at: string;
  updated_at: string;
  category_id: number;
  service_id: number;
  isAdmin: number;
  business_hours_enabled: number;
  skills: string;
  service?: ServiceForProvider;
}
interface CategoryForService {
  id: number;
  name: string;
  image: string;
  discount: null;
  created_at: string;
  updated_at: string;
}

interface ServiceForProvider {
  id: number;
  name: string;
  category_id: number;
  images: string;
  price: null;
  discount: null;
  created_at: string;
  updated_at: string;
  category: CategoryForService;
}
export interface Appointment {
  id: number;
  service_id: number;
  provider_id: number;
  user_id: number;
  zipcode: string;
  address: string;
  city: string;
  state: string;
  country: string;
  booking_date: string;
  booking_time: string;
  status: string;
  created_at: string;
  updated_at: string;
  mobile_number: string;
  provider: Provider;
  service: Service;
}

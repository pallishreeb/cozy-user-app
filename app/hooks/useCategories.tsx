import {useState, useEffect} from 'react';
import {axiosPrivate} from '../utils/axiosConfig';
import {endpoints} from '../constants';
export interface Service {
  id: number;
  name: string;
  category_id: number;
  images: string;
  price: number | null;
  discount: number | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  discount: number | null;
  created_at: string;
  updated_at: string;
  services: Service[];
}
const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate(endpoints.CATEGORIES);
        setCategories(response?.data?.categories);
        setError(null);
      } catch (error: any) {
        setError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return {categories, isLoading, error};
};
export default useCategories;

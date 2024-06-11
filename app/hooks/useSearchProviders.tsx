import {useState} from 'react';
import {axiosPrivate as axios} from '../utils/axiosConfig';
import {endpoints} from '../constants';
import {Provider} from '../types'; // Assuming you have a types file

interface ProvidersResponse {
  providers: Provider[];
}

interface SearchParams {
  serviceName?: string;
  zipcode?: string;
}

export const useSearchProviders = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const fetchProviders = async (params: SearchParams) => {
    setLoading(true);
    setError(null);

    try {
      let response;
      // Determine the endpoint based on the provided parameters
      if (params.serviceName) {
        // For searching by service name
        response = await axios.post<ProvidersResponse>(
          endpoints.SEARCH_SERVICE,
          {service_name: params.serviceName},
        );
      } else if (params.zipcode) {
        // For searching providers near a specific zipcode
        response = await axios.post<ProvidersResponse>(endpoints.NEAR_ME, {
          zipcode: params.zipcode,
        });
      } else {
        // Handle the case where neither is provided, if necessary
        throw new Error('No search parameters provided.');
      }
      // console.log(response?.data?.providers, 'providers list');
      setProviders(response.data.providers);
    } catch (err) {
      setError(err as Error);
      console.log('error');
    } finally {
      setLoading(false);
    }
  };

  return {providers, loading, error, fetchProviders};
};

import {useState, useEffect} from 'react';
import {axiosPrivate as axios} from '../utils/axiosConfig';
import {endpoints} from '../constants';
import {Provider} from '../types'; // Assuming you have a types file

interface ProviderDetailsResponse {
  provider: Provider;
}

export const useProviderDetails = (providerId: number) => {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ProviderDetailsResponse>(
          `${endpoints.PROVIDER_DETAILS}/${providerId}`,
        );
        setProvider(response.data.provider);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [providerId]);

  return {provider, loading, error};
};

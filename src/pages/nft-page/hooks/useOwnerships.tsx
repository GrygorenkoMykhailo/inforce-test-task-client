import { useQuery } from '@tanstack/react-query';
import { raribleApi } from '../../../api/rarible.api';

export function useOwnerships(collectionId: string, setErrorMessage: (message: string) => void) {
  const fetchOwnerships = async () => {
    try {
      const data = await raribleApi.getNftOwnerships(collectionId);
      return data;
    } catch (err) {
      const message = (err as Error).message || 'Unknown error';
      setErrorMessage(`Failed to fetch ownerships: ${message}`);
      return null;
    }
  };

  return useQuery({
    queryKey: ['ownerships', collectionId],
    queryFn: fetchOwnerships,
    enabled: false,
    retry: false,
  });
}
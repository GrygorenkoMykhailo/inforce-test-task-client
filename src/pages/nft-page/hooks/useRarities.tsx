import { useQuery } from '@tanstack/react-query';
import { raribleApi } from '../../../api/rarible.api';
import type { GetNftTraitsRarityProperties } from '../../../types/api/rarible.api.types';

export function useRarities(collectionId: string, properties: GetNftTraitsRarityProperties[], setErrorMessage: (message: string) => void) {
  const fetchRarity = async () => {
    try {
      const data = await raribleApi.getNftTraitsRarity({
        collectionId,
        properties,
      });
      return data;
    } catch (err) {
      const message = (err as Error).message || 'Unknown error';
      setErrorMessage(`Failed to fetch rarity: ${message}`);
      return null;
    }
  };

  return useQuery({
    queryKey: ['rarity', collectionId, properties],
    queryFn: fetchRarity,
    enabled: false,
    retry: false,
  })
}
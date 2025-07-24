import { useState } from 'react';
import {
  type GetNftTraitsRarityProperties,
} from '../../types/api/rarible.api.types';
import { Button, Input } from '../../components';
import { useOwnerships } from './hooks/useOwnerships';
import { useRarities } from './hooks/useRarities';
import { NftData } from './components/nft-data';

export function NftPage() {
  const [collectionId, setCollectionId] = useState('')
  const [properties, setProperties] = useState<GetNftTraitsRarityProperties[]>([{ key: '', value: '' }])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const ownerships = useOwnerships(collectionId, setErrorMessage)
  const rarities = useRarities(collectionId, properties, setErrorMessage)

  const handleAddProperty = () => {
    setProperties((prev) => [...prev, { key: '', value: '' }]);
  };

  const handleRemoveProperty = (index: number) => {
    setProperties((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChangeProperty = (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    const updated = [...properties];
    updated[index][field] = value;
    setProperties(updated);
  };

  const handleGetOwnerships = () => {
    if (!collectionId.trim()) {
      setErrorMessage('Collection ID is required');
      return;
    }
    setErrorMessage(null);
    ownerships.refetch();
  };

  const handleGetRarity = () => {
    if (!collectionId.trim() || properties.filter(p => p.key && p.value).length === 0) {
      setErrorMessage('Collection ID and valid properties are required');
      return;
    }
    setErrorMessage(null);
    rarities.refetch();
  };

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">NFT Tool</h1>

      <Input
        label="Collection ID"
        value={collectionId}
        onChange={(e) => setCollectionId(e.target.value)}
      />

      <Button label="Get Ownerships" onClick={handleGetOwnerships} />

      <div className="space-y-2">
        <p className="font-semibold">Rarity Properties</p>
        {properties.map((pair, index) => (
          <div key={index} className="flex space-x-2 items-center">
            <Input
              placeholder="key"
              value={pair.key}
              onChange={(e) => handleChangeProperty(index, 'key', e.target.value)}
              className="w-full"
            />
            <Input
              placeholder="value"
              value={pair.value}
              onChange={(e) => handleChangeProperty(index, 'value', e.target.value)}
              className="w-full"
            />
            <button
              onClick={() => handleRemoveProperty(index)}
              className="text-red-600 text-sm hover:underline"
            >
              ✕
            </button>
          </div>
        ))}
        <Button label="+ Add property" onClick={handleAddProperty} />
      </div>

      <Button label="Get Rarity" onClick={handleGetRarity} color="green" />

      {errorMessage && (
        <div className="text-red-600 text-sm">{errorMessage}</div>
      )}

      <NftData data={ownerships.data} label='ownerships' isFetching={ownerships.isFetching}/>
      <NftData data={rarities.data} label='rarities' isFetching={rarities.isFetching}/>
    </div>
  );
}


export interface GetNftTraitsRarityProperties {
  key: string;
  value: string;
}

export interface GetNftTraitsRarityPayload {
  collectionId: string;
  properties: GetNftTraitsRarityProperties[];
}
import type { GetNftTraitsRarityPayload } from "../types/api/rarible.api.types";
import { BaseApi } from "./base.api";

class RaribleApi extends BaseApi {
  getNftOwnerships(collectionId: string) {
    return this.get("/rarible/nft-ownership/" + collectionId)
  }

  getNftTraitsRarity(data: GetNftTraitsRarityPayload) {
    return this.post("/rarible/nft-rarity", data)
  }
}

export const raribleApi = new RaribleApi((import.meta as unknown as { env: Record<string, string> }).env.VITE_BASE_API_URL)
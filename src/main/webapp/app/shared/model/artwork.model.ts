import { ITypeOfArtmedia } from 'app/shared/model/type-of-artmedia.model';

export interface IArtwork {
  id?: number;
  artworkTitle?: string;
  productionYear?: number | null;
  seasonNumber?: number | null;
  episodeOrSequenceNumber?: number | null;
  registerIdInIMDB?: string | null;
  assetsCollectionUUID?: string | null;
  contentDetailsJSON?: string | null;
  typeOfArtmedia?: ITypeOfArtmedia;
  artworkAggregator?: IArtwork | null;
}

export const defaultValue: Readonly<IArtwork> = {};

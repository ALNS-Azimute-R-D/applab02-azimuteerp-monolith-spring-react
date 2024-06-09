import { IArtwork } from 'app/shared/model/artwork.model';
import { IArtist } from 'app/shared/model/artist.model';

export interface IArtworkCast {
  id?: number;
  orderOfAppearance?: number | null;
  characterName?: string | null;
  mainAssetUUID?: string | null;
  characterDetailsJSON?: string | null;
  artwork?: IArtwork;
  artist?: IArtist;
}

export const defaultValue: Readonly<IArtworkCast> = {};

import { ITypeOfArtmedia } from 'app/shared/model/type-of-artmedia.model';
import { ITypeOfArtist } from 'app/shared/model/type-of-artist.model';
import { IArtisticGenre } from 'app/shared/model/artistic-genre.model';

export interface IArtist {
  id?: number;
  acronym?: string;
  publicName?: string;
  realName?: string | null;
  biographyDetailsJSON?: string | null;
  typeOfArtmedia?: ITypeOfArtmedia;
  typeOfArtist?: ITypeOfArtist;
  artistAggregator?: IArtist | null;
  artists?: IArtisticGenre[] | null;
}

export const defaultValue: Readonly<IArtist> = {};

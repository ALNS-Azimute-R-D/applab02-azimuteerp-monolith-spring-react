import { IArtist } from 'app/shared/model/artist.model';

export interface IArtisticGenre {
  id?: number;
  acronym?: string;
  name?: string;
  description?: string;
  artisticGenres?: IArtist[] | null;
}

export const defaultValue: Readonly<IArtisticGenre> = {};

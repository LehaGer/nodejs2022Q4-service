import { FavoriteEntity } from '../entities/favorite.entity';

export interface IFavoriteStorage {
  findAll: () => FavoriteEntity;
  createTrack: (id: string) => FavoriteEntity;
  deleteTrack: (id: string) => void;
  createAlbum: (id: string) => FavoriteEntity;
  deleteAlbum: (id: string) => void;
  createArtist: (id: string) => FavoriteEntity;
  deleteArtist: (id: string) => void;
}

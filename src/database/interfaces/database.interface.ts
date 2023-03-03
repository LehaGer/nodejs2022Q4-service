import { FavoriteEntity } from '../../favorites/entities/favorite.entity';
import { ResourceTypeName } from '../types/resourceTypeName';
import { IResourceTypeCoincidence } from './resourceTypeCoincidence.interface';

export interface IDatabase {
  findAll: <T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
  ) => Promise<K[T]['entity'][]>;
  findById: <T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    id: string,
  ) => Promise<K[T]['entity'] | undefined>;
  create: <T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    params: K[T]['createDto'],
  ) => Promise<K[T]['entity']>;
  update: <T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    id: string,
    params: K[T]['updateDto'],
  ) => Promise<K[T]['entity']>;
  delete: <T extends ResourceTypeName>(
    resourceType: T,
    id: string,
  ) => Promise<void>;

  updateRefreshToken: <
    T extends ResourceTypeName,
    K extends IResourceTypeCoincidence,
  >(
    resourceType: T,
    id: string,
    refreshToken: string,
  ) => Promise<K[T]['entity']>;
  getAllFavorites: () => Promise<FavoriteEntity>;
  addTrackToFavorites: (id: string) => Promise<FavoriteEntity>;
  removeTrackFromFavorites: (id: string) => Promise<void>;
  addAlbumToFavorites: (id: string) => Promise<FavoriteEntity>;
  removeAlbumFromFavorites: (id: string) => Promise<void>;
  addArtistToFavorites: (id: string) => Promise<FavoriteEntity>;
  removeArtistFromFavorites: (id: string) => Promise<void>;
}

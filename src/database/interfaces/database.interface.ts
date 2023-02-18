import { FavoriteEntity } from '../../favorites/entities/favorite.entity';
import { ResourceTypeName } from '../types/resourceTypeName';
import { IResourceTypeCoincidence } from './resourceTypeCoincidence.interface';

export interface IDatabase {
  findAll: <T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
  ) => K[T]['entity'][];
  findById: <T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    id: string,
  ) => K[T]['entity'] | undefined;
  create: <T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    params: K[T]['createDto'],
  ) => K[T]['entity'];
  update: <T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    id: string,
    params: K[T]['updateDto'],
  ) => K[T]['entity'];
  delete: <T extends ResourceTypeName>(resourceType: T, id: string) => void;
  getAllFavorites: () => FavoriteEntity;
  addTrackToFavorites: (id: string) => FavoriteEntity;
  removeTrackFromFavorites: (id: string) => void;
  addAlbumToFavorites: (id: string) => FavoriteEntity;
  removeAlbumFromFavorites: (id: string) => void;
  addArtistToFavorites: (id: string) => FavoriteEntity;
  removeArtistFromFavorites: (id: string) => void;
}

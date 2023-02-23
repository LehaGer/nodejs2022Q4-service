import { Inject, Injectable } from '@nestjs/common';
import { IDatabase } from './interfaces/database.interface';
import { ResourceTypeName } from './types/resourceTypeName';
import { IResourceTypeCoincidence } from './interfaces/resourceTypeCoincidence.interface';
import { FavoriteEntity } from '../favorites/entities/favorite.entity';

@Injectable()
export class DatabaseService {
  constructor(@Inject('IDatabase') private storage: IDatabase) {}

  async findAll<T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
  ): Promise<K[T]['entity'][]> {
    return this.storage.findAll<T, K>(resourceType);
  }

  async findById<
    T extends ResourceTypeName,
    K extends IResourceTypeCoincidence,
  >(resourceType: T, id: string): Promise<K[T]['entity'] | undefined> {
    return this.storage.findById<T, K>(resourceType, id);
  }

  async create<T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    params: K[T]['createDto'],
  ): Promise<K[T]['entity']> {
    return this.storage.create<ResourceTypeName, IResourceTypeCoincidence>(
      resourceType,
      params,
    );
  }

  async update<T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    id: string,
    params: K[T]['updateDto'],
  ): Promise<K[T]['entity']> {
    return this.storage.update<T, K>(resourceType, id, params);
  }

  async delete<T extends ResourceTypeName>(
    resourceType: T,
    id: string,
  ): Promise<void> {
    return this.storage.delete<T>(resourceType, id);
  }

  async getAllFavorites(): Promise<FavoriteEntity> {
    return this.storage.getAllFavorites();
  }

  async addTrackToFavorites(id: string): Promise<FavoriteEntity> {
    return this.storage.addTrackToFavorites(id);
  }

  async removeTrackFromFavorites(id: string): Promise<void> {
    return this.storage.removeTrackFromFavorites(id);
  }

  async addAlbumToFavorites(id: string): Promise<FavoriteEntity> {
    return this.storage.addAlbumToFavorites(id);
  }

  async removeAlbumFromFavorites(id: string): Promise<void> {
    return this.storage.removeAlbumFromFavorites(id);
  }

  async addArtistToFavorites(id: string): Promise<FavoriteEntity> {
    return this.storage.addArtistToFavorites(id);
  }

  async removeArtistFromFavorites(id: string): Promise<void> {
    return this.storage.removeArtistFromFavorites(id);
  }
}

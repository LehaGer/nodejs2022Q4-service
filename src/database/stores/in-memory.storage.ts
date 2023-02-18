import { IDatabase } from '../interfaces/database.interface';
import { Injectable } from '@nestjs/common';
import { TrackEntity } from '../../tracks/entities/track.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { ResourceTypeName } from '../types/resourceTypeName';
import { FavoriteEntity } from '../../favorites/entities/favorite.entity';
import { v4 as uuid } from 'uuid';
import { IResourceTypeCoincidence } from '../interfaces/resourceTypeCoincidence.interface';
import { UpdateUserDto } from '../../users/dto/update-user.dto';

@Injectable()
export class InMemoryStorage implements IDatabase {
  private users: UserEntity[] = [];
  private tracks: TrackEntity[] = [];
  private albums: AlbumEntity[] = [];
  private artists: ArtistEntity[] = [];
  private favorites: { tracks: string[]; albums: string[]; artists: string[] } =
    {
      tracks: [],
      albums: [],
      artists: [],
    };

  findAll<T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
  ): K[T]['entity'][] {
    return this[`${resourceType}s`];
  }

  findById<T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    id: string,
  ): K[T]['entity'] | undefined {
    return this[`${resourceType as string}s`].find(
      (resourceEntity) => resourceEntity.id === id,
    );
  }

  create<T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    params: K[T]['createDto'],
  ): K[T]['entity'] {
    if (resourceType === 'user') {
      const newUser: K[Extract<T, 'user'>]['entity'] = {
        id: uuid(),
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...(params as K[Extract<T, 'user'>]['createDto']),
      };
      this[`${resourceType as 'user'}s`].push(newUser);
      return newUser;
    } else {
      const newResource: K[Exclude<T, 'user'>]['entity'] = {
        id: uuid(),
        ...(params as K[Exclude<T, 'user'>]['createDto']),
      } as K[Exclude<T, 'user'>]['entity'];
      this[`${resourceType as Exclude<T, 'user'>}s`].push(
        newResource as TrackEntity & AlbumEntity & ArtistEntity,
      );
      return newResource;
    }
  }

  update<T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    id: string,
    params: K[T]['updateDto'],
  ): K[T]['entity'] {
    if (resourceType === 'user') {
      const userEntityIndex = this[`${resourceType as string}s`].findIndex(
        (user) => user.id === id,
      );
      this[`${resourceType as string}s`][userEntityIndex] = {
        ...this[`${resourceType as string}s`][userEntityIndex],
        password: (params as UpdateUserDto).newPassword,
        version: ++this[`${resourceType as string}s`][userEntityIndex].version,
        updatedAt: Date.now(),
      };
      return this[`${resourceType as string}s`][userEntityIndex];
    } else {
      const resourceEntityArray = this[`${resourceType as string}s`];
      const resourceEntityIndex = resourceEntityArray.findIndex(
        (resourceEntity) => resourceEntity.id === id,
      );
      resourceEntityArray[resourceEntityIndex] = {
        ...resourceEntityArray[resourceEntityIndex],
        ...params,
      };
      return resourceEntityArray[resourceEntityIndex];
    }
  }

  delete<T extends ResourceTypeName>(resourceType: T, id: string): void {
    this[`${resourceType as string}s`] = this[
      `${resourceType as string}s`
    ].filter((resourceInstance) => resourceInstance.id !== id);
  }

  getAllFavorites(): FavoriteEntity {
    return this.favorites;
  }

  addTrackToFavorites(id: string): FavoriteEntity {
    this.favorites.tracks.push(id);
    return this.favorites;
  }

  removeTrackFromFavorites(id: string): void {
    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }

  addAlbumToFavorites(id: string): FavoriteEntity {
    this.favorites.albums.push(id);
    return this.favorites;
  }

  removeAlbumFromFavorites(id: string): void {
    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  addArtistToFavorites(id: string): FavoriteEntity {
    this.favorites.artists.push(id);
    return this.favorites;
  }

  removeArtistFromFavorites(id: string): void {
    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
  }
}

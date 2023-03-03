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
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

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

  constructor(private configService: ConfigService) {}

  async findAll<T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
  ): Promise<K[T]['entity'][]> {
    return this[`${resourceType}s`];
  }

  async findById<
    T extends ResourceTypeName,
    K extends IResourceTypeCoincidence,
  >(resourceType: T, id: string): Promise<K[T]['entity'] | undefined> {
    return this[`${resourceType as string}s`].find(
      (resourceEntity) => resourceEntity.id === id,
    );
  }

  async create<T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    params: K[T]['createDto'],
  ): Promise<K[T]['entity']> {
    const bcryptSalt = await bcrypt.genSalt(
      Number(this.configService.get('CRYPT_SALT')),
    );
    if (resourceType === 'user') {
      const newUser: K[Extract<T, 'user'>]['entity'] = {
        id: uuid(),
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...(params as K[Extract<T, 'user'>]['createDto']),
        password: await bcrypt.hash(
          (params as K[Extract<T, 'user'>]['createDto']).password,
          bcryptSalt,
        ),
        refreshToken: null,
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

  async update<T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    id: string,
    params: K[T]['updateDto'],
  ): Promise<K[T]['entity']> {
    if (resourceType === 'user') {
      const bcryptSalt = await bcrypt.genSalt(
        Number(this.configService.get('CRYPT_SALT')),
      );
      const userEntityIndex = this[`${resourceType as string}s`].findIndex(
        (user) => user.id === id,
      );
      this[`${resourceType as string}s`][userEntityIndex] = {
        ...this[`${resourceType as string}s`][userEntityIndex],
        password: await bcrypt.hash(
          (params as UpdateUserDto).newPassword,
          bcryptSalt,
        ),
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

  async delete<T extends ResourceTypeName>(
    resourceType: T,
    id: string,
  ): Promise<void> {
    this[`${resourceType as string}s`] = this[
      `${resourceType as string}s`
    ].filter((resourceInstance) => resourceInstance.id !== id);
  }

  async updateRefreshToken<
    T extends ResourceTypeName,
    K extends IResourceTypeCoincidence,
  >(
    resourceType: T,
    id: string,
    refreshToken: string,
  ): Promise<K[T]['entity']> {
    const user = this.users.find((user) => user.id === id);
    user.refreshToken = refreshToken;
    return user;
  }

  async getAllFavorites(): Promise<FavoriteEntity> {
    return this.favorites;
  }

  async addTrackToFavorites(id: string): Promise<FavoriteEntity> {
    this.favorites.tracks.push(id);
    return this.favorites;
  }

  async removeTrackFromFavorites(id: string): Promise<void> {
    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }

  async addAlbumToFavorites(id: string): Promise<FavoriteEntity> {
    this.favorites.albums.push(id);
    return this.favorites;
  }

  async removeAlbumFromFavorites(id: string): Promise<void> {
    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  async addArtistToFavorites(id: string): Promise<FavoriteEntity> {
    this.favorites.artists.push(id);
    return this.favorites;
  }

  async removeArtistFromFavorites(id: string): Promise<void> {
    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
  }
}

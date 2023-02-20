import { Injectable } from '@nestjs/common';
import { ResourceTypeName } from '../../types/resourceTypeName';
import { IDatabase } from '../../interfaces/database.interface';
import { IResourceTypeCoincidence } from '../../interfaces/resourceTypeCoincidence.interface';
import { FavoriteEntity } from '../../../favorites/entities/favorite.entity';
import { UpdateUserDto } from '../../../users/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../users/entities/user.entity';
import { FavouriteArtistSqlEntity } from './entities/favourite.artist.sql.entity';
import { TrackEntity } from '../../../tracks/entities/track.entity';
import { FavouriteTrackSqlEntity } from './entities/favourite.track.sql.entity';
import { FavouriteAlbumSqlEntity } from './entities/favourite.album.sql.entity';
import { AlbumEntity } from '../../../albums/entities/album.entity';
import { ArtistEntity } from '../../../artists/entities/artist.entity';
import { UserSqlEntity } from './entities/user.sql.entity';
import { AlbumSqlEntity } from './entities/album.sql.entity';
import { ArtistSqlEntity } from './entities/artist.sql.entity';
import { TrackSqlEntity } from './entities/track.sql.entity';

interface IResourceNameEntityCoincidence {
  user: Repository<UserEntity>;
  track: Repository<TrackEntity>;
  album: Repository<AlbumEntity>;
  artist: Repository<ArtistEntity>;
}

@Injectable()
export class TypeOrmStorage implements IDatabase {
  private ResourceNameEntityCoincidence: IResourceNameEntityCoincidence;

  constructor(
    @InjectRepository(UserSqlEntity)
    private userRepository: Repository<UserSqlEntity>,
    @InjectRepository(TrackSqlEntity)
    private trackRepository: Repository<TrackSqlEntity>,
    @InjectRepository(AlbumSqlEntity)
    private albumRepository: Repository<AlbumSqlEntity>,
    @InjectRepository(ArtistSqlEntity)
    private artistRepository: Repository<ArtistSqlEntity>,
    @InjectRepository(FavouriteTrackSqlEntity)
    private favouriteTrackRepository: Repository<FavouriteTrackSqlEntity>,
    @InjectRepository(FavouriteAlbumSqlEntity)
    private favouriteAlbumRepository: Repository<FavouriteAlbumSqlEntity>,
    @InjectRepository(FavouriteArtistSqlEntity)
    private favouriteArtistRepository: Repository<FavouriteArtistSqlEntity>,
  ) {
    this.ResourceNameEntityCoincidence = {
      user: this.userRepository,
      track: this.trackRepository,
      album: this.albumRepository,
      artist: this.artistRepository,
    };
  }

  async findAll<T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
  ): Promise<K[T]['entity'][]> {
    return this.ResourceNameEntityCoincidence[resourceType].find();
  }

  async findById<
    T extends ResourceTypeName,
    K extends IResourceTypeCoincidence,
  >(resourceType: T, id: string): Promise<K[T]['entity'] | undefined> {
    return this.ResourceNameEntityCoincidence[resourceType].findOneBy({ id });
  }

  async create<T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    params: K[T]['createDto'],
  ): Promise<K[T]['entity']> {
    if (resourceType === 'user') {
      const newUser: K[Extract<T, 'user'>]['entity'] =
        this.userRepository.create(
          params as K[Extract<T, 'user'>]['createDto'],
        );
      return this.userRepository.save(newUser);
    } else {
      const newResource: K[Exclude<T, 'user'>]['entity'] =
        this.ResourceNameEntityCoincidence[resourceType].create(
          params as K[Exclude<T, 'user'>]['createDto'],
        ) as K[Exclude<T, 'user'>]['entity'];
      if (resourceType === 'track') {
        // todo: разобраться почему не работает серез объект ResourceNameEntityCoincidence
        return this.trackRepository.save(newResource);
      }
      if (resourceType === 'album') {
        return this.albumRepository.save(newResource);
      }
      if (resourceType === 'artist') {
        return this.artistRepository.save(newResource);
      }
    }
  }

  async update<T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    id: string,
    params: K[T]['updateDto'],
  ): Promise<K[T]['entity']> {
    if (resourceType === 'user') {
      const user = await this.userRepository.findOneBy({ id });
      return this.userRepository.save({
        ...user,
        password: (params as UpdateUserDto).newPassword,
      });
    } else {
      const resourceEntity = await this.ResourceNameEntityCoincidence[
        resourceType
      ].findOneBy({ id });
      return (
        this.ResourceNameEntityCoincidence[resourceType] as Repository<
          K[T]['entity']
        >
      ).save({
        ...resourceEntity,
        ...params,
      });
    }
  }

  async delete<T extends ResourceTypeName, K extends IResourceTypeCoincidence>(
    resourceType: T,
    id: string,
  ): Promise<void> {
    const resourceEntity = await this.ResourceNameEntityCoincidence[
      resourceType
    ].findOneBy({ id });
    await (
      this.ResourceNameEntityCoincidence[resourceType] as Repository<
        K[T]['entity']
      >
    ).remove(resourceEntity);
  }

  async getAllFavorites(): Promise<FavoriteEntity> {
    const favouriteTracks = await this.favouriteTrackRepository.find();
    const favouriteAlbums = await this.favouriteAlbumRepository.find();
    const favouriteArtists = await this.favouriteArtistRepository.find();
    return {
      artists: favouriteTracks.map((track) => track.track.id),
      albums: favouriteAlbums.map((album) => album.album.id),
      tracks: favouriteArtists.map((artist) => artist.artist.id),
    };
  }

  async addTrackToFavorites(id: string): Promise<FavoriteEntity> {
    const trackEntity = await this.trackRepository.findOneBy({ id });
    const favouriteTrack = this.favouriteTrackRepository.create({
      track: trackEntity,
    });
    await this.favouriteTrackRepository.save(favouriteTrack);
    return this.getAllFavorites();
  }

  async removeTrackFromFavorites(id: string): Promise<void> {
    const trackEntity = await this.trackRepository.findOneBy({ id });
    const favouriteTrack = await this.favouriteTrackRepository.findOneBy({
      track: trackEntity,
    });
    await this.favouriteTrackRepository.remove(favouriteTrack);
  }

  async addAlbumToFavorites(id: string): Promise<FavoriteEntity> {
    const albumEntity = await this.albumRepository.findOneBy({ id });
    const favouriteAlbum = this.favouriteAlbumRepository.create({
      album: albumEntity,
    });
    await this.favouriteAlbumRepository.save(favouriteAlbum);
    return this.getAllFavorites();
  }

  async removeAlbumFromFavorites(id: string): Promise<void> {
    const albumEntity = await this.albumRepository.findOneBy({ id });
    const favouriteAlbum = await this.favouriteAlbumRepository.findOneBy({
      album: albumEntity,
    });
    await this.favouriteAlbumRepository.remove(favouriteAlbum);
  }

  async addArtistToFavorites(id: string): Promise<FavoriteEntity> {
    const artistEntity = await this.artistRepository.findOneBy({ id });
    const favouriteArtist = this.favouriteArtistRepository.create({
      artist: artistEntity,
    });
    await this.favouriteArtistRepository.save(favouriteArtist);
    return this.getAllFavorites();
  }

  async removeArtistFromFavorites(id: string): Promise<void> {
    const artistEntity = await this.artistRepository.findOneBy({ id });
    const favouriteArtist = await this.favouriteArtistRepository.findOneBy({
      artist: artistEntity,
    });
    await this.favouriteArtistRepository.remove(favouriteArtist);
  }
}

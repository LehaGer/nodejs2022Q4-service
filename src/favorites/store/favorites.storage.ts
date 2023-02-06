import { Injectable } from '@nestjs/common';
import { FavoriteEntity } from '../entities/favorite.entity';
import { IFavoriteStorage } from '../interfaces/favorite-storage.interface';

@Injectable()
export class InMemoryFavoriteStorage implements IFavoriteStorage {
  private favorites: FavoriteEntity = {
    tracks: [],
    albums: [],
    artists: [],
  };

  findAll(): FavoriteEntity {
    return this.favorites;
  }

  createTrack(id: string): FavoriteEntity {
    this.favorites.tracks.push(id);
    return this.favorites;
  }

  deleteTrack(id: string): void {
    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }

  createAlbum(id: string): FavoriteEntity {
    this.favorites.albums.push(id);
    return this.favorites;
  }

  deleteAlbum(id: string): void {
    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  createArtist(id: string): FavoriteEntity {
    this.favorites.artists.push(id);
    return this.favorites;
  }

  deleteArtist(id: string): void {
    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
  }
}

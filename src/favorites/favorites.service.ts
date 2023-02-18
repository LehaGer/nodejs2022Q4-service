import { Inject, Injectable } from '@nestjs/common';
import { IDatabase } from '../database/interfaces/database.interface';

@Injectable()
export class FavoritesService {
  constructor(@Inject('IDatabase') private storage: IDatabase) {}

  findAll() {
    return this.storage.getAllFavorites();
  }

  createTrack(id: string) {
    return this.storage.addTrackToFavorites(id);
  }

  deleteTrack(id: string) {
    this.storage.removeTrackFromFavorites(id);
  }

  createAlbum(id: string) {
    return this.storage.addAlbumToFavorites(id);
  }

  deleteAlbum(id: string) {
    this.storage.removeAlbumFromFavorites(id);
  }

  createArtist(id: string) {
    return this.storage.addArtistToFavorites(id);
  }

  deleteArtist(id: string) {
    this.storage.removeArtistFromFavorites(id);
  }
}

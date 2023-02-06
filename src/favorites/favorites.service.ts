import { Inject, Injectable } from '@nestjs/common';
import { IFavoriteStorage } from './interfaces/favorite-storage.interface';

@Injectable()
export class FavoritesService {
  constructor(@Inject('IFavoriteStorage') private storage: IFavoriteStorage) {}

  findAll() {
    return this.storage.findAll();
  }

  createTrack(id: string) {
    return this.storage.createTrack(id);
  }

  deleteTrack(id: string) {
    this.storage.deleteTrack(id);
  }

  createAlbum(id: string) {
    return this.storage.createAlbum(id);
  }

  deleteAlbum(id: string) {
    this.storage.deleteAlbum(id);
  }

  createArtist(id: string) {
    return this.storage.createArtist(id);
  }

  deleteArtist(id: string) {
    this.storage.deleteArtist(id);
  }
}

import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private storage: DatabaseService) {}

  async findAll() {
    return this.storage.getAllFavorites();
  }

  async createTrack(id: string) {
    return this.storage.addTrackToFavorites(id);
  }

  async deleteTrack(id: string) {
    await this.storage.removeTrackFromFavorites(id);
  }

  async createAlbum(id: string) {
    return this.storage.addAlbumToFavorites(id);
  }

  async deleteAlbum(id: string) {
    await this.storage.removeAlbumFromFavorites(id);
  }

  async createArtist(id: string) {
    return this.storage.addArtistToFavorites(id);
  }

  async deleteArtist(id: string) {
    await this.storage.removeArtistFromFavorites(id);
  }
}

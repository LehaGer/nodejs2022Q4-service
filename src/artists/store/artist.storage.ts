import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { IArtistStorage } from '../interfaces/artist-storage.interface';

@Injectable()
export class InMemoryArtistStorage implements IArtistStorage {
  private artists: ArtistEntity[] = [];

  create(params: CreateArtistDto): ArtistEntity {
    const newArtist: ArtistEntity = {
      id: uuid(),
      ...params,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  delete(id: string): void {
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }

  findById(id: string): ArtistEntity | undefined {
    return this.artists.find((artist) => artist.id === id);
  }

  findAll(): ArtistEntity[] {
    return this.artists;
  }

  update(id: string, params: UpdateArtistDto): ArtistEntity {
    const artistEntityIndex = this.artists.findIndex(
      (artist) => artist.id === id,
    );
    this.artists[artistEntityIndex] = {
      ...this.artists[artistEntityIndex],
      ...params,
    };
    return this.artists[artistEntityIndex];
  }
}

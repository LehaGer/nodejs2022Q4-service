import { ArtistEntity } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

export interface IArtistStorage {
  findAll: () => ArtistEntity[];
  findById: (id: string) => ArtistEntity | undefined;
  create: (params: CreateArtistDto) => ArtistEntity;
  update: (id: string, params: UpdateArtistDto) => ArtistEntity;
  delete: (id: string) => void;
}

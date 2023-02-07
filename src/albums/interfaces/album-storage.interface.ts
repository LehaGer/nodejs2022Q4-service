import { AlbumEntity } from '../entities/album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

export interface IAlbumStorage {
  findAll: () => AlbumEntity[];
  findById: (id: string) => AlbumEntity | undefined;
  create: (params: CreateAlbumDto) => AlbumEntity;
  update: (id: string, params: UpdateAlbumDto) => AlbumEntity;
  delete: (id: string) => void;
}

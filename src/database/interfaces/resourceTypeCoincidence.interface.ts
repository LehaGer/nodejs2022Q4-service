import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { UserEntity } from '../../users/entities/user.entity';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { CreateArtistDto } from '../../artists/dto/create-artist.dto';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { UpdateTrackDto } from '../../tracks/dto/update-track.dto';
import { UpdateArtistDto } from '../../artists/dto/update-artist.dto';
import { CreateAlbumDto } from '../../albums/dto/create-album.dto';
import { UpdateAlbumDto } from '../../albums/dto/update-album.dto';
import { CreateTrackDto } from '../../tracks/dto/create-track.dto';
import { TrackEntity } from '../../tracks/entities/track.entity';
import { ResourceTypeName } from '../types/resourceTypeName';
import { IResourceTypeInfo } from './resourceTypeInfo.interface';

export interface IResourceTypeCoincidence
  extends Record<ResourceTypeName, IResourceTypeInfo> {
  user: {
    entity: UserEntity;
    createDto: CreateUserDto;
    updateDto: UpdateUserDto;
    pluralForm: 'users';
  };
  track: {
    entity: TrackEntity;
    createDto: CreateTrackDto;
    updateDto: UpdateTrackDto;
    pluralForm: 'tracks';
  };
  artist: {
    entity: ArtistEntity;
    createDto: CreateArtistDto;
    updateDto: UpdateArtistDto;
    pluralForm: 'artists';
  };
  album: {
    entity: AlbumEntity;
    createDto: CreateAlbumDto;
    updateDto: UpdateAlbumDto;
    pluralForm: 'albums';
  };
}

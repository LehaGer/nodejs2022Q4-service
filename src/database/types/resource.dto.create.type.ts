import { CreateUserDto } from '../../users/dto/create-user.dto';
import { CreateTrackDto } from '../../tracks/dto/create-track.dto';
import { CreateAlbumDto } from '../../albums/dto/create-album.dto';
import { CreateArtistDto } from '../../artists/dto/create-artist.dto';

export type CreateDto =
  | CreateUserDto
  | CreateTrackDto
  | CreateAlbumDto
  | CreateArtistDto;

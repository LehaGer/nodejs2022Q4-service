import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { UpdateTrackDto } from '../../tracks/dto/update-track.dto';
import { UpdateAlbumDto } from '../../albums/dto/update-album.dto';
import { UpdateArtistDto } from '../../artists/dto/update-artist.dto';

export type UpdateDto =
  | UpdateUserDto
  | UpdateTrackDto
  | UpdateAlbumDto
  | UpdateArtistDto;

import { ArtistEntity } from '../../artists/entities/artist.entity';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { TrackEntity } from '../../tracks/entities/track.entity';

export class FavoriteDto {
  artists: ArtistEntity[]; // favorite artists ids
  albums: AlbumEntity[]; // favorite albums ids
  tracks: TrackEntity[]; // favorite tracks ids
}

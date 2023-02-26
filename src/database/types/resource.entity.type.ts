import { UserEntity } from '../../users/entities/user.entity';
import { TrackEntity } from '../../tracks/entities/track.entity';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { ArtistEntity } from '../../artists/entities/artist.entity';

export type ResourceEntity =
  | UserEntity
  | TrackEntity
  | AlbumEntity
  | ArtistEntity;

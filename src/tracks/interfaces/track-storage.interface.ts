import { TrackEntity } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

export interface ITrackStorage {
  findAll: () => TrackEntity[];
  findById: (id: string) => TrackEntity | undefined;
  create: (params: CreateTrackDto) => TrackEntity;
  update: (id: string, params: UpdateTrackDto) => TrackEntity;
  delete: (id: string) => void;
}

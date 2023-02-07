import { ITrackStorage } from '../interfaces/track-storage.interface';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TrackEntity } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class InMemoryTrackStorage implements ITrackStorage {
  private tracks: TrackEntity[] = [];

  create(params: CreateTrackDto): TrackEntity {
    const newTrack: TrackEntity = {
      id: uuid(),
      ...params,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  delete(id: string): void {
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }

  findById(id: string): TrackEntity | undefined {
    return this.tracks.find((track) => track.id === id);
  }

  findAll(): TrackEntity[] {
    return this.tracks;
  }

  update(id: string, params: UpdateTrackDto): TrackEntity {
    const trackEntityIndex = this.tracks.findIndex((track) => track.id === id);
    this.tracks[trackEntityIndex] = {
      ...this.tracks[trackEntityIndex],
      ...params,
    };
    return this.tracks[trackEntityIndex];
  }
}

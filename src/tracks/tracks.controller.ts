import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UuidDto } from './dto/uuid.dto';
import { ArtistsService } from '../artists/artists.service';
import { FavoritesService } from '../favorites/favorites.service';
import { AlbumsService } from '../albums/albums.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('track')
@Controller('track')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly albumService: AlbumsService,
    private readonly artistService: ArtistsService,
    private readonly favoriteService: FavoritesService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createTrackDto: CreateTrackDto) {
    if (createTrackDto.artistId !== null) {
      if (!this.artistService.findOne(createTrackDto.artistId))
        throw new UnprocessableEntityException();
    }
    if (createTrackDto.albumId !== null) {
      if (!this.albumService.findOne(createTrackDto.albumId))
        throw new UnprocessableEntityException();
    }
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: UuidDto) {
    const track = this.tracksService.findOne(params.id);
    if (!track) throw new NotFoundException();
    return track;
  }

  @Put(':id')
  update(@Param() params: UuidDto, @Body() updateTrackDto: UpdateTrackDto) {
    const track = this.tracksService.findOne(params.id);
    if (!track) throw new NotFoundException();
    return this.tracksService.update(params.id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: UuidDto) {
    const track = this.tracksService.findOne(params.id);
    if (!track) throw new NotFoundException();
    const favoriteTrack = this.favoriteService
      .findAll()
      .tracks.find((trackId) => trackId === params.id);
    if (favoriteTrack) this.favoriteService.deleteTrack(params.id);
    return this.tracksService.remove(params.id);
  }
}

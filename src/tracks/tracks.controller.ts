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
  UseGuards,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UuidDto } from './dto/uuid.dto';
import { ArtistsService } from '../artists/artists.service';
import { FavoritesService } from '../favorites/favorites.service';
import { AlbumsService } from '../albums/albums.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

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
  @UseGuards(AuthGuard)
  async create(@Body() createTrackDto: CreateTrackDto) {
    if (createTrackDto.artistId !== null) {
      if (!(await this.artistService.findOne(createTrackDto.artistId)))
        throw new UnprocessableEntityException();
    }
    if (createTrackDto.albumId !== null) {
      if (!(await this.albumService.findOne(createTrackDto.albumId)))
        throw new UnprocessableEntityException();
    }
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param() params: UuidDto) {
    const track = await this.tracksService.findOne(params.id);
    if (!track) throw new NotFoundException();
    return track;
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param() params: UuidDto,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = await this.tracksService.findOne(params.id);
    if (!track) throw new NotFoundException();
    return this.tracksService.update(params.id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async remove(@Param() params: UuidDto) {
    const track = await this.tracksService.findOne(params.id);
    if (!track) throw new NotFoundException();
    const favoriteTrack = (await this.favoriteService.findAll()).tracks.find(
      (trackId) => trackId === params.id,
    );
    if (favoriteTrack) await this.favoriteService.deleteTrack(params.id);
    return this.tracksService.remove(params.id);
  }
}

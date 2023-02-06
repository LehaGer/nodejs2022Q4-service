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
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UuidDto } from './dto/uuid.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumsService } from './albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly artistService: ArtistsService,
    private readonly trackService: TracksService,
    private readonly favoriteService: FavoritesService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    if (createAlbumDto.artistId !== null) {
      if (!this.artistService.findOne(createAlbumDto.artistId))
        throw new UnprocessableEntityException();
    }
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: UuidDto) {
    const album = this.albumsService.findOne(params.id);
    if (!album) throw new NotFoundException();
    return album;
  }

  @Put(':id')
  update(@Param() params: UuidDto, @Body() updateAlbumDto: UpdateAlbumDto) {
    const album = this.albumsService.findOne(params.id);
    if (!album) throw new NotFoundException();
    return this.albumsService.update(params.id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: UuidDto) {
    const album = this.albumsService.findOne(params.id);
    if (!album) throw new NotFoundException();

    const tracks = this.trackService
      .findAll()
      .filter((track) => track.albumId === params.id);
    tracks.forEach((track) =>
      this.trackService.update(track.id, {
        albumId: null,
      }),
    );

    const favoriteAlbum = this.favoriteService
      .findAll()
      .albums.find((albumId) => albumId === params.id);
    if (favoriteAlbum) this.favoriteService.deleteAlbum(params.id);

    return this.albumsService.remove(params.id);
  }
}

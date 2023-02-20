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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('album')
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
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    if (createAlbumDto.artistId !== null) {
      if (!(await this.artistService.findOne(createAlbumDto.artistId)))
        throw new UnprocessableEntityException();
    }
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  async findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: UuidDto) {
    const album = await this.albumsService.findOne(params.id);
    if (!album) throw new NotFoundException();
    return album;
  }

  @Put(':id')
  async update(
    @Param() params: UuidDto,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = await this.albumsService.findOne(params.id);
    if (!album) throw new NotFoundException();
    return this.albumsService.update(params.id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() params: UuidDto) {
    const album = await this.albumsService.findOne(params.id);
    if (!album) throw new NotFoundException();

    const tracks = (await this.trackService.findAll()).filter(
      (track) => track.albumId === params.id,
    );
    await Promise.all(
      tracks.map(
        async (track) =>
          await this.trackService.update(track.id, {
            albumId: null,
          }),
      ),
    );

    const favoriteAlbum = (await this.favoriteService.findAll()).albums.find(
      (albumId) => albumId === params.id,
    );
    if (favoriteAlbum) await this.favoriteService.deleteAlbum(params.id);

    return this.albumsService.remove(params.id);
  }
}

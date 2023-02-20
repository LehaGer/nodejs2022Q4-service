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
} from '@nestjs/common';
import { UuidDto } from './dto/uuid.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistsService } from './artists.service';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { FavoritesService } from '../favorites/favorites.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('artist')
@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly trackService: TracksService,
    private readonly albumService: AlbumsService,
    private readonly favoriteService: FavoritesService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  async findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: UuidDto) {
    const artist = await this.artistsService.findOne(params.id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  @Put(':id')
  async update(
    @Param() params: UuidDto,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistsService.findOne(params.id);
    if (!artist) throw new NotFoundException();
    return this.artistsService.update(params.id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() params: UuidDto) {
    const artist = await this.artistsService.findOne(params.id);
    if (!artist) throw new NotFoundException();

    await Promise.all(
      (
        await this.trackService.findAll()
      )
        .filter((track) => track.artistId === params.id)
        .map(
          async (track) =>
            await this.trackService.update(track.id, {
              artistId: null,
            }),
        ),
    );

    await Promise.all(
      (
        await this.albumService.findAll()
      )
        .filter((album) => album.artistId === params.id)
        .map(
          async (album) =>
            await this.albumService.update(album.id, {
              artistId: null,
            }),
        ),
    );

    const favoriteAlbum = (await this.favoriteService.findAll()).artists.find(
      (artistId) => artistId === params.id,
    );
    if (favoriteAlbum) await this.favoriteService.deleteArtist(params.id);

    return this.artistsService.remove(params.id);
  }
}

import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoriteType } from './types/favorite.type';
import { IncomeParamsFavoritesDto } from './dto/income-params-favorites.dto';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { FavoriteDto } from './dto/favorite.dto';
import { FavoriteEntity } from './entities/favorite.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('favorites')
@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TracksService,
    private readonly albumService: AlbumsService,
    private readonly artistService: ArtistsService,
  ) {}

  @Get()
  async findAll() {
    const favoriteEntity = await this.favoritesService.findAll();
    return this.convertEntityToDto(favoriteEntity);
  }

  @Post(':target/:id')
  async create(
    @Param() incomeParamsDto: IncomeParamsFavoritesDto,
  ): Promise<FavoriteDto> {
    switch (incomeParamsDto.target) {
      case FavoriteType.track:
        if (incomeParamsDto.id !== null) {
          if (!(await this.trackService.findOne(incomeParamsDto.id)))
            throw new UnprocessableEntityException();
        }
        return this.convertEntityToDto(
          await this.favoritesService.createTrack(incomeParamsDto.id),
        );
      case FavoriteType.album:
        if (incomeParamsDto.id !== null) {
          if (!(await this.albumService.findOne(incomeParamsDto.id)))
            throw new UnprocessableEntityException();
        }
        return this.convertEntityToDto(
          await this.favoritesService.createAlbum(incomeParamsDto.id),
        );
      case FavoriteType.artist:
        if (incomeParamsDto.id !== null) {
          if (!(await this.artistService.findOne(incomeParamsDto.id)))
            throw new UnprocessableEntityException();
        }
        return this.convertEntityToDto(
          await this.favoritesService.createArtist(incomeParamsDto.id),
        );
      default:
        throw new NotFoundException();
    }
  }

  @Delete(':target/:id')
  @HttpCode(204)
  async remove(@Param() incomeParamsDto: IncomeParamsFavoritesDto) {
    switch (incomeParamsDto.target) {
      case FavoriteType.track: {
        const track = (await this.favoritesService.findAll()).tracks.find(
          (trackId) => trackId === incomeParamsDto.id,
        );
        if (!track) throw new NotFoundException();
        return this.favoritesService.deleteTrack(incomeParamsDto.id);
      }
      case FavoriteType.album: {
        const album = (await this.favoritesService.findAll()).albums.find(
          (albumId) => albumId === incomeParamsDto.id,
        );
        if (!album) throw new NotFoundException();
        return this.favoritesService.deleteAlbum(incomeParamsDto.id);
      }
      case FavoriteType.artist: {
        const artist = (await this.favoritesService.findAll()).artists.find(
          (artistId) => artistId === incomeParamsDto.id,
        );
        if (!artist) throw new NotFoundException();
        return this.favoritesService.deleteArtist(incomeParamsDto.id);
      }
      default: {
        throw new NotFoundException();
      }
    }
  }

  private async convertEntityToDto(favoriteEntity: FavoriteEntity) {
    const favoriteDto: FavoriteDto = {
      artists: [],
      albums: [],
      tracks: [],
    };
    favoriteDto.tracks = await Promise.all(
      favoriteEntity.tracks.map(
        async (trackId) => await this.trackService.findOne(trackId),
      ),
    );
    favoriteDto.albums = await Promise.all(
      favoriteEntity.albums.map(
        async (albumId) => await this.albumService.findOne(albumId),
      ),
    );
    favoriteDto.artists = await Promise.all(
      favoriteEntity.artists.map(
        async (artistId) => await this.artistService.findOne(artistId),
      ),
    );
    return favoriteDto;
  }
}

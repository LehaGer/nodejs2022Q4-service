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
  findAll() {
    const favoriteEntity = this.favoritesService.findAll();
    return this.convertEntityToDto(favoriteEntity);
  }

  @Post(':target/:id')
  create(@Param() incomeParamsDto: IncomeParamsFavoritesDto): FavoriteDto {
    switch (incomeParamsDto.target) {
      case FavoriteType.track:
        if (incomeParamsDto.id !== null) {
          if (!this.trackService.findOne(incomeParamsDto.id))
            throw new UnprocessableEntityException();
        }
        return this.convertEntityToDto(
          this.favoritesService.createTrack(incomeParamsDto.id),
        );
      case FavoriteType.album:
        if (incomeParamsDto.id !== null) {
          if (!this.albumService.findOne(incomeParamsDto.id))
            throw new UnprocessableEntityException();
        }
        return this.convertEntityToDto(
          this.favoritesService.createAlbum(incomeParamsDto.id),
        );
      case FavoriteType.artist:
        if (incomeParamsDto.id !== null) {
          if (!this.artistService.findOne(incomeParamsDto.id))
            throw new UnprocessableEntityException();
        }
        return this.convertEntityToDto(
          this.favoritesService.createArtist(incomeParamsDto.id),
        );
      default:
        throw new NotFoundException();
    }
  }

  @Delete(':target/:id')
  @HttpCode(204)
  remove(@Param() incomeParamsDto: IncomeParamsFavoritesDto) {
    switch (incomeParamsDto.target) {
      case FavoriteType.track: {
        const track = this.favoritesService
          .findAll()
          .tracks.find((trackId) => trackId === incomeParamsDto.id);
        if (!track) throw new NotFoundException();
        return this.favoritesService.deleteTrack(incomeParamsDto.id);
      }
      case FavoriteType.album: {
        const album = this.favoritesService
          .findAll()
          .albums.find((albumId) => albumId === incomeParamsDto.id);
        if (!album) throw new NotFoundException();
        return this.favoritesService.deleteAlbum(incomeParamsDto.id);
      }
      case FavoriteType.artist: {
        const artist = this.favoritesService
          .findAll()
          .artists.find((artistId) => artistId === incomeParamsDto.id);
        if (!artist) throw new NotFoundException();
        return this.favoritesService.deleteArtist(incomeParamsDto.id);
      }
      default: {
        throw new NotFoundException();
      }
    }
  }

  private convertEntityToDto(favoriteEntity: FavoriteEntity) {
    const favoriteDto: FavoriteDto = {
      artists: [],
      albums: [],
      tracks: [],
    };
    favoriteDto.tracks = favoriteEntity.tracks.map((trackId) =>
      this.trackService.findOne(trackId),
    );
    favoriteDto.albums = favoriteEntity.albums.map((albumId) =>
      this.albumService.findOne(albumId),
    );
    favoriteDto.artists = favoriteEntity.artists.map((artistId) =>
      this.artistService.findOne(artistId),
    );
    return favoriteDto;
  }
}

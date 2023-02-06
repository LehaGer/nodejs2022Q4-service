import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoriteType } from './types/favorite.type';
import { IncomeParamsFavoritesDto } from './dto/income-params-favorites.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post(':target/:id')
  create(@Param() commonDto: IncomeParamsFavoritesDto) {
    switch (commonDto.target) {
      case FavoriteType.track:
        return this.favoritesService.createTrack(commonDto.id);
      case FavoriteType.album:
        return this.favoritesService.createAlbum(commonDto.id);
      case FavoriteType.artist:
        return this.favoritesService.createArtist(commonDto.id);
      default:
        throw new NotFoundException();
    }
  }

  @Delete(':target/:id')
  @HttpCode(204)
  remove(@Param() incomeParamsFavorite: IncomeParamsFavoritesDto) {
    switch (incomeParamsFavorite.target) {
      case FavoriteType.track: {
        const track = this.favoritesService
          .findAll()
          .tracks.find((trackId) => trackId === incomeParamsFavorite.id);
        if (!track) throw new NotFoundException();
        return this.favoritesService.deleteTrack(incomeParamsFavorite.id);
      }
      case FavoriteType.album: {
        const album = this.favoritesService
          .findAll()
          .albums.find((albumId) => albumId === incomeParamsFavorite.id);
        if (!album) throw new NotFoundException();
        return this.favoritesService.deleteAlbum(incomeParamsFavorite.id);
      }
      case FavoriteType.artist: {
        const artist = this.favoritesService
          .findAll()
          .artists.find((artistId) => artistId === incomeParamsFavorite.id);
        if (!artist) throw new NotFoundException();
        return this.favoritesService.createArtist(incomeParamsFavorite.id);
      }
      default: {
        throw new NotFoundException();
      }
    }
  }
}

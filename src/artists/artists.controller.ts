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

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: UuidDto) {
    const artist = this.artistsService.findOne(params.id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  @Put(':id')
  update(@Param() params: UuidDto, @Body() updateArtistDto: UpdateArtistDto) {
    const artist = this.artistsService.findOne(params.id);
    if (!artist) throw new NotFoundException();
    return this.artistsService.update(params.id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: UuidDto) {
    const artist = this.artistsService.findOne(params.id);
    if (!artist) throw new NotFoundException();
    return this.artistsService.remove(params.id);
  }
}

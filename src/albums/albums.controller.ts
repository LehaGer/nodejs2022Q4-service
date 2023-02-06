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
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UuidDto } from './dto/uuid.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createAlbumDto: CreateAlbumDto) {
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
    return this.albumsService.remove(params.id);
  }
}

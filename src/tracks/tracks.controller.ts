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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UuidDto } from './dto/uuid.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createTrackDto: CreateTrackDto) {
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
    return this.tracksService.remove(params.id);
  }
}

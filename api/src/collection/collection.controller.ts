import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User_ } from '../user/user.decorator';
import { User } from '../user/user.entity';
import { CollectionService } from './collection.service';
import { CreateCollectionDto, UpdateCollectionDto } from './collection.types';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  async findAll(@User_() user: User) {
    return await this.collectionService.findAll(user);
  }

  @Get('/:id')
  async findOne(@User_() user: User, @Param('id') id: number) {
    return await this.collectionService.findOneById(user, id);
  }

  @Post()
  async create(
    @User_() user: User,
    @Body() createCollectionDto: CreateCollectionDto,
  ) {
    return await this.collectionService.create(user, createCollectionDto);
  }

  @Post('/:id')
  async update(
    @User_() user: User,
    @Param('id') id: number,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return await this.collectionService.update(user, id, updateCollectionDto);
  }

  @Delete('/:id')
  async remove(@User_() user: User, @Param('id') id: number) {
    return this.collectionService.remove(user, id);
  }
}

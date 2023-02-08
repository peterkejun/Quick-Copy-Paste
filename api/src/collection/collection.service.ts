import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { betterRepository, BetterRepository } from '../utils/BetterRepository';
import { Repository } from 'typeorm';
import { Collection } from './collection.entity';
import { CreateCollectionDto, UpdateCollectionDto } from './collection.types';
import { isNullish } from 'src/utils/nullish';
import { makeHttpException } from 'src/utils/http-response';

@Injectable()
export class CollectionService {
  private readonly collectionRepository: BetterRepository<Collection>;

  constructor(
    @InjectRepository(Collection)
    private readonly __base_repo__: Repository<Collection>,
  ) {
    this.collectionRepository = betterRepository(__base_repo__);
  }

  async findOneById(user: User, id: number): Promise<Collection> {
    return await this.collectionRepository.findOneOrFailWithHttpException(
      { where: { user, id }, relations: { user: false } },
      HttpStatus.NOT_FOUND,
      'COLLECTION:NOT_FOUND',
    );
  }

  async findAll(user: User): Promise<Collection[]> {
    return await this.collectionRepository.find({ where: { user } });
  }

  async create(
    user: User,
    createCollectionDto: CreateCollectionDto,
  ): Promise<Collection> {
    // name must be nonempty
    if (
      isNullish(createCollectionDto.name) ||
      createCollectionDto.name.length === 0
    ) {
      throw makeHttpException(
        HttpStatus.BAD_REQUEST,
        'COLLECTION:INVALID_NAME',
      );
    }
    // name must be unique
    if (
      await this.collectionRepository.exist({
        where: { user, name: createCollectionDto.name },
      })
    ) {
      throw makeHttpException(HttpStatus.BAD_REQUEST, 'COLLECTION:NAME_EXISTS');
    }
    let collection = this.collectionRepository.create();
    collection.name = createCollectionDto.name;
    collection.user = user;
    collection = await this.collectionRepository.save(collection);
    delete collection.user;
    return collection;
  }

  async update(
    user: User,
    id: number,
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    let collection =
      await this.collectionRepository.findOneOrFailWithHttpException(
        {
          where: { user, id },
          relations: { user: false },
        },
        HttpStatus.NOT_FOUND,
        'COLLECTION:NOT_FOUND',
      );
    if (!isNullish(updateCollectionDto.name)) {
      if (updateCollectionDto.name.length === 0) {
        throw makeHttpException(
          HttpStatus.BAD_REQUEST,
          'COLLECTION:INVALID_NAME',
        );
      }
      collection.name = updateCollectionDto.name;
    }
    collection = await this.collectionRepository.save(collection);
    delete collection.user;
    return collection;
  }

  async remove(user: User, id: number): Promise<void> {
    const collection =
      await this.collectionRepository.findOneOrFailWithHttpException(
        { where: { user, id } },
        HttpStatus.NOT_FOUND,
        'COLLECTION:NOT_FOUND',
      );
    this.collectionRepository.remove(collection);
  }
}

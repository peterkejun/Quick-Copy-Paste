import { HttpException, HttpStatus } from '@nestjs/common';
import { FindOneOptions, ObjectLiteral, Repository } from 'typeorm';
import { HTTP_ERROR_MSG } from './error-response';
import { makeHttpException } from './http-response';

export function betterRepository<Entity extends ObjectLiteral>(
  repository: Repository<Entity>,
) {
  return repository.extend({
    /**
     * Finds first entity by a given find options.
     * If entity was not found in the database - rejects with given exception.
     */
    async findOneOrFailWithException(
      options: FindOneOptions<Entity>,
      exception: HttpException,
    ): Promise<Entity> {
      const entity = await this.findOne(options);
      if (entity === null) {
        throw exception;
      }
      return entity;
    },

    /**
     * Finds first entity by a given find options.
     * If entity was not found in the database - rejects with given HTTP exception.
     */
    async findOneOrFailWithHttpException(
      options: FindOneOptions<Entity>,
      status: HttpStatus,
      msg: HTTP_ERROR_MSG = null,
    ): Promise<Entity> {
      const exception = makeHttpException(status, msg);
      const entity = await this.findOneOrFailWithException(options, exception);
      return entity;
    },
  });
}

export type BetterRepository<Entity extends ObjectLiteral> = ReturnType<
  typeof betterRepository<Entity>
>;

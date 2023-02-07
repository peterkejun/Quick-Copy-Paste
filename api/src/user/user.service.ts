import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { makeHttpException } from '../utils/http-response';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private SALT_ROUNDS = 10;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async hashPassword(password: string): Promise<string | null> {
    try {
      return bcrypt.hash(password, this.SALT_ROUNDS);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async assertUserExists(uid: number): Promise<User> {
    const user = await this.findOneById(uid);
    if (!user) {
      throw makeHttpException(HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    // email must be unique
    if (await this.usersRepository.exist({ where: { email } })) {
      throw makeHttpException(HttpStatus.BAD_REQUEST, 'USER:EMAIL_EXISTS');
    }
    // password must be nonempty
    if (password.length === 0) {
      throw makeHttpException(HttpStatus.BAD_REQUEST, 'USER:INVALID_PASSWORD');
    }
    password = await this.hashPassword(password);
    // first name and last name not empty:
    if (firstName.length === 0 || lastName.length === 0) {
      throw makeHttpException(HttpStatus.BAD_REQUEST, 'USER:INVALID_NAME');
    }
    // create user
    const user = this.usersRepository.create();
    user.email = email;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserModule } from './user/user.module';
import { SnippetController } from './snippet/snippet.controller';
import { SnippetService } from './snippet/snippet.service';
import { SnippetModule } from './snippet/snippet.module';
import { SnippetTagModule } from './snippet-tag/snippet-tag.module';
import { SnippetTagService } from './snippet-tag/snippet-tag.service';
import { CollectionModule } from './collection/collection.module';
import { CollectionController } from './collection/collection.controller';
import { CollectionService } from './collection/collection.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'quick-copy-paste',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development',
    }),
    AuthModule,
    UserModule,
    SnippetModule,
    SnippetTagModule,
    CollectionModule,
  ],
  controllers: [AppController, SnippetController, CollectionController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    SnippetService,
    SnippetTagService,
    CollectionService,
  ],
})
export class AppModule {}

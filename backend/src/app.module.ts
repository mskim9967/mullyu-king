import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeORMConfig } from './config/typeorm.config';
import { ItemsModule } from './items/items.module';
import { CategoriesModule } from './categories/categories.module';
import { StaticModule } from './static/static.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StoreInfoModule } from './store-info/store-info.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'admin-application/build'),
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    ItemsModule,
    CategoriesModule,
    StaticModule,
    AuthModule,
    StoreInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

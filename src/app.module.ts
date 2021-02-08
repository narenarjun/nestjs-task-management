import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_CONNECTION_URL: Joi.required(),
      }),
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_CONNECTION_URL,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
        autoLoadEntities: true,
        synchronize: true, //! this should be disabled when deploying to prod,but it's great for development
      }),
    }),
  ],
})
export class AppModule {}

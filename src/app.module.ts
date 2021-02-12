import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as Joi from '@hapi/joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_CONNECTION_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
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
    AuthModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { ReportsModule } from './reports/reports.module';


@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User],
      synchronize: true,
    }),
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

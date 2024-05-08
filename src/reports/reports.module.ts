import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports: [UserModule,
        JwtModule.register({
            secret: 'rachid',
            signOptions: { expiresIn: '1d' },
          })],
    controllers: [ReportsController]
})
export class ReportsModule {}

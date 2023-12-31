import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { jwtSecret } from '../guard/constant/jwt.constant';
import { UserController } from './controllers/user.controller';
import { PasswordService } from './services/password.service';
import { UserService } from './services/user.service';
import { GuardModule } from '../guard/guard.module';
import { ListController } from './controllers/list.controller';

@Module({
  imports: [
    DatabaseModule,
    GuardModule
  ],
  controllers: [UserController, ListController],
  providers: [ UserService, PasswordService],
  exports: []
})
export class MainModule {}

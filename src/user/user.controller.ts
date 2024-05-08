import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/CraeteUser.dto';
import { UserModule } from './user.module';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    @Post('signup')
    @UsePipes(ValidationPipe)
    singup(@Body() user: CreateUserDto)
    {
        return this.userService.signup(user);
    }
    @Post('signin')
    @UsePipes(ValidationPipe)
    signin(@Body() user: CreateUserDto)
    {
        return this.userService.signin(user);
    }
}

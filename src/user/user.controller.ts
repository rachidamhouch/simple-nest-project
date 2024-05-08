import { Body, Controller, Get, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/CraeteUser.dto';
import { UserModule } from './user.module';
import { UserService } from './user.service';
import { Response, Request } from 'express';


@Controller('user')
@UsePipes(ValidationPipe)
export class UserController {
    constructor(private userService: UserService){}
    @Post('signup')
    async singup(@Body() user: CreateUserDto)
    {
        return await this.userService.signup(user);
    }
    @Post('signin')
    async signin(@Body() user: CreateUserDto, @Res({passthrough: true}) res: Response)
    {
        return await this.userService.signin(user, res);
    }
    @Get('whoami')
    async whoami(@Req() req: Request)
    {
        return await this.userService.whoami(req);
    }
    @Post('logout')
    logout(@Res({passthrough: true}) res: Response)
    {
        res.clearCookie('jwt');
        return "Loged out";
    }
}

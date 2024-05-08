import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/user/guards/auth.guard';
import { User } from './user.decorator';


@Controller('reports')
export class ReportsController {
    constructor(private readonly jwtService: JwtService){}
    @Get()
    @UseGuards(JwtAuthGuard)
    get(@Req() req)
    {
        console.log(req.user);
        return "Hiii";
    }
}

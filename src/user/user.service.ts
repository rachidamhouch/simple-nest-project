import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dtos/CraeteUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Injectable()
export class UserService {
    constructor (@InjectRepository(User) private repo: Repository<User>, private jwtService: JwtService){}
    async signup(user: CreateUserDto)
    {
        const is_exist = await this.repo.findOne({where: {email: user.email }});
        if (is_exist)
            throw new BadRequestException('The user already exists!');
        const new_user = await this.repo.create(user);

        new_user.password = await bcrypt.hash(user.password, 10);
        await this.repo.save(new_user);
        delete new_user.password;
        return new_user;
    }
    async signin(user: CreateUserDto, res: Response)
    {
        const is_exist = await this.repo.findOne({where: {email: user.email }});
        if (!is_exist)
            throw new BadRequestException('Uncorrect email or password!');
        if (await bcrypt.compare(user.password, is_exist.password))
        {
            delete is_exist.password;
            const payload = { user: is_exist }
            const jwt = this.jwtService.sign(payload , { expiresIn: '1h' });
            res.cookie('jwt', jwt, { httpOnly: true });
            return is_exist;
        }
        else
            throw new BadRequestException('uncorrect email or password!');
    }
    async whoami(req: Request)
    {
        try{
            return await this.jwtService.verify(req.cookies['jwt']).user;
        }catch
        {
            throw new UnauthorizedException("You have to log in");
        }
        
    }
}

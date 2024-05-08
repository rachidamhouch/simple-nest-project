import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/CraeteUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor (@InjectRepository(User) private repo: Repository<User>){}
    async signup(user: CreateUserDto)
    {
        const is_exist = await this.repo.findOne({where: {email: user.email }});
        if (is_exist)
            throw new BadRequestException('The user already exists!');
        const new_user = await this.repo.create(user);

        new_user.password = await bcrypt.hash(user.password, 10);
        return await this.repo.save(new_user);
    }
    async signin(user: CreateUserDto)
    {
        const is_exist = await this.repo.findOne({where: {email: user.email }});
        if (!is_exist)
            throw new BadRequestException('Uncorrect email or password!');
        if (await bcrypt.compare(user.password, is_exist.password))
            return "Signed in^^";
        else
            throw new BadRequestException('uncorrect email or password!');
    }
}

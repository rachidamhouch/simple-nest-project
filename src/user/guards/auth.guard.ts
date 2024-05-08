import { Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class JwtAuthGuard implements CanActivate{
  constructor(private jwtService: JwtService) {}

  
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    if (request.cookies.jwt) {
      request.user = this.jwtService.verify(request.cookies.jwt);
    } else {
      response.send({message: 'Unauthorized'});
      return false;
    }
    return true;
  }
}

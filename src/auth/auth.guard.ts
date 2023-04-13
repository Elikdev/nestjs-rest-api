import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false;
      }

      const token = authHeader.split(' ')[1];

      const decoded = this.jwtService.verify(token);

      request.user = decoded;
      return true;
    } catch (error: any) {
     console.log(error)
     if(error.name == "JsonWebTokenError") {
      return false
     }

     if(error.name == "TokenExpiredError") {
      return false
     }
     return false
    }
  }
}
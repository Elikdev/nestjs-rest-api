import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
 constructor(@Inject('MESSAGE') private readonly message?: string) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
   let statusCode = context.switchToHttp().getResponse().statusCode
   console.log(statusCode)
   console.log(this.message)
    return next.handle().pipe(
      map((data) => ({
        statusCode,
        message: this.message ? this.message : [200, 201].includes(statusCode) ? 'Request successful'  : "Request failed",
        data,
      })),
    );
  }
}
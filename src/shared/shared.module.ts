import { Module } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptors'

@Module({
  providers: [
    {
      provide: 'MESSAGE',
      useValue: 'Request completed',
    },
    TransformInterceptor,
  ],
  exports: [TransformInterceptor]
})
export class SharedModule {}

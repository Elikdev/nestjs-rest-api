import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class createItemDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  
  @IsNumber()
  readonly qty: number;

  @IsOptional()
  @IsString()
  readonly description: string;
}

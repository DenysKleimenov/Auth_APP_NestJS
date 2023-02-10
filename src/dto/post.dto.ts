import { IsNotEmpty, MinLength } from 'class-validator';

export class postDto {
  @IsNotEmpty()
  @MinLength(5)
  readonly title: string;

  @IsNotEmpty()
  @MinLength(5)
  readonly description: string;
}

import { IsNotEmpty, MinLength } from 'class-validator';

export class commentDto {
  @IsNotEmpty()
  readonly post_id: number;

  @IsNotEmpty()
  @MinLength(5)
  readonly text: string;
}

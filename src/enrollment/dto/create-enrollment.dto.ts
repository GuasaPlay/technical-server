import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum EnrollmentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export class CreateEnrollmentDto {
  @IsString({ message: 'El DNI debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El DNI es obligatorio' })
  @MinLength(10, { message: 'El DNI debe tener exactamente 10 caracteres' })
  @MaxLength(10, { message: 'El DNI debe tener exactamente 10 caracteres' })
  dni: string;

  @IsString({ message: 'Los nombres deben ser una cadena de texto' })
  @IsNotEmpty({ message: 'Los nombres son obligatorios' })
  @MinLength(2, { message: 'Los nombres deben tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'Los nombres no pueden exceder 100 caracteres' })
  names: string;

  @IsString({ message: 'Los apellidos deben ser una cadena de texto' })
  @IsNotEmpty({ message: 'Los apellidos son obligatorios' })
  @MinLength(2, { message: 'Los apellidos deben tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'Los apellidos no pueden exceder 100 caracteres' })
  surnames: string;

  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @IsUUID('all', {
    message: 'El ID de la escuela de origen debe ser un UUID válido',
  })
  @IsNotEmpty({ message: 'El ID de la escuela de origen es obligatorio' })
  originSchoolId: string;

  @IsUUID('all', {
    message: 'El ID del curso ofrecido debe ser un UUID válido',
  })
  @IsNotEmpty({ message: 'El ID del curso ofrecido es obligatorio' })
  careerOfferedId: string;

  @IsNumber({}, { message: 'La tarifa de inscripción debe ser un número' })
  @IsNotEmpty({ message: 'La tarifa de inscripción es obligatoria' })
  enrollmentFee: number;
}

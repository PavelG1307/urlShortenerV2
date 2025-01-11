import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsDateInFuture(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsDateInFuture',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (value instanceof Date) {
            return value > new Date();
          }
          return false;
        },
        defaultMessage(args: ValidationArguments) {
          // Сообщение по умолчанию
          return `${args.property} should be a future date`;
        },
      },
    });
  };
}

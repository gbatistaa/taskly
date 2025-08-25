import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

// tipo que garante que o parâmetro seja um Enum
type EnumType = Record<string, string | number>;

export function IsEnumValue<T extends EnumType>(
  enumType: T,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isEnumValue',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [enumType],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [enumObj] = args.constraints as [T];
          return (
            (typeof value === 'string' || typeof value === 'number') &&
            Object.values(enumObj).includes(value)
          );
        },
        defaultMessage(args: ValidationArguments) {
          const [enumObj] = args.constraints as [T];
          return `${args.property} must be one of: ${Object.values(
            enumObj,
          ).join(', ')}`;
        },
      },
    });
  };
}

import { PasswordValidationMiddleware } from './password-validation.middleware';

describe('PasswordValidationMiddleware', () => {
  it('should be defined', () => {
    expect(new PasswordValidationMiddleware()).toBeDefined();
  });
});

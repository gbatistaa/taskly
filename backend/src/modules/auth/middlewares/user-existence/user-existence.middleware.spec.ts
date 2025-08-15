import { UserExistenceMiddleware } from './user-existence.middleware';

describe('UserExistenceMiddleware', () => {
  it('should be defined', () => {
    expect(new UserExistenceMiddleware()).toBeDefined();
  });
});

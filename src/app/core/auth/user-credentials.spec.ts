import { UserCredentials } from './user-credentials';

describe('UserCredentials', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new UserCredentials()).toBeTruthy();
  });

  it('should create an instance with constructor', () => {
    const credentials = new UserCredentials('test', 'pass');
    expect(credentials).toBeTruthy();

    expect(credentials.username).toBe('test');
    expect(credentials.password).toBe('pass');
  });
});

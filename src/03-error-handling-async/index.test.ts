import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue(42)).resolves.toBe(42);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'Error in function';
    expect(() => throwError(message)).toThrowError(message);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const customError = new MyAwesomeError();
    expect(() => throwCustomError()).toThrowError(customError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const customError = new MyAwesomeError();
    await expect(rejectCustomError()).rejects.toThrow(customError);
  });
});

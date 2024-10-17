import { getBankAccount } from '.';
import { random } from 'lodash';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');
  return {
    __esModule: true,
    ...originalModule,
    random: jest.fn(),
  };
});

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialValue = 100;
    const bankAccount = getBankAccount(initialValue);
    expect(bankAccount.getBalance()).toBe(initialValue);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialValue = 100;
    const bankAccount = getBankAccount(initialValue);
    expect(() => bankAccount.withdraw(200)).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialValue}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const fromBankAccount = getBankAccount(100);
    const toBankAccount = getBankAccount(200);
    expect(() => fromBankAccount.transfer(300, toBankAccount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${fromBankAccount.getBalance()}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const fromBankAccount = getBankAccount(100);
    expect(() => fromBankAccount.transfer(100, fromBankAccount)).toThrow(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(100);
    bankAccount.deposit(100);
    expect(bankAccount.getBalance()).toBe(200);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(100);
    bankAccount.withdraw(20);
    expect(bankAccount.getBalance()).toBe(80);
  });

  test('should transfer money', () => {
    const fromBankAccount = getBankAccount(100);
    const toBankAccount = getBankAccount(200);
    fromBankAccount.transfer(10, toBankAccount);
    expect(toBankAccount.getBalance()).toBe(210);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockReturnValue(111);
    const bankAccount = getBankAccount(100);
    const balance = await bankAccount.fetchBalance();
    expect(balance).toBe(111);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (random as jest.Mock).mockReturnValue(111);
    const bankAccount = getBankAccount(100);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(111);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock).mockReturnValue(0);
    const bankAccount = getBankAccount(100);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});

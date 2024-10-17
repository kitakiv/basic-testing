import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    (mockOne as jest.Mock).mockImplementation(() => 'mockOne');
    (mockTwo as jest.Mock).mockImplementation(() => 'mockTwo');
    (mockThree as jest.Mock).mockImplementation(() => 'mockThree');
    expect(mockOne()).toBe('mockOne');
    expect(mockTwo()).toBe('mockTwo');
    expect(mockThree()).toBe('mockThree');
  });

  test('unmockedFunction should log into console', () => {
    expect(unmockedFunction()).toBeUndefined();
  });
});

import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

jest.mock('axios');

const data = {
  id: 1,
  title: 'foo',
  body: 'bar',
  userId: 1,
};

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn((_) => Promise.resolve({ data }));
    (axios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });
    const baseUrl = 'https://jsonplaceholder.typicode.com';
    await throttledGetDataFromApi('/posts');
    expect(axios.create).toHaveBeenCalledWith({ baseURL: baseUrl });
    expect((axios.create as jest.Mock).mock.lastCall[0]).toEqual({
      baseURL: baseUrl,
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn((_) => Promise.resolve({ data }));
    (axios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });
    jest.advanceTimersByTime(THROTTLE_TIME);
    await throttledGetDataFromApi('/posts');
    expect(mockGet).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    const mockGet = jest.fn((_) => Promise.resolve({ data }));
    (axios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });
    jest.advanceTimersByTime(THROTTLE_TIME);
    const result = await throttledGetDataFromApi('/posts');
    expect(result).toEqual(data);
  });
});

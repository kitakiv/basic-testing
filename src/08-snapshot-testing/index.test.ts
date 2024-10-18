import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList([1]);
    const result = { value: 1, next: { value: null, next: null } };
    expect(list).toStrictEqual(result);
  });

  test('should generate linked list from values 2', () => {
    const list = generateLinkedList([1, 2]);
    expect(list).toMatchSnapshot({
      value: expect.anything(),
      next: expect.objectContaining({
        value: expect.anything(),
        next: expect.anything(),
      }),
    });
  });
});

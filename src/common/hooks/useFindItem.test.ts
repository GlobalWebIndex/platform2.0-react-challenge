import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { useFindItem } from './useFindItem';
import { server } from '../../mocks/server';

describe('useFindItem Hook', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  test('returns cached item', () => {
    const dataById: Record<string, string> = { 1: 'Cached item' };

    const { result } = renderHook(() => useFindItem<string>('1', dataById, '/fake-url-to-test-useFindItem-hook'));

    const [data, loading, error] = result.current;

    expect(data).toEqual('Cached item');
    expect(loading).toBeFalsy();
    expect(error).toBeNull();
  });

  test('fetches item if its not cached in store', () => {
    const dataById: Record<string, string> = {};

    const { result } = renderHook(() => useFindItem<string>('1', dataById, '/fake-url-to-test-useFindItem-hook'));

    waitFor(() => {
      const [data, loading, error] = result.current;

      expect(data).toEqual('Fetched item');
      expect(loading).toBeFalsy();
      expect(error).toBeNull();
    });
  });
});

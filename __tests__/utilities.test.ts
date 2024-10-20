import '@testing-library/react-native/extend-expect';

import { extractPathFromUrl, isValidPath } from '@/utilities/utilities';

describe('utilities', () => {
  test('extractPathFromUrl returns a valid pathname', () => {
    const data = 'http://validurl/details/00000000-0000-0000-0000-000000000000';
    const urlResponse = extractPathFromUrl(data);
    expect(urlResponse).toEqual({
      pathname: '/details/00000000-0000-0000-0000-000000000000',
      pathnameError: null,
    });
  });

  test('extractPathFromUrl fails and throws an error which is an instance of Error', () => {
    const data = '';
    const urlResponse = extractPathFromUrl(data);
    expect(urlResponse).toEqual({ pathname: null, pathnameError: 'Invalid URL: ' });
  });

  test('extractPathFromUrl fails and throws an error which is NOT an instance of Error', () => {
    const originalURL = global.URL;
    global.URL = jest.fn(() => {
      throw 'non-error object';
    });

    const data = 'http://fakeurl/invalidRoute/';
    const result = extractPathFromUrl(data);
    expect(result.pathname).toBeNull();
    expect(result.pathnameError).toBe('Invalid URL');

    // Restore the original global URL object
    global.URL = originalURL;
  });

  test('isValidPath returns true because is a valid url', () => {
    const data = '/details/00000000-0000-0000-0000-000000000000';
    const isValid = isValidPath(data);
    expect(isValid).toBeTruthy();
  });

  test('isValidPath returns false because is an invalid url', () => {
    const data = '/details/fakeId';
    const isValid = isValidPath(data);
    expect(isValid).toBeFalsy();
  });
});

/**
 *
 * @param data - The data of the QR Code, this value comes from a QR once it's scanned
 * @returns the pathName from the QR Code scanned
 */
export const extractPathFromUrl = (data: string) => {
  try {
    const url = new URL(data);
    return { pathname: url.pathname, pathnameError: null };
  } catch (error) {
    if (error instanceof Error) return { pathname: null, pathnameError: error.message };
    else return { pathname: null, pathnameError: 'Invalid URL' };
  }
};

/**
 *
 * @param path - The path of the iPet Url
 * @returns a boolean, true if it is a validPath, false if it is not
 */
export const isValidPath = (path: string) => {
  const regex = /^\/details\/[0-9a-fA-F-]{36}$/;
  return regex.test(path);
};

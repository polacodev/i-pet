export const extractPetIdFromUrl = (url: string): string | null => {
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname;
      const match = path.match(/\/pet\/([a-f0-9-]+)/i);
      return match ? match[0] : null;
    } catch (error) {
      console.error('Invalid URL:', error);
      return null;
    }
  };

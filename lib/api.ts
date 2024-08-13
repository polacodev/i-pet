import pets from './pets.json';

export const getPets = async () => {
  try {
    const response = await pets;
    return response;
  } catch (error) {
    console.log('ERROR: ', error);
  }
};

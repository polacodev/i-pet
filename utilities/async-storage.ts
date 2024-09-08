import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    return error;
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    return error;
  }
};

export const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (e) {
    // read key error
    console.log(e);
  }
};

export const removeValue = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
    console.log(e);
  }
};

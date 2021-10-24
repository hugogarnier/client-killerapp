import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (token) => {
  try {
    await AsyncStorage.setItem("@storage_Key", token);
  } catch (e) {
    // saving error
  }
};

export const getStoreData = async () => {
  try {
    const value = await AsyncStorage.getItem("@storage_Key");
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

export const deleteStoreData = async () => {
  try {
    await AsyncStorage.removeItem("@storage_Key");
  } catch (e) {
    // error reading value
  }
};

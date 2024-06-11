import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageItem {
  // Define your expected structure here
  [key: string]: any; // Try to avoid 'any' by specifying a more detailed structure
}

export async function loadString(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('Failed to load string:', error);
    return null;
  }
}

export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error('Failed to save string:', error);
    return false;
  }
}

export async function load(key: string): Promise<StorageItem | null> {
  try {
    const item = await AsyncStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Failed to load item:', error);
    return null;
  }
}

export async function save(key: string, value: StorageItem): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Failed to save item:', error);
    return false;
  }
}

export async function remove(key: string): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Failed to remove item:', error);
    return true;
  }
}

export async function clear(): Promise<boolean> {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Failed to clear storage:', error);
    return true;
  }
}

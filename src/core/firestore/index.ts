import remoteConfig from '@react-native-firebase/remote-config';

export const fetchConfig = async (): Promise<void> => {
  try {
    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 30000,
    });
    await remoteConfig().fetchAndActivate();
  } catch (error) {
    console.error('Error fetching remote config:', error);
  }
};

export const refreshConfig = async (): Promise<void> => {
  try {
    await remoteConfig().fetchAndActivate();
  } catch (error) {
    console.error('Error refreshing remote config:', error);
  }
};

export const getRemoteValue = (
  key: string,
  defaultValue: string = '',
): string => {
  try {
    const value = remoteConfig().getValue(key).asString();
    console.log('Name: ', value);
    return value || defaultValue;
  } catch (error) {
    console.error(`Error getting remote value for key ${key}:`, error);
    return defaultValue;
  }
};

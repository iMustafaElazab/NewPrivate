import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Chat: undefined;
  Settings: undefined;
  Image: undefined;
  Sample: undefined;
  Profile: undefined;
  Notification: undefined;
};

type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type {RootStackParamList, RootStackScreenProps};

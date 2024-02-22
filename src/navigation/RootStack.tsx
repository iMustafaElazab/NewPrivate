import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import type {RootStackParamList} from 'types';

// Screens.
import Splash from 'screens/Splash';
import home from 'screens/home';
import login from 'screens/login';
import register from 'screens/register';
import chat from 'screens/chat';
import settings from 'screens/settings';
import image from 'screens/image';
import sample from 'screens/sample';
import profile from 'screens/profile';
import notification from 'screens/notification';

// Navigators.
// TODO: Add navigators imports here.

// Modals.
// TODO: Add modals imports here.

const Stack = createNativeStackNavigator<RootStackParamList>();

export default React.memo(() => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      {/* Screens */}
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={home} />
      <Stack.Screen name="Login" component={login} />
      <Stack.Screen name="Register" component={register} />
      <Stack.Screen name="Chat" component={chat} />
      <Stack.Screen name="Settings" component={settings} />
      <Stack.Screen name="Image" component={image} />
      <Stack.Screen name="Sample" component={sample} />
      <Stack.Screen name="Profile" component={profile} />
      <Stack.Screen name="Notification" component={notification} />

      {/* Navigators */}
      {/* TODO: Add nested navigators here. */}

      {/* Modals */}
      <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
        }}>
        {/* TODO: Add modals screens here. */}
      </Stack.Group>
    </Stack.Navigator>
  );
});

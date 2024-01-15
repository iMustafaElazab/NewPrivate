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
import forget_password from 'screens/forget_password';
import dashboard from 'screens/mtc/dashboard';

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
      <Stack.Screen name="Forget_Password" component={forget_password} />
      <Stack.Screen name="Chat" component={chat} />
      <Stack.Screen name="Settings" component={settings} />
      <Stack.Screen name="Image" component={image} />
      <Stack.Screen name="DashBoard" component={dashboard} />

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

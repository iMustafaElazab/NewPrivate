import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import type {RootStackParamList} from 'types';

// Screens.
import Splash from 'screens/Splash';

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

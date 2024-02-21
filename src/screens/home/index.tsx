import AppColors from 'enums/AppColors';
import React from 'react';
import {ImageBackground, View} from 'react-native';
import {ms, vs} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {Button, IconButton} from 'roqay-react-native-common-components';
import {RootStackScreenProps} from 'types/navigation';
import {type RootState} from 'store';
import {Text} from 'react-native-paper';

export default React.memo((props: RootStackScreenProps<'Home'>) => {
  // #region Logger
  const getLogMessage = (message: string) => {
    return `## Home Screen: ${message}`;
  };

  const state = useSelector((state: RootState) => state.user);

  const {navigation} = props;

  const getPageContent = () => (
    <ImageBackground
      source={require('../../assets/images/background.jpg')}
      style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          text="BotGPT"
          style={{
            width: '50%',
            marginVertical: vs(8),
            padding: 8,
            backgroundColor: '#74AA9C',
          }}
          onPress={() => navigation.navigate('Chat')}
        />
        <Text style={{fontSize: 20, color: 'white'}}>
          {JSON.stringify(state.base_url)}
        </Text>
        <Button
          text="Dall -E"
          style={{
            width: '50%',
            padding: 8,
            marginVertical: vs(8),
            backgroundColor: 'black',
          }}
          onPress={() => navigation.navigate('Image')}
        />
        <Button
          text="Settings"
          style={{width: '50%', marginVertical: vs(8), padding: 8}}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </ImageBackground>
  );

  return <>{getPageContent()}</>;
});

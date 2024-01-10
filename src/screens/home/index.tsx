import AppColors from 'enums/AppColors';
import React from 'react';
import {ImageBackground, View} from 'react-native';
import {ms, vs} from 'react-native-size-matters';
import {Button, IconButton} from 'roqay-react-native-common-components';
import {RootStackScreenProps} from 'types/navigation';

export default React.memo((props: RootStackScreenProps<'Home'>) => {
  // #region Logger
  const getLogMessage = (message: string) => {
    return `## Home Screen: ${message}`;
  };

  const {navigation} = props;

  const getSettingsDir = () => (
    <IconButton
      iconName={'cog-outline'}
      onPress={() => {
        navigation.navigate('Settings');
      }}
      size={vs(40)}
      style={{
        backgroundColor: AppColors.INVERSE_PRIMARY,
        borderRadius: 12,
        alignSelf: 'flex-end',
        margin: ms(32),
      }}
    />
  );

  const getPageContent = () => (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={{flex: 1}}>
      {getSettingsDir()}
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          text="ChatGpt"
          style={{width: '50%', marginVertical: vs(8), padding: 8}}
          onPress={() => navigation.navigate('Chat')}
        />
        <Button
          text="Dalle -E"
          style={{width: '50%', padding: 8}}
          onPress={() => navigation.navigate('Image')}
        />
      </View>
    </ImageBackground>
  );

  return <>{getPageContent()}</>;
});

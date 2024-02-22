import Screen from 'components/Screen';
import {useProfileQuery} from 'hooks/useAuthMutation';
import React from 'react';
import {Text} from 'react-native-paper';
import {IconButton} from 'roqay-react-native-common-components';
import {RootStackScreenProps} from 'types/navigation';

export default React.memo((props: RootStackScreenProps<'Profile'>) => {
  const {navigation} = props;

  const getLogMessage = (message: string) => {
    return `## Login Screen: ${message}`;
  };
  const {data: userData, error, isLoading} = useProfileQuery();
  return (
    <Screen>
      <IconButton
        onPress={() => navigation.navigate('Notification')}
        shouldRasterizeIOS
        size={24}
        iconName="bell"
      />
      <Text>{JSON.stringify(userData)}</Text>
    </Screen>
  );
});

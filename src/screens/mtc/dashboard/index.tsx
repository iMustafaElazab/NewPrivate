import React from 'react';
import {Text} from 'roqay-react-native-common-components';
import {RootStackScreenProps} from 'types/navigation';

export default React.memo((props: RootStackScreenProps<'DashBoard'>) => {
  return (
    <>
      <Text>DashBoard</Text>
    </>
  );
});

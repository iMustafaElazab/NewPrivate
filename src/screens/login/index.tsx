import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {getUserApi} from 'store/api';

export default React.memo(() => {

  const {
    data,
    isLoading: isHomeLoading,
    isFetching: isHomeFetching,
    error: homeError,
    refetch: refetchHome,
  } = getUserApi({});

  React.useEffect(() => {
    // Check if error is session expired then show it in dialog for logout purpose.
    if (homeError && isErrorWithStatus(401, homeError)) {
      //  dispatch(setErrorDialogMessage(translate('session_expired')));
    }

    if (data) {
      console.log(getLogMessage('data'), data);
      dispatch(getHomeResult(data));
      getLogMessage(JSON.stringify(data));
    }
  }, [isHomeLoading, isHomeFetching, homeError, data]);

  return (
    <View>
      <Text>jnflshdf</Text>
      <Text>jnflshdf</Text>
      <Text>jnflshdf</Text>
    </View>
  );
});

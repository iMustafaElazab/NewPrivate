import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getHomeApi} from 'store/api/homeApi';
import {RootState, getHomeResult} from 'store/index';
import {isErrorWithStatus} from 'utils/ErrorHandlingUtils';

export default React.memo(() => {
  // #region Logger
  const getLogMessage = (message: string) => {
    return `## Home Screen: ${message}`;
  };

  const dispatch = useDispatch();
  const {products, banners, ads} = useSelector(
    (state: RootState) => state.home,
  );

  const {
    data,
    isLoading: isHomeLoading,
    isFetching: isHomeFetching,
    error: homeError,
    refetch: refetchHome,
  } = getHomeApi({});

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
  }, [isHomeLoading, isHomeFetching, homeError, data, dispatch]);

  return (
    <View>
      <Text>{JSON.stringify(products)}</Text>
      <Text>jsdljlsjlf</Text>
    </View>
  );
});

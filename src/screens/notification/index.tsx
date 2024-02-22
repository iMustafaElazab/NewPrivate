import Screen from 'components/Screen';
import {useNotificationQuery} from 'hooks/useAuthMutation';
import React from 'react';
import {View} from 'react-native';
import {ms} from 'react-native-size-matters';
import {FlatList, Text} from 'roqay-react-native-common-components';

export default React.memo(() => {
  const {data, error, isLoading, hasNextPage, fetchNextPage} =
    useNotificationQuery();
  const getLogMessage = (message: string) => {
    return `## Sample Screen: ${message}`;
  };

  const keyExtractor = (_: any, index: number) => index.toString();

  const todoItem = ({item}) => (
    <View
      style={{
        backgroundColor: 'red',
        margin: ms(16),
        borderRadius: ms(4),
        padding: ms(4),
      }}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <Screen>
      <Text>jfllfslhdfs</Text>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={todoItem}
        //   onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        // ListFooterComponent={
        //   isLoading && hasNextPage ? listFooterComponent() : null
        // }
      />
    </Screen>
  );
});

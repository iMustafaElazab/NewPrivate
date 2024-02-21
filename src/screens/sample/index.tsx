import Screen from 'components/Screen';
import useGetAllPosts from 'hooks/useGetPosts';
import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {ms} from 'react-native-size-matters';
import {Button, Text} from 'roqay-react-native-common-components';

export default React.memo(() => {
  const {data, error, isLoading, hasNextPage, fetchNextPage} = useGetAllPosts();
  const getLogMessage = (message: string) => {
    return `## Sample Screen: ${message}`;
  };
  // const dataFlated = data?.pages?.map(page => page).flat();
  // const keyExtractor = (_: any, index: number) => index.toString();

  const onEndReached = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const todoItem = ({item}) => (
    <View
      style={{
        backgroundColor: 'red',
        margin: ms(16),
        borderRadius: ms(4),
        padding: ms(4),
      }}>
      <Text>{item.id}</Text>
      <Text>{item.title}</Text>
    </View>
  );

  const listFooterComponent = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
      }}>
      <ActivityIndicator size={'large'} />
    </View>
  );
  return (
    <View>
      {/* <Button text="test" />
      {isLoading ? (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <FlatList
          data={dataFlated}
          keyExtractor={keyExtractor}
          renderItem={todoItem}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isLoading && hasNextPage ? listFooterComponent() : null
          }
        />
      )} */}
    </View>
  );
});

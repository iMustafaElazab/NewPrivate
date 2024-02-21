import React from 'react';
import {
  SafeAreaView,
  useColorScheme,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useInfiniteQuery} from 'react-query';
const BASE_URL = 'https://rickandmortyapi.com/api/character';
const DARK = '#2C4C3B';
const LIGHT = '#FFFFFF';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {backgroundColor: isDarkMode ? DARK : LIGHT, flex: 1};

  const apiCharacter = {
    fetchAllCharacter: async ({pageParam}) => {
      let url = `${BASE_URL}`;
      if (pageParam !== undefined) {
        url += `/?page=${pageParam}`;
      }
      let data = await fetch(url);
      return data.json();
    },
  };

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [clickedItem, setClickedItem] = React.useState({});

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery('randomCharacter', apiCharacter.fetchAllCharacter, {
    getNextPageParam: lastPage => {
      if (lastPage?.info?.next !== null) {
        return lastPage?.info?.next.split('=')[1];
      }
      return lastPage?.info?.next?.split('=')[1];
    },
  });

  const _loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderSpinner = () => {
    return (
      <View style={backgroundStyle}>
        <View style={{height: 6}} />

        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          style={styles.shimmerPlaceHolderStyle}
        />

        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          style={styles.shimmerPlaceHolderStyle}
        />

        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          style={styles.shimmerPlaceHolderStyle}
        />
      </View>
    );
  };

  function formatDate(date) {
    if (typeof date !== undefined) {
      return dayjs(date).format('DD-MM-YYYY, HH:mm A');
    }
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        View
        key={item.id}
        onPress={() => {
          toggleModal();
          setClickedItem({...item});
        }}
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: isDarkMode ? LIGHT : DARK,
          elevation: 5,
        }}>
        <FastImage
          style={{height: 150, width: 150}}
          source={{
            uri: item.image,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />

        <View
          style={{
            width: '60%',
            display: 'flex',
            alignItems: 'flex-start',
            marginLeft: '2%',
            justifyContent: 'space-evenly',
          }}>
          <Text
            style={{
              color: isDarkMode ? DARK : LIGHT,
              fontFamily: fonts.SpecialEliteRegular,
            }}>
            Name : {item.name}
          </Text>
          <Text
            style={{
              color: isDarkMode ? DARK : LIGHT,
              fontFamily: fonts.SpecialEliteRegular,
            }}>
            Species : {item.species}
          </Text>
          {item.type !== '' && (
            <Text
              style={{
                color: isDarkMode ? DARK : LIGHT,
                fontFamily: fonts.SpecialEliteRegular,
              }}>
              Type : {item.type}
            </Text>
          )}
          <Text
            style={{
              color: isDarkMode ? DARK : LIGHT,
              fontFamily: fonts.SpecialEliteRegular,
            }}>
            Gender: {item.gender}
          </Text>
          <Text
            style={{
              color: isDarkMode ? DARK : LIGHT,
              fontFamily: fonts.SpecialEliteRegular,
            }}>
            Location: {item.location.name}
          </Text>
          <Text
            style={{
              color: isDarkMode ? DARK : LIGHT,
              fontFamily: fonts.SpecialEliteRegular,
            }}>
            Origin: {item.origin.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _itemSeparatorComponent = () => {
    return (
      <View
        style={{backgroundColor: backgroundStyle.backgroundColor, margin: 8}}
      />
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Animatable.Text
        animation="pulse"
        iterationCount="infinite"
        style={{
          color: isDarkMode ? LIGHT : DARK,
          fontSize: 20,
          lineHeight: 30,
          textAlign: 'center',
          letterSpacing: 5,
          fontFamily: fonts.rickMorty,
        }}>
        Rick and Morty
      </Animatable.Text>

      {isLoading ? (
        <View style={[backgroundStyle, {...styles.shimmerContainer}]}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            style={styles.shimmerPlaceHolderStyle}
          />

          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            style={styles.shimmerPlaceHolderStyle}
          />

          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            style={styles.shimmerPlaceHolderStyle}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            style={styles.shimmerPlaceHolderStyle}
          />

          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            style={styles.shimmerPlaceHolderStyle}
          />
        </View>
      ) : (
        <>
          <FlashList
            vertical
            numColumns={1}
            renderItem={_renderItem}
            onEndReached={_loadMore}
            onEndReachedThreshold={0.05}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={_itemSeparatorComponent}
            data={data?.pages?.map(page => page?.results).flat()}
            contentContainerStyle={{paddingHorizontal: 10, paddingTop: 10}}
            ListFooterComponent={!isFetchingNextPage ? renderSpinner : null}
            getItemType={({item}) => {
              return item;
            }}
            estimatedItemSize={200}
          />

          <Modal
            isVisible={isModalVisible}
            deviceWidth={deviceWidth}
            deviceHeight={deviceHeight}>
            <View
              style={{flex: 0.8, backgroundColor: !isDarkMode ? LIGHT : DARK}}>
              <FastImage
                style={{flex: 1}}
                source={{
                  uri: clickedItem?.image,
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.cacheOnly,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />

              <View
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  margin: '3%',
                  justifyContent: 'space-evenly',
                  flex: 0.6,
                }}>
                <Text
                  style={{
                    color: !isDarkMode ? DARK : LIGHT,
                    fontSize: 15,
                    fontFamily: fonts.SpecialEliteRegular,
                  }}>
                  Name : {clickedItem.name}
                </Text>
                <Text
                  style={{
                    color: !isDarkMode ? DARK : LIGHT,
                    fontSize: 15,
                    fontFamily: fonts.SpecialEliteRegular,
                  }}>
                  Species : {clickedItem?.species}
                </Text>

                {clickedItem.type !== '' && (
                  <Text
                    style={{
                      color: !isDarkMode ? DARK : LIGHT,
                      fontSize: 15,
                      fontFamily: fonts.SpecialEliteRegular,
                    }}>
                    Type : {clickedItem?.type}
                  </Text>
                )}

                <Text
                  style={{
                    color: !isDarkMode ? DARK : LIGHT,
                    fontSize: 15,
                    fontFamily: fonts.SpecialEliteRegular,
                  }}>
                  Gender: {clickedItem?.gender}
                </Text>

                <Text
                  style={{
                    color: !isDarkMode ? DARK : LIGHT,
                    fontSize: 15,
                    fontFamily: fonts.SpecialEliteRegular,
                  }}>
                  Location: {clickedItem?.location?.name}
                </Text>

                <Text
                  style={{
                    color: !isDarkMode ? DARK : LIGHT,
                    fontSize: 15,
                    fontFamily: fonts.SpecialEliteRegular,
                  }}>
                  Origin: {clickedItem?.origin?.name}
                </Text>
              </View>

              <TouchableOpacity
                onPress={toggleModal}
                style={{
                  backgroundColor: isDarkMode ? LIGHT : DARK,
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: !isDarkMode ? LIGHT : DARK,
                    textTransform: 'uppercase',
                    fontSize: 15,
                    letterSpacing: 3,
                    fontFamily: fonts.SpecialEliteRegular,
                  }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  shimmerContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  shimmerPlaceHolderStyle: {
    overflow: 'hidden',
    height: 150,
    width: '100%',
    marginBottom: 16,
  },
});

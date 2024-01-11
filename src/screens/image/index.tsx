import React, {useEffect, useState} from 'react';
import {FlatList, Image, ImageBackground, Keyboard, View} from 'react-native';
import {
  IconButton,
  Text,
  TextInput,
} from 'roqay-react-native-common-components';
import {RootStackScreenProps} from 'types/navigation';
import {ActivityIndicator, Appbar} from 'react-native-paper';
import {ScaledSheet, ms, s, vs} from 'react-native-size-matters';
import {Controller, useForm} from 'react-hook-form';
import AppColors from 'enums/AppColors';
import {imageCompletionsApi} from 'store/api/chatApi';
import {Message} from 'types/api/ChatCompletionResponseDTO';
import Share from 'react-native-share';
import {openUrl} from 'utils/LinkingUtils';
import Voice from '@react-native-community/voice';

export default React.memo((props: RootStackScreenProps<'Image'>) => {
  const getLogMessage = (message: string) => {
    return `## Image Screen: ${message}`;
  };

  const [submitImageCompletion] = imageCompletionsApi();

  const [text, setText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const {navigation} = props;

  const renderMessage = ({item}: {item: Message}) => {
    const color = item.role === 'user' ? 'white' : 'black';

    if (item.role === 'user') {
      return (
        <View style={imageStyles.userImageMessage}>
          <Text style={{color: color}}>{item?.content}</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item.content}}
            style={imageStyles.imageMessage}
          />
          <IconButton
            iconName="share"
            size={25}
            style={imageStyles.icon}
            onPress={() => shareContent(item.content)}
          />
          <IconButton
            iconName="download"
            size={25}
            style={imageStyles.icon}
            onPress={() => downloadImage(item.content)}
          />
        </View>
      );
    }
  };

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const speechStartHandler = e => {
    console.log('speechStart successful', e);
  };

  const speechEndHandler = e => {
    setLoading(false);
    console.log('stop handler', e);
  };

  const speechResultsHandler = e => {
    const text = e.value[0];
    setText(text);
  };

  const startRecording = async () => {
    setLoading(true);
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const clear = () => {
    setText('');
  };
  const shareContent = (url: string | undefined | null) => {
    Share.open({url})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  const downloadImage = (url: string | undefined | null) => {
    openUrl(url);
  };

  const onSubmitPress = async (data: FormValues) => {
    console.log(getLogMessage('data'), data);
    Keyboard.dismiss();
    setText('');
    const userMessage: Message = {
      content: text,
      role: 'user',
    };

    setMessages(prevMessages => [userMessage, ...prevMessages]);

    const formData = {
      prompt: text,
      size: '512x512',
    };

    try {
      const result = await submitImageCompletion({body: formData}).unwrap();
      console.log(
        getLogMessage('content'),
        JSON.stringify(result.data?.[0].url),
      );

      const responseMessage = result.data?.[0].url;

      if (responseMessage) {
        setMessages(prevMessages => [
          {content: responseMessage, role: 'assistant'},
          ...prevMessages,
        ]);

        console.log(getLogMessage('responseMessage'), responseMessage);
      }
    } catch (error) {
      console.log(getLogMessage('content'), error);
    }
  };

  type FormValues = {
    search: string;
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors: formErrors},
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      search: undefined,
    },
  });

  const getHeaderContent = () => (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="DALL·E" />
      </Appbar.Header>
    </>
  );

  const getInput = () => (
    <Controller
      name="search"
      control={control}
      rules={{
        required: {
          value: true,
          message: 'Empty Search',
        },
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          style={imageStyles.input}
          placeholder="Search"
          errorProps={{errorMessage: formErrors.search?.message}}
          onBlur={onBlur}
          onChange={onChange}
          onChangeText={onChange}
          value={value}
          underlineColor="transparent"
          underlineColorAndroid={'transparent'}
          returnKeyType="done"
        />
      )}
    />
  );

  const getMicInput = () =>
    isLoading ? (
      <ActivityIndicator
        size="small"
        color="black"
        style={{marginStart: s(6)}}
      />
    ) : (
      <IconButton
        iconName="microphone"
        size={25}
        style={imageStyles.icon}
        onPress={startRecording}
      />
    );

  const getSendInput = () => (
    <IconButton
      onPress={handleSubmit(onSubmitPress)}
      iconName="send"
      size={vs(40)}
      style={{backgroundColor: AppColors.INVERSE_PRIMARY, borderRadius: 12}}
    />
  );

  const getChatContent = () => (
    <View
      style={{
        flexDirection: 'row',
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 16,
        alignItems: 'center',
      }}>
      {getMicInput()}
      {
        <TextInput
          style={imageStyles.input}
          placeholder="Search"
          errorProps={{errorMessage: formErrors.search?.message}}
          onChangeText={(text: string) => setText(text)}
          value={text}
          underlineColor="transparent"
        />
      }
    </View>
  );

  const getBottomContent = () => (
    <View style={imageStyles.row}>
      {getChatContent()}
      {getSendInput()}
    </View>
  );

  const getMessagesContent = () => (
    <View style={{flex: 1, padding: ms(16)}}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={messages}
        renderItem={renderMessage}
        style={{flex: 1, marginBottom: vs(70)}}
        inverted={true}
      />
    </View>
  );

  const getPageContent = () => (
    <ImageBackground
      source={require('../../assets/images/background.jpg')}
      style={{flex: 1}}>
      {getHeaderContent()}
      {getMessagesContent()}
      {getBottomContent()}
    </ImageBackground>
  );

  return <View style={{flex: 1}}>{getPageContent()}</View>;
});

const imageStyles = ScaledSheet.create({
  bottom: {
    backgroundColor: 'aquamarine',
  },
  row: {
    flexDirection: 'row',
    borderRadius: ms(8),
    position: 'absolute',
    bottom: 0,
    marginBottom: vs(32),
    height: vs(48),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    borderRadius: vs(16),
    backgroundColor: 'transparent',
    height: vs(48),
    flex: 1,
  },
  icon: {
    backgroundColor: AppColors.INVERSE_PRIMARY,
    borderRadius: 12,
    marginStart: s(8),
  },
  userImageMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#60beda',
    borderBottomStartRadius: vs(8),
    borderTopStartRadius: vs(8),
    borderTopEndRadius: vs(8),
    padding: ms(8),
    marginVertical: vs(4),
  },
  imageMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f3f2ed',
    padding: ms(8),
    borderRadius: 16,
    height: ms(200),
    width: ms(200),
    marginVertical: vs(4),
  },
});

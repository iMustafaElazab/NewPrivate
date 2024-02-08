import React, {useEffect, useState} from 'react';
import {FlatList, ImageBackground, Keyboard, View} from 'react-native';
import {
  IconButton,
  ScrollView,
  Text,
  TextInput,
} from 'roqay-react-native-common-components';
import {RootStackScreenProps} from 'types/navigation';
import {ActivityIndicator, Appbar} from 'react-native-paper';
import {ScaledSheet, ms, s, vs} from 'react-native-size-matters';
import {Controller, useForm} from 'react-hook-form';
import AppColors from 'enums/AppColors';
import ChatCompletionResponseDTO, {
  Message,
} from 'types/api/ChatCompletionResponseDTO';
import {chatCompletionsApi} from '../../store/api/chatApi';
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';
import Share from 'react-native-share';
import Screen from 'components/Screen';

export default React.memo((props: RootStackScreenProps<'Chat'>) => {
  const getLogMessage = (message: string) => {
    return `## Chat Screen: ${message}`;
  };

  const [text, setText] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [submitChatCompletion] = chatCompletionsApi();
  const [messages, setMessages] = useState<ChatCompletionResponseDTO[]>([]);
  const {navigation} = props;

  const renderMessage = ({item}: {item: ChatCompletionResponseDTO}) => {
    const color =
      item.choices?.[0]?.message?.role === 'user' ? 'white' : 'black';

    if (item.choices?.[0]?.message?.role === 'user') {
      return (
        <View style={chatStyles.userMessage}>
          <Text style={{color: color}}>
            {item.choices?.[0]?.message?.content}
          </Text>
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
          <View style={chatStyles.chatGptMessage}>
            <Text style={{color: color}}>
              {item.choices?.[0]?.message?.content}
            </Text>
            <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
              <IconButton
                iconName="microphone"
                size={25}
                style={chatStyles.icon}
                onPress={() =>
                  submitMicTts(item.choices?.[0]?.message?.content)
                }
              />
            </View>
          </View>
          <IconButton
            iconName="share"
            size={25}
            style={chatStyles.icon}
            onPress={() => shareContent(item.choices?.[0]?.message?.content)}
          />
        </View>
      );
    }
  };

  const submitMicTts = async (content: string | undefined | null) => {
    Tts.getInitStatus().then(() => {
      Tts.stop();
      Tts.speak(content);
    });
  };

  const shareContent = (message: string | undefined | null) => {
    Share.open({message})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
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

  const onSubmitPress = async (data: FormValues) => {
    console.log(getLogMessage('data'), data);
    Keyboard.dismiss();
    setText('');
    setValue('search', '');
    const userMessage: Message = {
      content: text,
      role: 'user',
    };

    setMessages(prevMessages => [
      {choices: [{message: userMessage}]},
      ...prevMessages,
    ]);

    // setMessages(prevMessages => [...prevMessages, newMessage]);
    // const newMessage: Message = {
    //   content: data.search,
    //   role: 'user',
    // };
    // let messagesss = Array.from(messages);
    // messagesss.push(newMessage);
    // setMessages(messagesss);
    // console.log(getLogMessage('messagesss'), messagesss);

    const formData = {
      model: 'gpt-3.5-turbo',
      messages: [userMessage],
    };

    try {
      const result = await submitChatCompletion({body: formData}).unwrap();
      console.log(
        getLogMessage('content'),
        JSON.stringify(result.choices?.[0]?.message?.content),
      );

      const responseMessage = result?.choices?.[0]?.message;

      if (responseMessage) {
        // Append the response message to the state
        setMessages(prevMessages => [
          {choices: [{message: responseMessage}]},
          ...prevMessages,
        ]);
      }

      // setMessages(result[0]);
    } catch (error) {
      // Handle errors
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
        <Appbar.Content title="BotGPT" />
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
          style={chatStyles.input}
          placeholder="Search"
          errorProps={{errorMessage: formErrors.search?.message}}
          onBlur={onBlur}
          onChange={onChange}
          onChangeText={text => setResult(text)}
          value={result}
          // onChangeText={onChange}
          // value={value}
          underlineColor="transparent"
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
        style={chatStyles.icon}
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
          style={chatStyles.input}
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
    <View style={chatStyles.row}>
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

  return (
    <Screen style={{flex: 1}}>
      <View style={{flex: 1}}>{getPageContent()}</View>
    </Screen>
  );
});

const chatStyles = ScaledSheet.create({
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
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#60beda',
    borderBottomStartRadius: vs(8),
    borderTopStartRadius: vs(8),
    borderTopEndRadius: vs(8),
    padding: ms(8),
    marginVertical: vs(4),
  },
  chatGptMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f3f2ed',
    borderBottomEndRadius: vs(8),
    borderTopStartRadius: vs(8),
    borderTopEndRadius: vs(8),
    padding: ms(8),
    marginVertical: vs(4),
  },
});

import React, {useState} from 'react';
import {FlatList, ImageBackground, Keyboard, View} from 'react-native';
import {
  IconButton,
  Text,
  TextInput,
} from 'roqay-react-native-common-components';
import {RootStackParamList, RootStackScreenProps} from 'types/navigation';
import {Appbar} from 'react-native-paper';
import {ScaledSheet, ms, s, vs} from 'react-native-size-matters';
import {Controller, useForm} from 'react-hook-form';
import AppColors from 'enums/AppColors';
import ChatCompletionResponseDTO, {
  Message,
} from 'types/api/ChatCompletionResponseDTO';
import {chatCompletionsApi} from '../../store/api/chatApi';

export default React.memo((props: RootStackScreenProps<'Chat'>) => {
  const getLogMessage = (message: string) => {
    return `## Chat Screen: ${message}`;
  };
  const [submitChatCompletion] = chatCompletionsApi();

  // const [messages, setMessages] = useState<Message[]>([]);
  const [messages, setMessages] = useState<ChatCompletionResponseDTO[]>([]);
  const {navigation} = props;

  const renderMessage = ({item}: {item: ChatCompletionResponseDTO}) => {
    const alignSelf =
      item.choices?.[0]?.message?.role === 'user' ? 'flex-end' : 'flex-start';
    const backgroundColor =
      item.choices?.[0]?.message?.role === 'user' ? '#87CEEB' : 'grey';

    const color =
      item.choices?.[0]?.message?.role === 'user' ? 'white' : 'black';

    return (
      <View
        style={{
          alignSelf,
          backgroundColor,
          borderRadius: vs(8),
          padding: ms(8),
        }}>
        <Text style={{color: color}}>
          {item.choices?.[0]?.message?.content}
        </Text>
      </View>
    );
  };

  const onSubmitPress = async (data: FormValues) => {
    console.log(getLogMessage('data'), data);
    Keyboard.dismiss();
    setValue('search', '');
    const newMessage: ChatCompletionResponseDTO = {
      choices: [
        {
          finishReason: '',
          index: 0,
          message: {
            content: data.search,
            role: 'user',
          },
        },
      ],
      created: Date.now(),
      id: String(Date.now()),
      model: '',
      objectX: '',
      usage: {
        completionTokens: 0,
        promptTokens: 0,
        totalTokens: 0,
      },
    };

    // Use the spread operator to create a new array with the new message appended
    setMessages(prevMessages => [...prevMessages, newMessage]);
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
      messages: [
        {
          role: 'user',
          content: data.search,
        },
      ],
    };

    try {
      const result = await chatCompletionsApi({body: formData}).unwrap();

      // Handle the result (result.data contains the response data)
      console.log(getLogMessage('result'), result.data);
    } catch (error) {
      // Handle errors
      console.error(error);
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
        <Appbar.Content title="ChatBot" />
        <Appbar.Action
          icon={'cog-outline'}
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
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
          onChangeText={onChange}
          value={value}
          underlineColor="transparent"
        />
      )}
    />
  );

  const getMicInput = () => (
    <IconButton iconName="microphone" size={25} style={chatStyles.icon} />
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
      {getInput()}
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
        keyExtractor={item => item.id.toString()}
        data={messages}
        renderItem={renderMessage}
        style={{flex: 1}}
      />
    </View>
  );

  const getPageContent = () => (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={{flex: 1}}>
      {getHeaderContent()}
      {getMessagesContent()}
      {getBottomContent()}
    </ImageBackground>
  );

  return <View style={{flex: 1}}>{getPageContent()}</View>;
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
});

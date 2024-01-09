import React, {useState} from 'react';
import {ImageBackground, Keyboard, View} from 'react-native';
import {
  FlatList,
  IconButton,
  Text,
  TextInput,
} from 'roqay-react-native-common-components';
import {RootStackParamList} from 'types/navigation';
import {Appbar} from 'react-native-paper';
import {ScaledSheet, ms, s, vs} from 'react-native-size-matters';
import {Controller, useForm} from 'react-hook-form';
import AppColors from 'enums/AppColors';
import ChatCompletionResponseDTO, {
  Message,
} from 'types/api/ChatCompletionResponseDTO';

export default React.memo((props: RootStackParamList<'Chat'>) => {
  const getLogMessage = (message: string) => {
    return `## Chat Screen: ${message}`;
  };

  const [messages, setMessages] = useState<Message[]>([]);

  const {navigation} = props;

  const renderMessage = ({item}: {item: ChatCompletionResponseDTO}) => {
    const alignSelf =
      item.choices?.[0]?.message?.role === 'user' ? 'flex-end' : 'flex-start';
    const backgroundColor =
      item.choices?.[0]?.message?.role === 'user' ? 'blue' : 'grey';

    return (
      <View style={{alignSelf, backgroundColor, borderRadius: vs(8)}}>
        <Text>{item.choices?.[0]?.message?.content}</Text>
      </View>
    );
  };

  const onSubmitPress = async (data: FormValues) => {
    console.log(getLogMessage('data'), data);
    Keyboard.dismiss();
    const newMessage: Message = {
      content: data.search,
      role: 'user',
    };
    let messagesss = Array.from(messages);
    messagesss.push(newMessage);
    setMessages(messagesss);
    console.log(getLogMessage('messagesss'), messagesss);
  };

  type FormValues = {
    search: string;
  };

  const {
    control,
    handleSubmit,
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
    <View>
      <FlatList
        keyExtractor={item => item.content}
        data={messages}
        renderItem={renderMessage}
        style={{backgroundColor: 'red', height: 500}}
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

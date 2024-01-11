import {getString, setString} from 'core/LocalStorage';
import LocalStorageKeys from 'core/LocalStorage/keys';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {ScaledSheet, ms, s, vs} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {
  Button,
  Text,
  TextInput,
  nameRegExp,
} from 'roqay-react-native-common-components';
import {setApiKey} from 'store/user';
import {RootStackScreenProps} from 'types/navigation';
import {openUrl} from 'utils/LinkingUtils';

export default React.memo((props: RootStackScreenProps<'Settings'>) => {
  const getLogMessage = (message: string) => {
    return `## Settings Screen: ${message}`;
  };

  const dispatch = useDispatch();

  const {navigation} = props;

  type FormValues = {
    input: string;
  };

  const {
    control,
    handleSubmit,
    formState: {errors: formErrors},
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      input: undefined,
    },
  });

  const onSubmitPress = async (data: FormValues) => {
    await setString(LocalStorageKeys.API_KEY, data.input);
    const name = await getString(LocalStorageKeys.API_KEY);
    if (name) {
      dispatch(setApiKey({api_key: name}));
    }
    console.log(getLogMessage('data'), data);
    navigation.goBack();
  };

  const getHeaderContent = () => (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Settings" />
      </Appbar.Header>
    </>
  );

  const getTitleContent = () => (
    <View
      style={{marginTop: vs(8), marginBottom: vs(20), marginHorizontal: s(8)}}>
      <Text variant="bodyLarge">
        Save the Key on your device for exclusive use to ensure maximun security
        and confidentiality, and get it from
      </Text>
      <TouchableOpacity
        onPress={() => openUrl('https://platform.openai.com/account/api-keys')}>
        <Text variant="bodyLarge" style={{color: 'blue'}}>
          https://platform.openai.com/account/api-keys
        </Text>
      </TouchableOpacity>
    </View>
  );

  const getInput = () => (
    <View style={styles.form}>
      <Controller
        name="input"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Field is Invalid',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            topLabelProps={topLabelProps('Api Key')}
            placeholder="Put You Api Key Here .........."
            errorProps={{errorMessage: formErrors.input?.message}}
            onBlur={onBlur}
            onChange={onChange}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
    </View>
  );

  const topLabelProps = (label: string) => ({
    label,
    textProps: {
      type: 'bold',
      size: 13,
    },
  });

  return (
    <View style={{flex: 1}}>
      {getHeaderContent()}
      {getTitleContent()}
      {getInput()}
      {
        <Button
          text="Save"
          onPress={handleSubmit(onSubmitPress)}
          style={styles.btn}
        />
      }
    </View>
  );
});

const styles = ScaledSheet.create({
  form: {
    marginHorizontal: s(16),
  },
  input: {
    borderRadius: ms(8),
    backgroundColor: 'white',
    height: ms(40),
  },
  btn: {
    marginHorizontal: s(16),
    marginTop: vs(32),
    alignSelf: 'flex-end',
    width: '25%',
  },
});

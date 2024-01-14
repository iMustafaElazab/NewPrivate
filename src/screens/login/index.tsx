import React, {useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Button,
  ScrollView,
  Text,
  TextInput,
  emailRegExp,
  strictPasswordRegExp,
} from 'roqay-react-native-common-components';
import loginStyles from './styles';
import {vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppColors from 'enums/AppColors';
import type {RootStackScreenProps} from 'types';

export default React.memo((props: RootStackScreenProps<'Login'>) => {
  const {navigation} = props;

  const getLogMessage = (message: string) => {
    return `## Login Screen: ${message}`;
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleIcon = () => {
    setShowPassword(!showPassword);
  };

  type FormValues = {
    email?: string;
    password?: string;
  };

  const {
    control,
    handleSubmit,
    formState: {errors: formErrors},
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  const onSubmitPress = async (data: FormValues) => {
    console.log(getLogMessage('data'), data);
  };

  const getHeaderTitle = () => (
    <Text variant="headlineLarge" style={loginStyles.largeHeader}>
      Login
    </Text>
  );
  const getHeaderContent = () => (
    <Text variant="bodyLarge" style={{fontWeight: '600', marginBottom: vs(32)}}>
      please Sign In To Contiune
    </Text>
  );

  const getFooterContent = () => (
    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
      <Text
        variant="bodyLarge"
        style={[{fontWeight: '600'}, loginStyles.bottomContent]}>
        Don't Have Account Sign In
      </Text>
    </TouchableOpacity>
  );

  const getEmailInput = () => (
    <Controller
      name="email"
      control={control}
      rules={{
        required: {
          value: true,
          message: 'Field is Invalid',
        },
        pattern: {
          value: emailRegExp,
          message: 'Invalid Field',
        },
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          topLabelProps={topLabelProps('Email Address')}
          style={loginStyles.input}
          keyboardType="email-address"
          errorProps={{errorMessage: formErrors.email?.message}}
          onBlur={onBlur}
          onChange={onChange}
          onChangeText={onChange}
          value={value}
          returnKeyType="next"
        />
      )}
    />
  );

  const getPasswordInput = () => (
    <Controller
      name="password"
      control={control}
      rules={{
        required: {
          value: true,
          message: 'Field is Invalid',
        },
        pattern: {
          value: strictPasswordRegExp,
          message: 'Invalid Field',
        },
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          topLabelProps={topLabelProps('Password')}
          style={loginStyles.input}
          keyboardType="numbers-and-punctuation"
          errorProps={{errorMessage: formErrors.password?.message}}
          onBlur={onBlur}
          onChange={onChange}
          onChangeText={onChange}
          value={value}
          right={
            <TouchableOpacity onPress={handleIcon}>
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                size={25}
                color={AppColors.SHADOW}
              />
            </TouchableOpacity>
          }
          secureTextEntry={!showPassword}
          returnKeyType={'done'}
        />
      )}
    />
  );

  const topLabelProps = (label: string) => ({
    label,
    textProps: {
      type: 'bold',
      size: 13,
    },
  });

  const getForm = () => (
    <>
      {getInputs()}
      <Button
        text="Login"
        style={loginStyles.button}
        onPress={handleSubmit(onSubmitPress)}
      />
    </>
  );

  const getInputs = () => (
    <>
      {getEmailInput()}
      {getPasswordInput()}
    </>
  );

  const getPageContent = () => (
    <View style={loginStyles.container}>
      {getHeaderTitle()}
      {getHeaderContent()}
      {getForm()}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{flex: 1, flexGrow: 1}}>
      {getPageContent()}
      {getFooterContent()}
    </ScrollView>
  );
});

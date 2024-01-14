import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import {
  Button,
  Text,
  TextInput,
  emailRegExp,
  defaultPasswordRegExp,
} from 'roqay-react-native-common-components';
import loginStyles from './styles';
import {vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppColors from 'enums/AppColors';
import type {RootStackScreenProps} from 'types';
import {loginApi} from 'store/api';
import {removeLoadingDialog, showLoadingDialog} from 'store/dialogs';
import {handleErrorInDialog} from 'utils/ErrorHandlingUtils';
import {useDispatch} from 'react-redux';
import {setUser} from 'store/user';

export default React.memo((props: RootStackScreenProps<'Login'>) => {
  const {navigation} = props;

  const getLogMessage = (message: string) => {
    return `## Login Screen: ${message}`;
  };
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const handleIcon = () => {
    setShowPassword(!showPassword);
  };

  const [submitLogin] = loginApi();

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
    dispatch(showLoadingDialog());
    try {
      const formData = {
        email: data.email,
        password: data.password,
      };
      const result = await submitLogin({body: formData}).unwrap();
      console.info(getLogMessage('result'), result);
      // if (result.status === true) {
      //   navigation.navigate('Home');
      // } else {
      //   showDataError(result.message, 'error_login');
      // }
    } catch (error) {
      handleErrorInDialog(error, 'error_login');
    } finally {
      dispatch(removeLoadingDialog());
    }
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
    <TouchableOpacity
      style={loginStyles.bottomContent}
      onPress={() => navigation.navigate('Register')}>
      <Text variant="bodyLarge" style={[{fontWeight: '600'}]}>
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
          placeholder="name@example.com"
          keyboardType="email-address"
          errorProps={{errorMessage: formErrors.email?.message}}
          onBlur={onBlur}
          onChange={onChange}
          onChangeText={onChange}
          value={value}
          returnKeyType={'done'}
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
          value: defaultPasswordRegExp,
          message: 'Invalid Field',
        },
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          topLabelProps={topLabelProps('Password')}
          style={loginStyles.input}
          placeholder="********"
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
          returnKeyType={'go'}
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
    <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
      {getPageContent()}
      {getFooterContent()}
    </View>
  );
});

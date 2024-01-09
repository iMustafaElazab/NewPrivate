import AppColors from 'enums/AppColors';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  TextInput,
  emailRegExp,
  strictPasswordRegExp,
} from 'roqay-react-native-common-components';
import loginStyles from 'screens/login/styles';
import {RootStackScreenProps} from 'types/navigation';

export default React.memo((props: RootStackScreenProps<'Register'>) => {
  const {navigation} = props;

  const getLogMessage = (message: string) => {
    return `## Register Screen: ${message}`;
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleIcon = () => {
    setShowPassword(!showPassword);
  };

  type FormValues = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };

  const {
    control,
    handleSubmit,
    formState: {errors: formErrors},
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      name: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
    },
  });

  const onSubmitPress = async (data: FormValues) => {
    console.log(getLogMessage('data'), data);
  };

  const BackAppBar = () => (
    <TouchableOpacity onPress={navigation.goBack} style={{marginTop: vs(30)}}>
      <Icon name="arrow-left" size={vs(25)} />
    </TouchableOpacity>
  );

  const getHeaderTitle = () => (
    <Text
      variant="headlineLarge"
      style={{marginTop: vs(48), fontSize: 48, fontWeight: 'bold'}}>
      Kreate Account
    </Text>
  );

  const topLabelProps = (label: string) => ({
    label,
    textProps: {
      type: 'bold',
      size: 13,
    },
  });

  const getNameInput = () => (
    <Controller
      name="name"
      control={control}
      rules={{
        required: {
          value: true,
          message: 'error',
        },
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          placeholder="Name"
          style={loginStyles.input}
          errorProps={{errorMessage: formErrors.name?.message}}
          onBlur={onBlur}
          onChange={onChange}
          onChangeText={onChange}
          value={value}
          returnKeyType="next"
        />
      )}
    />
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
          placeholder="Email"
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
          placeholder="Password"
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

  const getPasswordConfrimInput = () => (
    <Controller
      name="password"
      control={control}
      rules={{
        required: {
          value: true,
          message: 'Field is Invalid',
        },
        validate: value =>
          value === getValues('password') || "Password Don't Match",
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          placeholder="Confrim-Password"
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

  const getInputs = () => (
    <View>
      {getNameInput()}
      {getEmailInput()}
      {getPasswordInput()}
      {getPasswordConfrimInput()}
    </View>
  );

  const getForm = () => (
    <>
      {getInputs()}
      <Button
        text="Register"
        style={loginStyles.button}
        onPress={handleSubmit(onSubmitPress)}
      />
    </>
  );

  const getFooterContent = () => (
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <Text
        variant="bodyLarge"
        style={[{fontWeight: '600'}, loginStyles.bottomContent]}>
        Have Account Sign In
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, margin: vs(12), justifyContent: 'space-evenly'}}>
      <View style={{flex: 0.2}}>
        {BackAppBar()}
        {getHeaderTitle()}
      </View>
      <View style={{flex: 0.7}}>{getForm()}</View>
      {getFooterContent()}
    </View>
  );
});

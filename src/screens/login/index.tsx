import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Image, View} from 'react-native';
import {
  Button,
  Text,
  TextInput,
  emailRegExp,
  defaultPasswordRegExp,
} from 'roqay-react-native-common-components';
import {TextInput as PaperInput} from 'react-native-paper';
import loginStyles from './styles';
import {ms, s, vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppColors from 'enums/AppColors';
import type {RootStackScreenProps} from 'types';
import {loginApi} from 'store/api';
import {removeLoadingDialog, showLoadingDialog} from 'store/dialogs';
import {handleErrorInDialog} from 'utils/ErrorHandlingUtils';
import {useDispatch} from 'react-redux';
import {Pressable} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

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
    <View style={{marginHorizontal: s(16)}}>
      <Image
        source={require('../../assets/images/mtc_logo.jpg')}
        style={{height: vs(80), width: s(80)}}
        resizeMode="contain"
      />
      <Text variant="headlineSmall" style={{marginTop: vs(16)}}>
        Sign In
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'baseline',
        }}>
        <Text variant="bodyMedium" style={{fontWeight: '700'}}>
          Don't Have Account?
        </Text>
        <Text
          variant="bodyMedium"
          style={{color: AppColors.PERCENT_CONTAINER, fontWeight: 'bold'}}>
          Create account
        </Text>
      </View>
    </View>
  );
  const getHeaderContent = () => (
    <Text
      variant="bodyLarge"
      style={{fontWeight: 'bold', marginBottom: vs(32), alignSelf: 'center'}}>
      Sign In To your account
    </Text>
  );

  const getFooterContent = () => (
    <Pressable onPress={() => navigation.navigate('DashBoard')}>
      <Text
        variant="bodyLarge"
        style={[
          {
            fontWeight: 'bold',
            color: AppColors.PERCENT_CONTAINER,
            alignSelf: 'center',
            marginTop: vs(16),
          },
        ]}>
        Contiune as a visitor
      </Text>
    </Pressable>
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
          style={loginStyles.input}
          placeholder="Email"
          keyboardType="email-address"
          errorProps={{errorMessage: formErrors.email?.message}}
          onBlur={onBlur}
          onChange={onChange}
          onChangeText={onChange}
          value={value}
          activeUnderlineColor={AppColors.PERCENT_CONTAINER}

          // left={
          //   <PaperInput.Icon
          //     icon="email-outline"
          //     size={24}
          //     color={AppColors.PRIMARY}
          //     style={{alignSelf: 'center'}}
          //   />
          // }
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
          style={loginStyles.input}
          placeholder="Password"
          keyboardType="numbers-and-punctuation"
          errorProps={{errorMessage: formErrors.password?.message}}
          onBlur={onBlur}
          onChange={onChange}
          onChangeText={onChange}
          value={value}
          activeUnderlineColor={AppColors.PERCENT_CONTAINER}
          // left={
          //   <PaperInput.Icon
          //     icon="lock-outline"
          //     size={24}
          //     color={AppColors.PRIMARY}
          //     style={{alignSelf: 'center'}}
          //   />
          // }
          right={
            <PaperInput.Icon
              icon={showPassword ? 'eye' : 'eye-off'}
              size={25}
              onPress={handleIcon}
            />
          }
          secureTextEntry={!showPassword}
        />
      )}
    />
  );

  const forgetPassword = () => (
    <Pressable
      style={{
        alignSelf: 'flex-start',
        marginHorizontal: s(16),
        marginTop: vs(16),
      }}
      onPress={() => navigation.navigate('Forget_Password')}>
      <Text
        variant="bodyLarge"
        style={{color: AppColors.PERCENT_CONTAINER, fontWeight: 'bold'}}>
        Forget Your Password?
      </Text>
    </Pressable>
  );

  const topLabelProps = (label: string) => ({
    label,
    textProps: {
      type: 'bold',
      size: 13,
    },
  });

  const signInRow = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        height: vs(40),
        marginTop: vs(30),
      }}>
      <Text variant="headlineLarge" style={{marginEnd: s(16)}}>
        Sign In
      </Text>

      <Pressable onPress={handleSubmit(onSubmitPress)}>
        <View
          style={{
            height: vs(40),
            width: s(80),
            backgroundColor: '#2f1396',
            borderRadius: ms(4),
            justifyContent: 'center',
          }}>
          <Icon
            name="chevron-right"
            size={40}
            style={{alignSelf: 'center'}}
            color={'white'}
          />
        </View>
      </Pressable>
    </View>
  );

  const getForm = () => (
    <>
      {getInputs()}
      {forgetPassword()}
      <View style={loginStyles.button}>
        <Text variant="bodyLarge" style={{color: 'white', fontWeight: '600'}}>
          Sign In
        </Text>
      </View>
      {getOrSpace()}
      {getFooterContent()}
    </>
  );

  const getOrSpace = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        alignItems: 'center',
        marginTop: vs(16),
      }}>
      <View style={{height: vs(0.5), backgroundColor: 'black', width: '30%'}} />
      <Text variant="bodyMedium">Or</Text>
      <View style={{height: vs(0.5), backgroundColor: 'black', width: '30%'}} />
    </View>
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
      {getForm()}
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
      }}>
      {getPageContent()}
    </View>
  );
});

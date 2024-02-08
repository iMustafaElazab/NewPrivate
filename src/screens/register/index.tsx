import Screen from 'components/Screen';
import AppColors from 'enums/AppColors';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Image,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {ms, vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput as PaperInput} from 'react-native-paper';
import {
  Button,
  ScrollView,
  TextInput,
  emailRegExp,
  kuwaitPhoneRegExp,
  strictPasswordRegExp,
} from 'roqay-react-native-common-components';
import loginStyles from 'screens/login/styles';
import {RootStackScreenProps} from 'types/navigation';
import AppImages from 'enums/AppImages';

export default React.memo((props: RootStackScreenProps<'Register'>) => {
  const {navigation} = props;

  const getLogMessage = (message: string) => {
    return `## Register Screen: ${message}`;
  };

  const [showPasswordOne, setshowPasswordOne] = useState(false);
  const [showPasswordTwo, setshowPasswordTwo] = useState(false);

  const handleIconOne = () => {
    setshowPasswordOne(!showPasswordOne);
  };

  const handleIconTwo = () => {
    setshowPasswordTwo(!setshowPasswordTwo);
  };

  type FormValues = {
    name?: string;
    phone?: string;
    email?: string;
    civil?: string;
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
      phone: undefined,
      email: undefined,
      civil: undefined,
      password: undefined,
      confirmPassword: undefined,
    },
  });

  const onSubmitPress = async (data: FormValues) => {
    console.log(getLogMessage('data'), data);
  };

  const topLabelProps = (label: string) => ({
    label,
    textProps: {
      type: 'bold',
      size: 13,
    },
  });

  const getLogoImage = () => (
    <Image
      source={require('../../assets/images/logo_white.png')}
      style={{width: ms(100), aspectRatio: 1}}
    />
  );

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
          mode="outlined"
          style={loginStyles.input}
          errorProps={{errorMessage: formErrors.name?.message}}
          onBlur={onBlur}
          onChange={onChange}
          activeOutlineColor="transparent"
          onChangeText={onChange}
          value={value}
          returnKeyType="next"
          outlineColor="transparent"
          cursorColor="blue"
        />
      )}
    />
  );
  const getmobileInput = () => (
    <Controller
      name="phone"
      control={control}
      rules={{
        required: {
          value: true,
          message: 'Field is Invalid',
        },
        pattern: {
          value: kuwaitPhoneRegExp,
          message: 'Invalid Field',
        },
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          placeholder="Phone Number"
          style={loginStyles.input}
          keyboardType="phone"
          errorProps={{errorMessage: formErrors.phone?.message}}
          onBlur={onBlur}
          onChange={onChange}
          activeOutlineColor="transparent"
          onChangeText={onChange}
          value={value}
          returnKeyType="next"
          mode="outlined"
          outlineColor="transparent"
          cursorColor="blue"
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
          activeOutlineColor="transparent"
          onChangeText={onChange}
          value={value}
          returnKeyType="next"
          mode="outlined"
          outlineColor="transparent"
          cursorColor="blue"
        />
      )}
    />
  );

  const getCivilNumberInput = () => (
    <Controller
      name="civil"
      control={control}
      rules={{
        required: {
          value: true,
          message: 'Field is Invalid',
        },
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          placeholder="Civil Number"
          style={loginStyles.input}
          keyboardType="number"
          errorProps={{errorMessage: formErrors.civil?.message}}
          onBlur={onBlur}
          onChange={onChange}
          activeOutlineColor="transparent"
          onChangeText={onChange}
          value={value}
          returnKeyType="next"
          mode="outlined"
          outlineColor="transparent"
          cursorColor="blue"
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
          mode="outlined"
          keyboardType="numbers-and-punctuation"
          errorProps={{errorMessage: formErrors.password?.message}}
          onBlur={onBlur}
          onChange={onChange}
          activeOutlineColor="transparent"
          onChangeText={onChange}
          value={value}
          returnKeyType="next"
          outlineColor="transparent"
          cursorColor="blue"
          right={
            <PaperInput.Icon
              icon={showPasswordOne ? 'eye' : 'eye-off'}
              onPress={handleIconOne}
            />
          }
          secureTextEntry={!showPasswordOne}
        />
      )}
    />
  );

  const getPasswordConfrimInput = () => (
    <Controller
      name="confirmPassword"
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
          mode="outlined"
          keyboardType="numbers-and-punctuation"
          errorProps={{errorMessage: formErrors.confirmPassword?.message}}
          onBlur={onBlur}
          onChange={onChange}
          activeOutlineColor="transparent"
          onChangeText={onChange}
          value={value}
          underlineColor="transparent"
          returnKeyType="next"
          outlineColor="transparent"
          cursorColor="blue"
          right={
            <PaperInput.Icon
              icon={showPasswordTwo ? 'eye' : 'eye-off'}
              onPress={handleIconTwo}
            />
          }
          secureTextEntry={!showPasswordTwo}
        />
      )}
    />
  );

  const getInputs = () => (
    <View>
      {getNameInput()}
      {getmobileInput()}
      {getEmailInput()}
      {getCivilNumberInput()}
      {getPasswordInput()}
      {getPasswordConfrimInput()}
    </View>
  );

  const getForm = () => (
    <>
      {getLogoImage()}
      {getInputs()}
      {
        <View>
          <Text style={{marginTop: ms(16)}}>Select User Type</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginTop: ms(16),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: 7,
                  width: 14,
                  aspectRatio: 1,
                  marginEnd: ms(8),
                  backgroundColor: 'red',
                }}
              />
              <Text>Terant</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  borderRadius: 7,
                  width: 14,
                  aspectRatio: 1,
                  marginEnd: ms(8),
                  backgroundColor: 'red',
                }}
              />
              <Text>Guard</Text>
            </View>
          </View>
        </View>
      }
      {
        <Pressable
          style={loginStyles.button}
          onPress={handleSubmit(onSubmitPress)}>
          <Text style={{color: 'white'}}>Sign Up</Text>
          <Pressable />
        </Pressable>
      }
    </>
  );

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../assets/images/splash.png')}
      resizeMode="stretch">
      <Screen style={{flex: 1}}>
        <ScrollView contentContainerStyle={{marginHorizontal: ms(8)}}>
          {getForm()}
        </ScrollView>
      </Screen>
    </ImageBackground>
  );
});

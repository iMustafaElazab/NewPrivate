import AppColors from 'enums/AppColors';
import React, {useCallback, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {Avatar, Modal, Portal, Text} from 'react-native-paper';
import {ms, s, vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  TextInput,
  emailRegExp,
  defaultPasswordRegExp,
  ScrollView,
  egyptPhoneRegExp,
  IconButton,
  Card,
  ImagePlaceholder,
} from 'roqay-react-native-common-components';
import loginStyles from 'screens/login/styles';
import {RootStackScreenProps} from 'types/navigation';
import {TextInput as PaperInput} from 'react-native-paper';
import {registerApi} from 'store/api';
import * as ImagePicker from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {setUser} from 'store/user';
import {removeLoadingDialog, showLoadingDialog} from 'store/dialogs';

export default React.memo((props: RootStackScreenProps<'Register'>) => {
  const {navigation} = props;

  const getLogMessage = (message: string) => {
    return `## Register Screen: ${message}`;
  };

  const [submitRegitser] = registerApi();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [pickerResponse, setPickerResponse] = useState(null);

  const handleIcon = () => {
    setShowPassword(!showPassword);
  };

  type FormValues = {
    name?: string;
    phone?: string;
    email?: string;
    password?: string;
    image?: string;
  };

  const {
    control,
    handleSubmit,
    formState: {errors: formErrors},
  } = useForm<FormValues>({
    defaultValues: {
      name: undefined,
      phone: undefined,
      email: undefined,
      password: undefined,
      image: undefined,
    },
  });

  const onSubmitPress = async (data: FormValues) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('image', uri);
    // formData.append('image', {
    //   uri: uri,
    //   type: 'image/jpeg',
    //   name: 'photo',
    // });
    dispatch(showLoadingDialog());

    try {
    } catch (error) {
      dispatch(removeLoadingDialog());
    }
    const result = await submitRegitser({body: formData}).unwrap();
    dispatch(setUser(result.data));
    console.log(getLogMessage('data'), result);
  };

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse);
  }, []);

  const onCameraPress = React.useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchCamera(options, setPickerResponse);
  }, []);

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  console.info(getLogMessage('uri'), uri);

  // const BackAppBar = () => (
  //   <Pressable onPress={navigation.goBack} style={{marginTop: vs(30)}}>
  //     <Icon name="arrow-left" size={vs(25)} />
  //   </Pressable>
  // );

  const getImageCircle = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}>
      <ImagePlaceholder
        source={uri}
        placeholder={require('../../assets/images/avatar.png')}
        size={120}
        style={{height: vs(120), width: vs(120), borderRadius: vs(60)}}
      />
      <Pressable onPress={showModal}>
        <Avatar.Icon
          icon="plus"
          size={25}
          style={{marginStart: s(50), marginTop: -20}}
        />
      </Pressable>
    </View>
  );

  const showViewModal = () => (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          margin: ms(60),
          borderRadius: ms(16),
        }}>
        <Button
          text="Gallary"
          style={{marginVertical: vs(16)}}
          onPress={onImageLibraryPress}
        />
        <Button text="Camera" onPress={onCameraPress} />
      </Modal>
    </Portal>
  );

  const getHeaderTitle = () => (
    <View style={{alignItems: 'center'}}>
      <Text variant="headlineMedium" style={{fontWeight: 'bold'}}>
        Create account
      </Text>
      <Text
        variant="bodyLarge"
        style={{fontWeight: 'bold', marginTop: vs(8), marginBottom: vs(48)}}>
        Sign up to new account
      </Text>
    </View>
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
          placeholder="Full-Name"
          style={[loginStyles.input, {marginTop: vs(16)}]}
          mode="outlined"
          errorProps={{errorMessage: formErrors.name?.message}}
          onBlur={onBlur}
          onChange={onChange}
          onChangeText={onChange}
          value={value}
          left={
            <PaperInput.Icon
              icon="account"
              size={24}
              color={AppColors.PRIMARY}
              style={{alignSelf: 'center'}}
            />
          }
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
          style={[loginStyles.input, {marginTop: vs(16)}]}
          mode="outlined"
          keyboardType="email-address"
          errorProps={{errorMessage: formErrors.email?.message}}
          onBlur={onBlur}
          onChange={onChange}
          onChangeText={onChange}
          value={value}
          left={
            <PaperInput.Icon
              icon="email-outline"
              size={24}
              color={AppColors.PRIMARY}
              style={{alignSelf: 'center'}}
            />
          }
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
          placeholder="Password"
          style={[loginStyles.input, {marginTop: vs(16)}]}
          mode="outlined"
          keyboardType="numbers-and-punctuation"
          errorProps={{errorMessage: formErrors.password?.message}}
          onBlur={onBlur}
          onChange={onChange}
          onChangeText={onChange}
          value={value}
          left={
            <PaperInput.Icon
              icon="lock-outline"
              size={24}
              color={AppColors.PRIMARY}
              style={{alignSelf: 'center'}}
            />
          }
          right={
            <PaperInput.Icon
              icon={showPassword ? 'eye' : 'eye-off'}
              size={25}
              color={AppColors.PRIMARY}
              onPress={handleIcon}
            />
          }
          secureTextEntry={!showPassword}
          returnKeyType={'done'}
        />
      )}
    />
  );

  const getPhoneInput = () => (
    <Controller
      name="phone"
      control={control}
      rules={{
        required: {
          value: true,
          message: 'Field is Invalid',
        },
        pattern: {
          value: egyptPhoneRegExp,
          message: 'Invalid Phone Format',
        },
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          placeholder="Phone"
          style={[loginStyles.input, {marginTop: vs(16)}]}
          mode="outlined"
          keyboardType="phone-pad"
          errorProps={{errorMessage: formErrors.phone?.message}}
          onBlur={onBlur}
          onChange={onChange}
          onChangeText={onChange}
          value={value}
          left={
            <PaperInput.Icon
              icon="phone-outline"
              size={24}
              color={AppColors.PRIMARY}
              style={{alignSelf: 'center'}}
            />
          }
        />
      )}
    />
  );

  const registerRow = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        height: vs(40),
        marginTop: vs(30),
      }}>
      <Text variant="headlineLarge" style={{marginEnd: s(16)}}>
        Create
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
            size={25}
            style={{alignSelf: 'center'}}
            color={'white'}
          />
        </View>
      </Pressable>
    </View>
  );

  const getInputs = () => (
    <View>
      {getImageCircle()}
      {showViewModal()}
      {getNameInput()}
      {getPhoneInput()}
      {getEmailInput()}
      {getPasswordInput()}
      {registerRow()}
    </View>
  );

  const getForm = () => (
    <>
      {getInputs()}
      {getFooterContent()}
    </>
  );

  const getFooterContent = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: vs(30),
      }}>
      <Text variant="bodyLarge" style={[{fontWeight: 'bold'}]}>
        Already Have Account?
      </Text>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text
          variant="bodyLarge"
          style={[{fontWeight: 'bold', color: AppColors.PRIMARY}]}>
          Sign In
        </Text>
      </Pressable>
    </View>
  );

  return (
    <View style={{flex: 1, marginHorizontal: s(12), marginVertical: vs(8)}}>
      <View style={{justifyContent: 'center', flex: 1}}>
        {getHeaderTitle()}
        {getForm()}
      </View>
    </View>
  );
});

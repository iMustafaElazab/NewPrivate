import AppColors from 'enums/AppColors';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Pressable, View} from 'react-native';
import {ms, s, vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Text,
  TextInput,
  emailRegExp,
} from 'roqay-react-native-common-components';
import loginStyles from 'screens/login/styles';
import {TextInput as PaperInput} from 'react-native-paper';
import {RootStackScreenProps} from 'types/navigation';

export default React.memo((props: RootStackScreenProps<'Forget_Password'>) => {
  const {navigation} = props;

  type FormValues = {
    email?: string;
  };

  const {
    control,
    handleSubmit,
    formState: {errors: formErrors},
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      email: undefined,
    },
  });

  const onSubmitPress = async (data: FormValues) => {};

  const pageContent = () => (
    <View style={{justifyContent: 'center', flex: 1}}>
      <Text variant="headlineMedium" style={{alignSelf: 'center'}}>
        Forget Password?
      </Text>
      <Text
        variant="bodyLarge"
        style={{alignSelf: 'center', marginTop: vs(16), marginBottom: vs(12)}}>
        Enter email to proceed further
      </Text>
      {getInputs()}
      {getFooterContent()}
    </View>
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
        Submit
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

  const getFooterContent = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: vs(30),
      }}>
      <Text variant="bodyLarge" style={[{fontWeight: 'bold'}]}>
        Not a Member?
      </Text>
      <Pressable onPress={() => navigation.navigate('Register')}>
        <Text
          variant="bodyLarge"
          style={[{fontWeight: 'bold', color: AppColors.PRIMARY}]}>
          Register
        </Text>
      </Pressable>
    </View>
  );

  const getInputs = () => (
    <View>
      {getEmailInput()}
      {registerRow()}
    </View>
  );

  return (
    <View style={{flex: 1, marginHorizontal: s(12)}}>{pageContent()}</View>
  );
});

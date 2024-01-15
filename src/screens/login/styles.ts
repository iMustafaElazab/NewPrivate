import AppColors from 'enums/AppColors';
import {ScaledSheet, ms, s, vs} from 'react-native-size-matters';

const loginStyles = ScaledSheet.create({
  input: {
    marginTop: vs(12),
    height: vs(48),
    width: '90%',
    marginStart: s(16),
    marginEnd: s(16),
    backgroundColor: 'transparent',
  },
  button: {
    width: '90%',
    marginTop: vs(24),
    backgroundColor: AppColors.PERCENT_CONTAINER,
    alignSelf: 'center',
    borderRadius: ms(8),
    height: vs(48),
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: vs(48),
    flex: 1,
  },
  largeHeader: {
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: vs(8),
    alignSelf: 'center',
  },
  bottomContent: {
    alignSelf: 'center',
    borderRadius: 0,
  },
});

export default loginStyles;

import {ScaledSheet, vs} from 'react-native-size-matters';

const loginStyles = ScaledSheet.create({
  input: {
    padding: vs(4),
    borderRadius: vs(4),
    marginTop: vs(4),
    backgroundColor: 'transparent',
  },
  button: {
    width: '25%',
    marginTop: vs(16),
    alignSelf: 'flex-end',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: vs(32),
  },
  largeHeader: {
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: vs(8),
  },
  bottomContent: {
    position: 'absolute',
    bottom: vs(40),
    alignSelf: 'center',
  },
});

export default loginStyles;

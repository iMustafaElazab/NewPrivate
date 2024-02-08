import {ScaledSheet, vs} from 'react-native-size-matters';

const loginStyles = ScaledSheet.create({
  input: {
    padding: vs(4),
    borderRadius: vs(4),
    marginTop: vs(16),
    height: 44,
    backgroundColor: '#eeede7',
  },
  button: {
    marginTop: vs(32),
    alignSelf: 'center',
    borderRadius: vs(4),
    padding: vs(4),
    height: 44,
    justifyContent: 'center',
    backgroundColor: '#145da0',
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: vs(32),
  },
  largeHeader: {
    fontSize: 30,
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

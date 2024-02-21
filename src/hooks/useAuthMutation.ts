import queryAuth from 'core/api';
import {useMutation} from 'react-query';

export const useLoginMutation = () => {
  return useMutation('login', queryAuth.login);
};

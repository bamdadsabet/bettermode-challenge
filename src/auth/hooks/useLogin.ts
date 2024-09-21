import { MutationResult, SingleExecutionResult, useMutation } from '@apollo/client';
import useFetchGuestToken from './useFetchGuestToken';
import { LOGIN_MEMBER } from '@auth/gql/mutation';
import { useEffect } from 'react';
import useAuth from './useAuth';

type TLogin = (domain: string, username: string, password: string) => Promise<SingleExecutionResult<unknown>>;

const useLogin = (): [login: TLogin, MutationResult<unknown>] => {
  const [fetchToken] = useFetchGuestToken();
  const [loginMember, result] = useMutation(LOGIN_MEMBER);
  const { data, loading, error } = result;

  const { setToken } = useAuth();

  useEffect(() => {
    if (!loading && !error && data) {
      setToken(data.loginNetwork.accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading, data]);

  const login: TLogin = async (domain, username, password) => {
    const { error } = await fetchToken(domain);
    if (error) {
      return { error, loading: false, data: null };
    }
    const result = await loginMember({
      variables: {
        username,
        password,
      },
    });
    return result;
  };

  return [login, result];
};

export default useLogin;

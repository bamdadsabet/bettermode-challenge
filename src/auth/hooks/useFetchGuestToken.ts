import { OperationVariables, QueryResult, useLazyQuery } from '@apollo/client';
import { GET_GUEST_TOKEN } from '@auth/gql/query';
import { useEffect } from 'react';
import useAuth from './useAuth';

type TFetchToken = (domain: string) => Promise<QueryResult<unknown, OperationVariables>>;

const useFetchGuestToken = (): [TFetchToken, QueryResult<unknown, OperationVariables>] => {
  const [getToken, result] = useLazyQuery(GET_GUEST_TOKEN);
  const { data, loading, error } = result;

  const { setToken, setUserType } = useAuth();

  useEffect(() => {
    if (!loading && !error && data) {
      setToken(data.tokens.accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading, data]);

  const fetchToken: TFetchToken = async (domain) => {
    const result = await getToken({ variables: { domain } });
    return result;
  };

  return [fetchToken, result];
};

export default useFetchGuestToken;

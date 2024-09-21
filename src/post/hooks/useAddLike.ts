import { ADD_REACTION } from '@post/gql/mutation';
import { useMutation } from '@apollo/client';
import { TReactionHooks } from '@post/types';

const useAddLike = (): TReactionHooks => {
  const [addReaction] = useMutation(ADD_REACTION);
  const addLike = (postId: string) => {
    const result = addReaction({
      variables: { postId, reaction: '+1' },
    });
    return result;
  };

  return addLike;
};

export default useAddLike;

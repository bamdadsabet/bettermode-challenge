import { REMOVE_REACTION } from '@post/gql/mutation';
import { useMutation } from '@apollo/client';
import { TReactionHooks } from '@post/types';

const useRemoveLikes = (): TReactionHooks => {
  const [removeReaction] = useMutation(REMOVE_REACTION);
  const removeLike = (postId: string) => {
    const result = removeReaction({
      variables: { postId, reaction: '+1' },
    });
    return result;
  };

  return removeLike;
};

export default useRemoveLikes;

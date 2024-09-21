import { useAddLike } from '@post/hooks';
import useRemoveLikes from '@post/hooks/useRemoveLike';
import { Heart } from '@phosphor-icons/react';
import React, { useState } from 'react';
import './LikeButton.scss';
import { ActionEnum, LikeButtonProps } from './types';

const LikeButton: React.FC<LikeButtonProps> = ({ likeCountNumber, className, reacted, id }) => {
  const [isLiked, setIsLiked] = useState<boolean>(reacted);
  const [likeCount, setLikeCount] = useState<number>(likeCountNumber);
  const addLike = useAddLike();
  const removeLike = useRemoveLikes();

  const handleToggleLike = async (e: MouseEvent) => {
    e.preventDefault();
    if (isLiked) {
      const { data } = await removeLike(id);
      
      if (data && data?.removeReaction && data?.removeReaction.status === ActionEnum.SUCCEEDED) {
        setLikeCount((currentLikeCount) => currentLikeCount - 1);
        setIsLiked(false);
      }
    } else {
      const { data } = await addLike(id);
      if (data && data?.addReaction && data?.addReaction.status === ActionEnum.SUCCEEDED) {
        setLikeCount((currentLikeCount) => currentLikeCount + 1);
        setIsLiked(true);
      }
    }
  };
  return (
    <div
      onClick={(e) => {
        handleToggleLike(e);
      }}
      className={`like-button ${className}`}
    >
      <Heart size={20} weight={isLiked ? 'duotone' : 'regular'} color={isLiked ? '#c22929' : 'white'} />
      <span>{likeCount}</span>
    </div>
  );
};

export default LikeButton;

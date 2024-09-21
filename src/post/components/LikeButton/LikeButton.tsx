import { useAddLike } from '@post/hooks';
import useRemoveLikes from '@post/hooks/useRemoveLike';
import { Heart } from '@phosphor-icons/react';
import React, { useState } from 'react';
import './LikeButton.scss';
import { ActionEnum, LikeButtonProps } from './types';

const LikeButton: React.FC<LikeButtonProps> = ({ likeCountNumber, className, reacted, id, setError }) => {
  const [isLiked, setIsLiked] = useState<boolean>(reacted);
  const [likeCount, setLikeCount] = useState<number>(likeCountNumber);
  const addLike = useAddLike();
  const removeLike = useRemoveLikes();

  const handleToggleLike = async (e: MouseEvent) => {
    e.preventDefault();
    if (isLiked) {
      const { data, loading, error } = await removeLike(id);
      if (error) {
        setError(error.message);
      } else if (!loading && data && data.status === ActionEnum.SUCCEEDED) {
        setLikeCount((currentLikeCount) => currentLikeCount - 1);
        setIsLiked(false);
      }
    } else {
      const { data, loading, error } = await addLike(id);
      if (error) {
        setError(error.message);
      } else if (!loading && data && data.status === ActionEnum.SUCCEEDED) {
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

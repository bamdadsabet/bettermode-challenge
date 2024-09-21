import React from 'react';
import { PostProps } from './PostType';
import PostTags from '@post/components/PostTags';
import { getImgUrl } from '@post/utils/thumbnail';
import './Post.scss';
import { LikeButton } from '../LikeButton';
import { LoginTypeEnum } from '@/auth/types';
import { useAuth } from '@/auth/hooks';

const Post: React.FC<PostProps> = ({ postData, thumbnail, tags, type, id, reactionsCount, reacted, slug }) => {

  const { userLoginType } = useAuth() 

  // FIXME type
  const { title, content, previewImageId } = postData.reduce((acc, field) => {
    acc[field.key] = {
      ...field,
      value: JSON.parse(field.value),
    };
    return acc;
  }, {});

  return (
    <div className="post">
      {thumbnail && <img src={thumbnail} alt={slug} className="post__image" />}
      <div className="px-4">
        <PostTags type={type} tags={tags} className="mb-6" />
        <h1 className="post__title">{title.value}</h1>
        <article className="post__article" dangerouslySetInnerHTML={{ __html: content.value }} />
        {previewImageId.value !== null && <img src={getImgUrl(previewImageId.value)} alt={slug} />}
        {
          userLoginType === LoginTypeEnum.MEMBER 
          &&
          <LikeButton  id={id} reacted={reacted} likeCountNumber={reactionsCount} />
        }
      </div>
    </div>
  );
};

export default Post;

import { Image } from '@phosphor-icons/react';
import React from 'react';
import { Link } from 'react-router-dom';
import PostTags from '../PostTags';
import PostCardProps from './PostCardType';
import './PostCard.scss';
import { LikeButton } from '../LikeButton';

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  description,
  publishedAt,
  createdBy,
  img,
  slug,
  tags,
  type,
  reactionsCount,
  reacted,
}) => (
  <Link className="post-card__content-body" to={`post/${id}`}>
    <div className="post-card">
      {img ? (
        <img src={img} className="post-card__image" alt={slug} />
      ) : (
        <div className="post-card__image--empty">
          <Image className="text-gray-400" size={58} />
        </div>
      )}
      <div className="post-card__content-body">
        <h1 className="text-md">{title}</h1>
        <p className="post-card__description">{description}</p>
        <PostTags type={type} tags={tags} />
        <div className="post-card__footer">
          <span className="text-xs">Published: {publishedAt}</span>
          <span className="text-xs">Created By: {createdBy}</span>
        </div>
        <LikeButton id={id} reacted={reacted} likeCountNumber={reactionsCount} />
      </div>
    </div>
  </Link>
);

export default PostCard;

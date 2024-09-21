import React from 'react';
import './PostCardSkeleton.scss';
import { PostTagsSkeleton } from '@post/components/PostTags';

const PostCardSkeleton: React.FC = () => {
  return (
    <div className="post-card__skeleton">
      <div className="post-card__skeleton__image" />
      <div className="post-card__skeleton__body">
        <div className="space-y-4 mb-8">
          <div className="post-card__skeleton__title" />
          <div className="post-card__skeleton__content">
            <div className="post-card__skeleton__line col-span-2" />
            <div className="post-card__skeleton__line col-span-1" />
            <div className="post-card__skeleton__line col-span-1" />
            <div className="post-card__skeleton__line col-span-3" />
          </div>
        </div>
        <PostTagsSkeleton className="mt-6" />
        <div className="post-card__skeleton__footer">
          <div className="post-card__skeleton__footer__line w-36" />
          <div className="post-card__skeleton__footer__line w-32" />
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;

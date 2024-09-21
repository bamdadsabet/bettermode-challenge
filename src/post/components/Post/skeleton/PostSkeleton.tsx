import React from 'react';
import PostTagsSkeleton from '@post/components/PostTags/skeleton/PostTagsSkeleton';
import './PostSkeleton.scss';

const PostSkeleton: React.FC = () => (
  <div className="post__skeleton">
    <div className="post__skeleton__image"></div>
    <PostTagsSkeleton className="mb-8" />
    <div className="post__skeleton__title"></div>
    {Array.from({ length: 3 }, (_, index: number) => (
      <div key={index} className="space-y-4 mb-8">
        <div className="post__skeleton__line rounded" />
        <div className="grid grid-cols-4 gap-4">
          <div className="post__skeleton__line rounded-sm col-span-2" />
          <div className="post__skeleton__line rounded-sm col-span-1" />
          <div className="post__skeleton__line rounded-sm col-span-1" />
          <div className="post__skeleton__line rounded-sm col-span-3" />
        </div>
      </div>
    ))}
  </div>
);

export default PostSkeleton;

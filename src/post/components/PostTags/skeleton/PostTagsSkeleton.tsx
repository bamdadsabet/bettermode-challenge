import React from 'react';
import './PostTagsSkeleton.scss';

interface Props {
  className?: string;
}

const PostTagsSkeleton: React.FC<Props> = ({ className }) => (
  <div className={`post-tags__skeleton ${className}`}>
    <span className="post-tags__skeleton__chip--type" />
    {Array.from({ length: 3 }, (_, index: number) => (
      <span key={index} className="post-tags__skeleton__chip" />
    ))}
  </div>
);

export default PostTagsSkeleton;

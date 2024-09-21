import React from 'react';
import './PostTags.scss';
import PostTagsProps from './PostTagsTypes';

const PostTags: React.FC<PostTagsProps> = ({ tags, type, className }) => {
  return (
    <div className={`post-tag__container ${className}`}>
      <span className="post-tag--type">{type}</span>
      {tags &&
        tags.length > 0 &&
        tags.map((tag) => (
          <span className="post-tag" key={tag.title}>
            {tag.title}
          </span>
        ))}
    </div>
  );
};

export default PostTags;

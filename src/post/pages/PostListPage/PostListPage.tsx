import { GET_ALL_POSTS } from '@post/gql/query';
import PostCard, { PostCardSkeleton } from '@post/components/PostCard';
import { getThumbnailsImgSrc } from '@post/utils/thumbnail';
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import './PostListPage.scss';
import { Toast } from '@components';
import { useErrorHandler } from '@hooks';

/**
 * PostListPage is a component that renders a list of posts.
 * It fetches the data from the server and stores it in the component state.
 * It also handles the loading and error states.
 */
const PostListPage: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const [posts, setPosts] = useState<any[]>([]);
  const { showError, setError } = useErrorHandler();

  const { error, loading, data } = useQuery(GET_ALL_POSTS, {
    variables: {
      limit: 3,
      offset: offset,
    },
  });

  useEffect(() => {
    if (error) {
      setError();
    }
    if (data && !loading) {
      setPosts((prevPosts) => [...prevPosts, ...data.posts.nodes]);
    }
  }, [loading, data, error]);

  if (loading && posts.length === 0) {
    return (
      <div className="post-list-page">
        {Array.from({ length: 3 }, (_, index: number) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="post-list-page">
      {posts.map((post: any) => (
        <PostCard
          type={post.postType.name}
          key={post.id}
          slug={post.slug}
          img={getThumbnailsImgSrc(post.fields)}
          id={post.id}
          title={post.title}
          description={post.description}
          publishedAt={post.publishedAt}
          createdBy={post.createdBy.member.username}
          tags={post.tags}
          reactionsCount={post.reactionsCount}
          reacted={post.reactions.find((reaction: { reacted: boolean }) => reaction.reacted)}
        />
      ))}
      {loading && (
        <>
          {Array.from({ length: 2 }, (_, index: number) => (
            <PostCardSkeleton key={index} />
          ))}
        </>
      )}
      {!loading && data && (
        <>
          {data.posts.pageInfo.hasNextPage ? (
            <button className="post-list-page__view-more-button" onClick={() => setOffset(offset + 3)}>
              View More
            </button>
          ) : (
            <h1 className="text-lg py-6">That was all</h1>
          )}
        </>
      )}
      {showError && <Toast error={error?.message} />}
    </div>
  );
};

export default PostListPage;

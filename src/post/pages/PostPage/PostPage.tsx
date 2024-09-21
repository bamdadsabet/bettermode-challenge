import PostPageSkeleton from '@post/components/Post/skeleton/PostSkeleton';
import { GET_POST_BY_ID } from '@post/gql/query';
import Post from '@post/components/Post';
import { getThumbnailsImgSrc } from '@post/utils/thumbnail';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const PostPage: React.FC = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_POST_BY_ID, {
    variables: {
      id,
    },
  });

  if (loading) {
    return <PostPageSkeleton />;
  }

  return (
    <div className="flex justify-center">
      <Post
        id={id as string}
        slug={data.post.slug}
        postData={data.post.mappingFields}
        thumbnail={getThumbnailsImgSrc(data.post.fields)}
        tags={data.post.tags}
        type={data.post.postType.name}
        reactionsCount={data.post.reactionsCount}
        reacted={data.post.reactions.reacted}
      />
    </div>
  );
};

export default PostPage;

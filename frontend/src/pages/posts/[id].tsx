import { Layout } from '@/components/templates';
import type { NextPage, GetServerSideProps } from 'next'
import { PostType } from '@/types/PostType';
import fetchPosts from '@/utils/fetchPosts';

type PathParams = {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params as PathParams;
  const post = await fetchPosts<PostType>(Number(id))

  return {
    props: { post }
  }
}

const Post: NextPage<{ post: PostType }> = ({ post }) => {

  return (
    <Layout>
      {post.description}
    </Layout>
  )
}

export default Post;
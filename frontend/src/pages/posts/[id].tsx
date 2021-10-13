import { Layout } from '@/components/templates';
import type { NextPage, GetServerSideProps } from 'next'
import config from '@/utils/config';

type PageProps = {
  id: string,
  content: string,
}

type PathParams = {
  id: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
  const { id } = context.params as PathParams;
  const res = await fetch(`${config.api}/post/${id}`);
  const props = await res.json() as PageProps;

  return {
    props
  }
}

const Post: NextPage<PageProps> = ({ id, content }) => {

  return (
    <Layout>
      {content}
    </Layout>
  )
}

export default Post;
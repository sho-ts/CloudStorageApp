import useLogic from './hook'
import { Button } from '@/components/atoms'
import Head from 'next/head';
import { withUserLayout } from '@layout';

const Post = () => {
  const { data, error, onClickDownload } = useLogic();

  return (
    <>
      {data && (
        <>
          <Head>
            <title>{data.description}</title>
          </Head>
          {data.description}
          <div style={{ marginTop: 16 }}>
            <Button as="a" target="_blank" download onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onClickDownload(e)}>
              ダウンロード
            </Button>
          </div>
        </>
      )}
      {error && <p>データがありません</p>}
    </>
  )
}

export default withUserLayout(Post);
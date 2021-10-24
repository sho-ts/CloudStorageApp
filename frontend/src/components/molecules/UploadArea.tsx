import styled from 'styled-components';
import { useUpload } from '@/hooks';
import { Button, Flex } from '@chakra-ui/react';

const Body = styled.div`
  padding-top: 100%;
  position: relative;
`

const DropArea = styled.div`
  border: 2px dotted #000;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Text = styled.p`
  font-weight: bold;
  font-size: 1.2em;
`

const UploadArea: React.FC = () => {
  const { getRootProps, getInputProps, upload, file } = useUpload();

  return (
    <>
      {file ? (
        <>
          <Flex mb={2}>
            <Text style={{marginRight: 16}}>{file.name}</Text>
            <Text>{Math.ceil(file.size / 1024)}KB</Text>
          </Flex>
          <Button onClick={() => upload()}>このファイルをアップロード</Button>
        </>
      ) : (
        <>
          <Body>
            <DropArea {...getRootProps()}>
              <input {...getInputProps()} />
              <Text>ここにファイルをアップロード</Text>
            </DropArea>
          </Body>
        </>
      )}
    </>
  )
}

export default UploadArea;
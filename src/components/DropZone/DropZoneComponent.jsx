import { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { processSchema } from 'src/lib/utils'
import styled from 'styled-components';

const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#eeeeee';
}

const Container = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  margin-top: 10px;
  transition: border .24s ease-in-out;
`;

const MyDropZone = ({ setSchema }) => {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => alert("file reading was aborted")
            reader.onerror = () => alert('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const schema = reader.result;
                console.log(schema);
                setSchema(processSchema(JSON.parse(schema)));
            }
            reader.readAsText(file)
        })
    }, [])
    const { getRootProps, getInputProps, isDragActive,
        isDragAccept,
        isDragReject } = useDropzone({ onDrop });


    return (
        <div>
            <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the schema file here ...</p> :
                        <p>Drag 'n' drop the contract's schema file here, or click to select file</p>
                }
            </Container>
        </div>
    )
}

export default MyDropZone;
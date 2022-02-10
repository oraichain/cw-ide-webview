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
    return '#fffff';
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${props => getColor(props)};
  background-color: #312e38;
  color: #bdbdbd;
  outline: none;
  margin-top: 10px;
  transition: border .24s ease-in-out;
`;

const MyDropZone = ({ setSchema, setJson, dropZoneText }) => {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        acceptedFiles.forEach((file) => {
            console.log("file name is: ", file)
            const reader = new FileReader()

            reader.onabort = () => alert("file reading was aborted")
            reader.onerror = () => alert('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const result = reader.result;
                if (setSchema) setSchema(processSchema(JSON.parse(result)));
                else setJson({ fileName: file.path, content: JSON.parse(result) })
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
                {dropZoneText}
            </Container>
        </div>
    )
}

export default MyDropZone;
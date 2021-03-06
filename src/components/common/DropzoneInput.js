import React from 'react';
import Dropzone from 'react-dropzone';

const FILE_FIELD_NAME = 'files';

const DropzoneInput = (field) => {
    const files = field.input.value;
    return (
        <div>
            <label htmlFor={FILE_FIELD_NAME}>Files</label>
            <Dropzone
                name={field.name}
                onDrop={(filesToUpload, e) => field.input.onChange(filesToUpload)}
            >
                <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            {field.meta.touched &&
                field.meta.error &&
                <span className="error">{field.meta.error}</span>}
            {files && Array.isArray(files) && (
                <ul>
                    {files.map((file, i) => <li key={i}>{file.name}</li>)}
                </ul>
            )}
        </div>
    );
}

export default DropzoneInput;
import * as React from 'react';
import { FieldProps } from 'formik';
import Dropzone from 'react-dropzone';
import { Button } from 'antd';

export const DropzoneField: React.FunctionComponent<FieldProps<any>> = ({
  field: { name, value },
  form: { setFieldValue, values, setValues }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const pUrl = (value ? value.preview : null) || values.pictureUrl;
  console.log('value', value);
  return (
    <div>
      <Dropzone
        accept="image/jpeg, image/png"
        multiple={false}
        onDrop={([file]) => {
          console.log('file', file);
          console.log('name', name);
          setFieldValue(name, file);
        }}
        {...props}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      {pUrl && (
        <img
          src={pUrl}
          alt=""
          style={{
            maxHeight: 200,
          }}
        />
      )}
      <Button
        onClick={() =>
          setValues({
            ...values,
            pictureUrl: null,
            picture: null,
          })
        }
      >
        remove
      </Button>
    </div>

    // <Dropzone
    //   accept="image/jpeg, image/png"
    //   multiple={false}
    //   onDrop={([file]) => {
    //     setFieldValue(name, file);
    //   }}
    //   {...props}
    // >
    //   {() => (
    //     <p>Try dropping some files here, or click to select files to upload.</p>
    //   )}
    // </Dropzone>
  );
};

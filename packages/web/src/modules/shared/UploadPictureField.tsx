import * as React from 'react';
import { FieldProps } from 'formik';

import { Form, Upload, Icon, Modal } from 'antd';

const FormItem = Form.Item;

interface State {
  previewVisible: any;
  previewImage: any;
  fileList: any;
}

export class UploadPictureField extends React.Component<FieldProps<any>> {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file: any) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = (info: any) => {
    const { field, form } = this.props;
    const { name } = field;
    const { setFieldValue } = form;
    setFieldValue(name, info.fileList[0].originFileObj || null);
    this.setState({ fileList: info.fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;

    const { field, form } = this.props;
    const { errors } = form;
    const errorMsg = errors[field.name];

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <FormItem help={errorMsg} validateStatus={errorMsg ? 'error' : undefined}>
        <div className="clearfix">
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            accept={'image/*'}
          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      </FormItem>
    );
  }
}

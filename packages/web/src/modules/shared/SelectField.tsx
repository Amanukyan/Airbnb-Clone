import * as React from 'react';
import { FieldProps } from 'formik';
import { Form, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

export const SelectField: React.FunctionComponent<
  FieldProps<any> & {
    prefix: React.ReactNode;
    label?: string;
    optionList: string[];
  }
> = ({
  field: { onChange, onBlur: _, ...field },
  form: { touched, errors, setFieldValue },
  label,
  optionList = [],
  ...props
}) => {
  const errorMsg = errors[field.name];

  return (
    <FormItem
      label={label}
      help={errorMsg}
      validateStatus={errorMsg ? 'error' : undefined}
    >
      <Select
        {...field}
        {...props}
        value={field.value === '' ? undefined : field.value}
        placeholder="Select one"
        onChange={(newValue: any) => setFieldValue(field.name, newValue)}
      >
        {optionList.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </FormItem>
  );
};

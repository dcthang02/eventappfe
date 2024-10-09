import { FormElementType } from "@/utils/enum";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  FormRule,
  Image,
  Input,
  Select,
  Upload,
} from "antd";
import clsx from "clsx";
import React, { FC, Fragment, useCallback, useState } from "react";
import { PiPlusBold } from "react-icons/pi";

export type FormElement = {
  type?: FormElementType;
  name?: string;
  required?: boolean;
  label?: string;
  fieldProps?: any;
  rules?: FormRule[];
  placeholder?: string;
  options?: { label: string; value: string | number }[];
  uploadProps?: any;
  elements?: FormElement[];
  resetName?: string[];
};

type Props = {
  formLayout: FormElement[];
  submitText?: string;
  onSubmit?: any;
  layout?: any;
  submitLoading?: boolean;
  initialValues?: any;
  buttonClassname?: string;
};

const FormLayout: FC<Props> = ({
  formLayout,
  submitText,
  onSubmit,
  layout = "vertical",
  submitLoading = false,
  initialValues,
  buttonClassname = "",
}) => {
  const [form] = Form.useForm<any>();

  const [formValues, setFormValues] = useState(1);

  const renderInput = useCallback((el: FormElement) => {
    return (
      <Form.Item
        name={el?.name}
        required={el?.required}
        rules={el?.rules}
        label={el?.label}
        validateTrigger={["onBlur", "onChange"]}
        {...el?.fieldProps}
      >
        {el?.type === FormElementType.INPUT ? (
          <Input placeholder={el?.placeholder} size="large" />
        ) : (
          <Input.Password placeholder={el?.placeholder} size="large" />
        )}
      </Form.Item>
    );
  }, []);

  const renderTextArea = useCallback((el: FormElement) => {
    return (
      <Form.Item
        name={el?.name}
        required={el?.required}
        rules={el?.rules}
        label={el?.label}
        validateTrigger={["onBlur", "onChange"]}
        {...el?.fieldProps}
      >
        <Input.TextArea placeholder={el?.placeholder} rows={4} />
      </Form.Item>
    );
  }, []);

  const renderSelect = (el: FormElement) => {
    return (
      <Form.Item
        name={el?.name}
        required={el?.required}
        rules={el?.rules}
        label={el?.label}
        validateTrigger={["onBlur", "onChange"]}
        {...el?.fieldProps}
      >
        <Select
          placeholder={el?.placeholder}
          size="large"
          options={el?.options}
          {...el?.fieldProps}
          onChange={(value) => {
            el?.fieldProps?.onChange?.(value);
            if (el?.resetName && el?.resetName?.length > 0) {
              form.resetFields(el?.resetName);
            }
          }}
        />
      </Form.Item>
    );
  };

  const renderUpload = useCallback(
    (el: FormElement) => {
      return (
        <Form.Item
          {...el?.fieldProps}
          name={el?.name}
          required={el?.required}
          rules={el?.rules}
          label={el?.label}
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload
            maxCount={1}
            onChange={() => setFormValues(formValues * -1)}
            showUploadList={true}
          >
            <div
              className={clsx(
                "w-20 h-20 rounded-full bg-slate-100 border overflow-hidden",
                el?.fieldProps?.className
              )}
            >
              {form.getFieldValue([el?.name || ""])?.length > 0 ? (
                <img
                  src={URL.createObjectURL(
                    form.getFieldValue([el?.name || ""])?.[0]?.originFileObj
                  )}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <PiPlusBold size={24} />
                </div>
              )}
            </div>
          </Upload>
        </Form.Item>
      );
    },
    [formValues]
  );

  const renderDatePicker = useCallback((el: FormElement) => {
    return (
      <Form.Item
        name={el?.name}
        required={el?.required}
        rules={el?.rules}
        label={el?.label}
        validateTrigger={["onBlur", "onChange"]}
      >
        <DatePicker
          className="w-full"
          size="large"
          placeholder={el?.placeholder}
          allowClear
          {...el?.fieldProps}
        />
      </Form.Item>
    );
  }, []);

  const renderCheckbox = useCallback((el: FormElement) => {
    return (
      <Form.Item name={el?.name}>
        <Checkbox>{el?.label}</Checkbox>
      </Form.Item>
    );
  }, []);

  const renderUploadMultiple = useCallback(
    (el: FormElement) => {
      return (
        <Form.Item
          {...el?.fieldProps}
          name={el?.name}
          required={el?.required}
          rules={el?.rules}
          label={el?.label}
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload
            className="multi-upload"
            onChange={(value) => setFormValues(formValues * -1)}
            multiple
          >
            <div className="grid grid-cols-4 gap-3 min-h-[200px] border p-3 w-full">
              {form.getFieldValue([el?.name || ""])?.length > 0 ? (
                form.getFieldValue([el?.name || ""])?.map((item: any) => {
                  return (
                    <div key={`item-${JSON.stringify(item)}`}>
                      <img
                        src={URL.createObjectURL(item?.originFileObj)}
                        className="w-[80%] h-[150px] object-cover"
                      />
                      <p>{item?.name}</p>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-4 flex flex-col items-center justify-center">
                  <PiPlusBold size={32} />
                  <p>Tải lên</p>
                </div>
              )}
            </div>
          </Upload>
        </Form.Item>
      );
    },
    [formValues]
  );

  const renderFormElement = useCallback(
    (el: FormElement) => {
      switch (el.type) {
        case FormElementType.INPUT:
        case FormElementType.PASSWORD:
          return renderInput(el);
        case FormElementType.SELECT:
          return renderSelect(el);
        case FormElementType.UPLOAD:
          return renderUpload(el);
        case FormElementType.DATE:
          return renderDatePicker(el);
        case FormElementType.TEXTAREA:
          return renderTextArea(el);
        case FormElementType.CHECKBOX:
          return renderCheckbox(el);
        case FormElementType.UPLOAD_MULTIPLE:
          return renderUploadMultiple(el);
        case FormElementType.GRID:
          return renderGrid(el);
        default:
          return null;
      }
    },
    [
      renderInput,
      renderSelect,
      renderUpload,
      renderDatePicker,
      renderTextArea,
      renderCheckbox,
      renderUploadMultiple,
    ]
  );

  const renderGrid = useCallback(
    (el: FormElement) => {
      return (
        <div
          className={clsx("grid grid-cols-2 gap-4", el?.fieldProps?.className)}
        >
          {el?.elements?.map((item) => (
            <Fragment key={`grid-item-${item?.name}`}>
              {renderFormElement(item)}
            </Fragment>
          ))}
        </div>
      );
    },
    [renderFormElement]
  );

  return (
    <Form
      onFinish={onSubmit}
      layout={layout}
      form={form}
      name="form"
      initialValues={initialValues}
    >
      {formLayout.map((el, index) => (
        <Fragment key={`item-${el.name}-${index}`}>
          {renderFormElement(el)}
        </Fragment>
      ))}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className={clsx("w-full", buttonClassname)}
          loading={submitLoading}
          disabled={submitLoading}
        >
          {submitText || "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormLayout;

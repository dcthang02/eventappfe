import { FormElementType } from "@/utils/enum";
import { Button, Form, FormRule, Image, Input, Select, Upload } from "antd";
import clsx from "clsx";
import React, { FC, Fragment, useCallback, useState } from "react";

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
};

type Props = {
  formLayout: FormElement[];
  submitText?: string;
  onSubmit?: any;
  layout?: any;
  submitLoading?: boolean;
  initialValues?: any;
};

const FormLayout: FC<Props> = ({
  formLayout,
  submitText,
  onSubmit,
  layout = "vertical",
  submitLoading = false,
  initialValues,
}) => {
  const [form] = Form.useForm();

  const [formValues, setFormValues] = useState(initialValues);

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
        <Input placeholder={el?.placeholder} size="large" />
      </Form.Item>
    );
  }, []);

  const renderSelect = useCallback((el: FormElement) => {
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
        />
      </Form.Item>
    );
  }, []);

  const renderUpload = useCallback(
    (el: FormElement) => {
      return (
        <Form.Item
          name={el?.name}
          required={el?.required}
          rules={el?.rules}
          label={el?.label}
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          {...el?.fieldProps}
        >
          <Upload
            maxCount={el?.fieldProps?.multiple ? undefined : 1}
            onChange={(info) => form.setFieldValue(el?.name, info.fileList)}
            fileList={formValues?.[el?.name as string]}
            showUploadList={false}
          >
            {formValues?.[el?.name || ""]?.length > 0 ? (
              <Image
                src={URL.createObjectURL(
                  formValues?.[el?.name || ""]?.[0]?.originFileObj
                )}
                preview
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  marginRight: 10,
                }}
                onClick={(e) => e.preventDefault()}
              />
            ) : (
              <Button shape="circle" htmlType="button">
                Upload
              </Button>
            )}
            {formValues?.[el?.name || ""]?.length > 0 ? (
              <Button htmlType="button">Upload ảnh khác</Button>
            ) : (
              <Button htmlType="button">Upload</Button>
            )}
            <p>upload</p>
          </Upload>
        </Form.Item>
      );
    },
    [formValues]
  );

  const renderGrid = useCallback((el: FormElement) => {
    return (
      <div className={clsx("grid grid-cols-2", el?.fieldProps?.className)}>
        {el?.elements?.map((item) => (
          <Fragment key={`grid-item-${item?.name}`}>
            {renderFormElement(item)}
          </Fragment>
        ))}
      </div>
    );
  }, []);

  const renderFormElement = useCallback(
    (el: FormElement) => {
      switch (el.type) {
        case FormElementType.INPUT:
          return renderInput(el);
        case FormElementType.SELECT:
          return renderSelect(el);
        case FormElementType.UPLOAD:
          return renderUpload(el);
        case FormElementType.GRID:
          return renderGrid(el);
        default:
          return null;
      }
    },
    [renderInput, renderSelect, renderUpload, renderGrid]
  );

  return (
    <Form
      onFinish={onSubmit}
      layout={layout}
      form={form}
      name="form"
      initialValues={initialValues}
      onValuesChange={(a, values) => setFormValues(values)}
    >
      {formLayout.map((el) => (
        <Fragment key={`item-${el.name}`}>{renderFormElement(el)}</Fragment>
      ))}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="w-full"
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

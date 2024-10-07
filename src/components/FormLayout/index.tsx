import { FormElementType } from "@/utils/enum";
import { Button, Form, FormRule, Input } from "antd";
import React, { FC, Fragment, useCallback } from "react";

export type FormElement = {
  type?: FormElementType;
  name?: string;
  required?: boolean;
  label?: string;
  fieldProps?: any;
  rules?: FormRule[];
  placeholder?: string;
};

type Props = {
  formLayout: FormElement[];
  submitText?: string;
  onSubmit?: any;
  layout?: any;
  submitLoading?: boolean;
};

const FormLayout: FC<Props> = ({
  formLayout,
  submitText,
  onSubmit,
  layout = "vertical",
  submitLoading = false,
}) => {
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

  const renderFormElement = useCallback(
    (el: FormElement) => {
      switch (el.type) {
        case FormElementType.INPUT:
          return renderInput(el);
          break;

        default:
          return null;
          break;
      }
    },
    [renderInput]
  );

  return (
    <Form onFinish={onSubmit} layout={layout}>
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

import React from "react";

import ProForm, { ProFormText } from "@ant-design/pro-form";
import "antd/dist/antd.css";
export default () => {
  return (
    <ProForm
      lang={"en-US"}
      onSubmitCapture={async (data) => console.log(data)}
      onFinish={async (values) => {
        console.log(values);
      }}
    >
      <ProFormText name="name" label="N" />
    </ProForm>
  );
};

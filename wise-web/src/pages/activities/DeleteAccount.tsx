import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, notification, Col, Form, Input, Row, Select } from "antd";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebaseConfig";

type UserData = {
  email: string;
  password: string;
};

const AddBooklet = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuth();
  const [initialFormValues, setInitialFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const openNotification = (message: string) => {
    api.open({
      message,
      duration: 3,
    });
  };

  const onFinish: FormProps<UserData>["onFinish"] = async (values) => {};

  const onFinishFailed: FormProps<UserData>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      {contextHolder}
      <Col span={24}>
        <h1>Delete Account</h1>
        <Form
          form={form}
          name="basic"
          layout="vertical"
          labelCol={{ span: 18 }}
          wrapperCol={{ span: 24 }}
          style={{ paddingBlock: 5 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={initialFormValues}
        >
          <Row gutter={30}>
            <Col span={12} xs={24} sm={24} md={12}>
              <Form.Item<UserData>
                label="Booklet email"
                name="email"
                rules={[
                  { required: true, message: "Please enter booklet email" },
                ]}
              >
                <Input placeholder="Enter booklet email" />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} sm={24} md={12}>
              <Form.Item<UserData>
                label="Booklet password"
                name="password"
                rules={[
                  { required: true, message: "Please enter booklet password!" },
                ]}
              >
                <Input placeholder="Enter booklet password" />
              </Form.Item>
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: 5,
            }}
          >
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", paddingInline: 35, margin: 5 }}
                loading={loading}
              >
                Delete Account
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default AddBooklet;

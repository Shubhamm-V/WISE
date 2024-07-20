import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, notification, Checkbox, Col, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { useAuth } from "../context/authContext";

type FieldType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const App: React.FC = () => {
  const { signup, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, []);

  const openNotification = (message: string) => {
    api.open({
      message,
      duration: 3,
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    const { name, email, password, confirmPassword } = values;
    if (password.trim() !== confirmPassword) {
      openNotification("Password and confirm password must be same");
      setLoading(false);
      return;
    }
    let response: any = await signup(email, password, name);
    if (response?.success) {
      navigate("/");
    } else {
      openNotification(response.msg);
    }
    setLoading(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      {contextHolder}
      <Col className="authContainer">
        <h1 style={{ textAlign: "center" }}> Sign Up with WISE </h1>
        <Form
          name="basic"
          layout="vertical"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 24 }}
          style={{ padding: 20 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Enter your email" type="email" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please input confirm password!" },
            ]}
          >
            <Input.Password placeholder="Enter confirm password" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={loading}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label>Already have an account?</label>
          <Link to={"/login"}>
            <Button type="link">Login</Button>
          </Link>
        </Row>
      </Col>
    </Row>
  );
};

export default App;

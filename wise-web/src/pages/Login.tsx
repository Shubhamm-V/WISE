import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, notification, Col, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { useAuth } from "../context/authContext";
type FieldType = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { login, isAuthenticated } = useAuth();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const openNotification = (message: string) => {
    api.open({
      message,
      duration: 3,
    });
  };
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    const { email, password } = values;
    const response: any = await login(email, password);
    setLoading(false);
    if (response.success) {
      navigate("/");
    } else {
      openNotification("Invalid email or password");
    }
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
        <h1 style={{ textAlign: "center" }}> Login with WISE </h1>
        <Form
          name="basic"
          layout="vertical"
          style={{ padding: 20 }}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input type="email" placeholder="Enter you email" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={loading}
            >
              Submit
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
          <label>Don't have an account?</label>
          <Link to={"/signup"}>
            <Button type="link">Sign Up</Button>
          </Link>
        </Row>
      </Col>
    </Row>
  );
};

export default Login;

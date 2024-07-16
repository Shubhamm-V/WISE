import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { Link } from "react-router-dom";
import "./styles.css";
type FieldType = {
  username?: string;
  password?: string;
  confirmPassword?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const App: React.FC = () => {
  return (
    <Row style={{ height: "100vh", display: "grid", placeItems: "center" }}>
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
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            label="Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please input confirm password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
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

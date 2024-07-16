import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { Link } from "react-router-dom";
import "./styles.css";
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const App: React.FC = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row style={{ height: "100vh", display: "grid", placeItems: "center" }}>
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
          <label>Don't have an account?</label>
          <Link to={"/signup"}>
            <Button type="link">Sign Up</Button>
          </Link>
        </Row>
      </Col>
    </Row>
  );
};

export default App;

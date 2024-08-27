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
import { BookletData } from "../../constants/table_columns";

interface BookletProps {
  bookletData?: BookletData;
  onUpdate?: (updateBooklet: BookletData) => void;
}

const AddBooklet: React.FC<BookletProps> = ({ bookletData, onUpdate }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuth();
  const [initialFormValues, setInitialFormValues] = useState({
    url: "",
    title: "",
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

  useEffect(() => {
    if (bookletData) {
      setInitialFormValues((prevValues) => ({
        ...prevValues,
        ...bookletData,
      }));
      form.setFieldsValue({
        ...bookletData,
      });
    }
  }, [bookletData]);

  const onFinish: FormProps<BookletData>["onFinish"] = async (values) => {
    setLoading(true);
    values = {
      ...values,
    };
    try {
      if (!user) {
        throw new Error("User is not authenticated");
      }
      if (bookletData?.id) {
        const bookletRef = doc(db, "booklets", bookletData.id);
        await updateDoc(bookletRef, values);
        if (onUpdate) onUpdate({ ...values, id: bookletData.id });
        openNotification("Booklet updated successfully");
      } else {
        await addDoc(collection(db, "booklets"), {
          ...values,
          userId: user.userId,
          timestamp: serverTimestamp(),
        });
        setTimeout(() => {
          openNotification("Booklets added successfully");
        }, 1000);
      }
      setLoading(false);
      setTimeout(() => {
        navigate("/view-booklets");
      }, 1000);
    } catch (err: any) {
      openNotification("Something went wrong: " + err.message);
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<BookletData>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      {contextHolder}
      <Col span={24}>
        <h1>{bookletData ? "Update Booklet" : "Add Booklet"}</h1>
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
              <Form.Item<BookletData>
                label="Booklet URL"
                name="url"
                rules={[
                  { required: true, message: "Please enter booklet URL" },
                ]}
              >
                <Input placeholder="Enter booklet URL" />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} sm={24} md={12}>
              <Form.Item<BookletData>
                label="Booklet Title"
                name="title"
                rules={[
                  { required: true, message: "Please enter booklet title!" },
                ]}
              >
                <Input placeholder="Enter booklet title" />
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
                {bookletData ? "Update Booklet" : "Add Booklet"}
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default AddBooklet;

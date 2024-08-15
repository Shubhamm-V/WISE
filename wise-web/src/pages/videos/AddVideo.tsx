import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, notification, Col, Form, Input, Row } from "antd";
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
import { VideoData } from "../../constants/table_columns";

interface VideoProps {
  videoData?: VideoData;
  onUpdate?: (updateVideo: VideoData) => void;
}

const AddVideo: React.FC<VideoProps> = ({ videoData, onUpdate }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuth();
  const [initialFormValues, setInitialFormValues] = useState({
    url: "",
    title: "",
    description: "",
    category: "",
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
    if (videoData) {
      setInitialFormValues((prevValues) => ({
        ...prevValues,
        ...videoData,
      }));
      form.setFieldsValue({
        ...videoData,
      });
    }
  }, [videoData]);

  const getVideoID = (url: string) => {
    if (!url) return "";
    const regex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : "";
  };

  const onFinish: FormProps<VideoData>["onFinish"] = async (values) => {
    setLoading(true);
    const videoId = values?.url.includes("youtube.com/shorts")
      ? values?.url?.split("/").pop()?.split("?")[0]
      : getVideoID(values?.url);
    values = {
      ...values,
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    };
    try {
      if (!user) {
        throw new Error("User is not authenticated");
      }
      if (videoData?.id) {
        const videoRef = doc(db, "videos", videoData.id);
        await updateDoc(videoRef, values);
        if (onUpdate) onUpdate({ ...values, id: videoData.id });
        openNotification("Video updated successfully");
      } else {
        await addDoc(collection(db, "videos"), {
          ...values,
          userId: user.userId,
          timestamp: serverTimestamp(),
        });
        setTimeout(() => {
          openNotification("Video added successfully");
        }, 1000);
      }
      setLoading(false);
      navigate("/view-videos");
    } catch (err: any) {
      openNotification("Something went wrong: " + err.message);
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<VideoData>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      {contextHolder}
      <Col span={24}>
        <h1>{videoData ? "Update Video" : "Add Video"}</h1>
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
              <Form.Item<VideoData>
                label="Video URL (Youtube)"
                name="url"
                rules={[
                  { required: true, message: "Please enter youtube video URL" },
                ]}
              >
                <Input placeholder="Enter youtube video URL" />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} sm={24} md={12}>
              <Form.Item<VideoData>
                label="Video Title"
                name="title"
                rules={[
                  { required: true, message: "Please enter video title!" },
                ]}
              >
                <Input placeholder="Enter video title" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item<VideoData>
            label="Video Description"
            name="description"
            rules={[
              { required: true, message: "Please enter video description!" },
            ]}
          >
            <Input.TextArea placeholder="Enter video description" rows={4} />
          </Form.Item>
          <Row gutter={30}>
            <Col span={12} xs={24} sm={12} md={12} lg={8}>
              <Form.Item<VideoData>
                label="Category"
                name="category"
                // rules={[{ required: true, message: "Please enter city!" }]}
              >
                <Input placeholder="Enter city name" />
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
                {videoData ? "Update Video" : "Add Video"}
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default AddVideo;

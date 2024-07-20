import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import {
  Button,
  notification,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

import { STATES } from "../../constants/states"; // Adjust the path according to your project structure
import { useAuth } from "../../context/authContext";
import { db } from "../../firebaseConfig";
import { HospitalData } from "../../constants/table_columns";

const { Option } = Select;

const AddHospital: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const [initialFormValues, setInitialFormValues] = useState({
    hospitalName: "",
    doctorName: "",
    address: "",
    latitude: "",
    longitude: "",
    position: true,
    city: "",
    state: "",
    contact: "",
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
    if (initialFormValues.position) {
      getMyLocation();
    } else {
      form.setFieldsValue({
        latitude: "",
        longitude: "",
      });
    }
  }, [initialFormValues.position]);

  const getMyLocation = () => {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          form.setFieldsValue({
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          });
        },
        (error) => {
          if (error.message.includes("Network error")) {
            openNotification("Please check your internet access");
          } else {
            openNotification("Please give permission to access location");
          }
        }
      );
    }
  };

  const onFinish: FormProps<HospitalData>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      if (!user) {
        throw new Error("User is not authenticated");
      }
      const hospitalData = values;
      delete hospitalData.position;
      console.log("hospitalInfo : ", values);
      const docRef = await addDoc(collection(db, "hospitals"), {
        ...values,
        userId: user.userId,
      });
      openNotification("Hospital added successfully");
      setLoading(false);
      navigate("/view-hospitals");
    } catch (err: any) {
      openNotification("Something went wrong: " + err.message);
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<HospitalData>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      {contextHolder}
      <Col span={24}>
        <h1>Add Hospital</h1>
        <Form
          form={form}
          name="basic"
          layout="vertical"
          labelCol={{ span: 18 }}
          // initialValues={initialFormValues}
          wrapperCol={{ span: 24 }}
          style={{ paddingBlock: 5 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={30}>
            <Col span={12} xs={24} sm={24} md={12}>
              <Form.Item<HospitalData>
                label="Hospital Name"
                name="hospitalName"
                rules={[
                  { required: true, message: "Please enter hospital name!" },
                ]}
              >
                <Input placeholder="Enter hospital name" />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} sm={24} md={12}>
              <Form.Item<HospitalData>
                label="Doctor Name"
                name="doctorName"
                rules={[
                  { required: true, message: "Please enter doctor name!" },
                ]}
              >
                <Input placeholder="Enter doctor name" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item<HospitalData>
            label="Address"
            name="address"
            rules={[
              { required: true, message: "Please enter hospital address!" },
            ]}
          >
            <Input placeholder="Enter hospital address" type="address" />
          </Form.Item>
          <Row gutter={30}>
            <Col span={6} xs={24} sm={12} md={6}>
              <Form.Item<HospitalData>
                label="Latitude"
                name="latitude"
                rules={[
                  {
                    required: true,
                    message: "Please enter latitude of your location!",
                  },
                ]}
              >
                <Input
                  disabled={initialFormValues.position}
                  placeholder="Enter latitude of your location"
                />
              </Form.Item>
            </Col>
            <Col span={6} xs={24} sm={12} md={6}>
              <Form.Item<HospitalData>
                label="Longitude"
                name="longitude"
                rules={[
                  {
                    required: true,
                    message: "Please enter longitude of your location",
                  },
                ]}
              >
                <Input
                  disabled={initialFormValues.position}
                  placeholder="Enter longitude of your location"
                />
              </Form.Item>
            </Col>
            <Col
              span={12}
              xs={24}
              sm={24}
              md={12}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Form.Item<HospitalData> name="position" valuePropName="checked">
                <Checkbox
                  checked={initialFormValues.position}
                  onChange={() => {
                    setInitialFormValues((prevValues) => ({
                      ...prevValues,
                      position: !prevValues.position,
                    }));
                  }}
                >
                  <label style={{ fontSize: 16 }}>
                    Set latitude and longitude of your current location
                  </label>
                </Checkbox>
                <Button type="link">Why we need it?</Button>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col span={12} xs={24} sm={12} md={12} lg={8}>
              <Form.Item<HospitalData>
                label="City"
                name="city"
                rules={[{ required: true, message: "Please enter city!" }]}
              >
                <Input placeholder="Enter city name" />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} sm={12} md={12} lg={8}>
              <Form.Item<HospitalData>
                label="State"
                name="state"
                rules={[
                  { required: true, message: "Please enter state name!" },
                ]}
              >
                <Select placeholder="Select a state">
                  {STATES.map((state) => (
                    <Option key={state} value={state}>
                      {state}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} xs={24} md={12} lg={8} sm={12}>
              <Form.Item<HospitalData>
                label="Contact No."
                name="contact"
                rules={[
                  { required: true, message: "Please enter contact number!" },
                ]}
              >
                <Input placeholder="Enter contact number" />
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
                Add Hospital
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default AddHospital;
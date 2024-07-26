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
  Modal,
} from "antd";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { STATES } from "../../constants/states";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebaseConfig";
import { HospitalData } from "../../constants/table_columns";

const { Option } = Select;

interface HospitalProps {
  hospitalData?: HospitalData;
  onUpdate?: (updatedHospital: HospitalData) => void;
}

const AddHospital: React.FC<HospitalProps> = ({ hospitalData, onUpdate }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showWhyLocation, setShowWhyLocation] = useState<boolean>(false);
  const { user } = useAuth();
  const [initialFormValues, setInitialFormValues] = useState({
    hospitalName: "",
    doctorName: "",
    address: "",
    latitude: "",
    longitude: "",
    position: false,
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
    if (hospitalData) {
      setInitialFormValues((prevValues) => ({
        ...prevValues,
        ...hospitalData,
        position: true,
      }));
      form.setFieldsValue({
        ...hospitalData,
      });
    } else {
      if (initialFormValues.position) {
        getMyLocation();
      } else {
        form.setFieldsValue({
          latitude: "",
          longitude: "",
        });
      }
    }
  }, [initialFormValues.position, hospitalData]);

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
    delete values.position;
    try {
      if (!user) {
        throw new Error("User is not authenticated");
      }
      if (hospitalData?.id) {
        const hospitalDocRef = doc(db, "hospitals", hospitalData.id);
        await updateDoc(hospitalDocRef, values);
        if (onUpdate) onUpdate({ ...values, id: hospitalData.id });
        openNotification("Hospital updated successfully");
      } else {
        await addDoc(collection(db, "hospitals"), {
          ...values,
          userId: user.userId,
        });
        openNotification("Hospital added successfully");
      }
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
        <h1>{hospitalData ? "Update Hospital" : "Add Hospital"}</h1>
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
          initialValues={hospitalData && initialFormValues}
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
            {!hospitalData && (
              <Col
                span={12}
                xs={24}
                sm={24}
                md={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Form.Item<HospitalData>
                  name="position"
                  valuePropName="checked"
                >
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
                  <Button type="link" onClick={() => setShowWhyLocation(true)}>
                    Why we need it?
                  </Button>
                </Form.Item>
              </Col>
            )}
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
                  {
                    pattern: new RegExp(/^[0-9]{10}$/),
                    message: "Please enter a valid 10-digit phone number!",
                  },
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
                {hospitalData ? "Update Hospital" : "Add Hospital"}
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Col>
      <Modal
        centered
        onCancel={() => setShowWhyLocation(false)}
        footer={false}
        open={showWhyLocation}
      >
        <div style={{ paddingBlock: 30 }}>
          <label style={{ fontSize: 16 }}>
            We need your latitude and longitude, which are geospatial
            coordinates that show the address of your hospital. This helps us
            display nearby hospitals to users by calculating the distance
            between them and the hospitals using these geospatial coordinates.
          </label>
        </div>
      </Modal>
    </Row>
  );
};

export default AddHospital;

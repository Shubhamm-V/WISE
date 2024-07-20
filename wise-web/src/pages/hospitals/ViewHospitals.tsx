import { Col, Row, Table, Button, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import {
  getDocs,
  query,
  where,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { db } from "../../firebaseConfig";
import { HOSPITAL_COLUMNS, HospitalData } from "../../constants/table_columns";
import { useAuth } from "../../context/authContext";

const { confirm } = Modal;

type Props = {};

const Users = (props: Props) => {
  const [dataSource, setDataSource] = useState<HospitalData[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const [editHospitalData, setEditHospitalData] = useState();
  const [showEditModal, setShowEditModal] = useState();
  const { user } = useAuth();

  const openNotification = (message: string) => {
    api.open({
      message,
      duration: 3,
    });
  };

  useEffect(() => {
    const getInfo = async () => {
      try {
        const hospitalsRef = collection(db, "hospitals");
        const q = query(hospitalsRef, where("userId", "==", user.userId));
        const querySnapshot = await getDocs(q);

        const hospitalsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as HospitalData[];
        setDataSource(hospitalsData);
      } catch (error) {
        console.error("Error fetching hospital data: ", error);
      }
    };

    getInfo();
  }, [user]);

  const handleEdit = (record: HospitalData) => {
    console.log("Edit record: ", record);
    // Implement edit functionality here
  };

  const handleDelete = async (record: HospitalData) => {
    try {
      const hospitalDoc = doc(db, "hospitals", record.id);
      await deleteDoc(hospitalDoc);
      setDataSource((prevDataSource) =>
        prevDataSource.filter((item) => item.id !== record.id)
      );
      openNotification("Hospital successfully deleted");
    } catch (error) {
      console.error("Error removing hospital: ", error);
    }
  };

  const showDeleteConfirm = (record: HospitalData) => {
    confirm({
      title: "Are you sure delete this hospital?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      centered: true,
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(record);
      },
    });
  };

  const columns = [
    ...HOSPITAL_COLUMNS,
    {
      title: "Edit",
      key: "edit",
      render: (text: any, record: HospitalData) => (
        <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (text: any, record: HospitalData) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => showDeleteConfirm(record)}
        />
      ),
    },
  ];

  return (
    <Row>
      {contextHolder}
      <Col span={24}>
        <Row style={{ display: "flex", alignItems: "center" }}>
          <Col span={17} sm={14} xs={24} md={17}>
            <h1 style={{ marginTop: 0 }}>Your Hospitals</h1>
          </Col>
        </Row>
        <Table
          scroll={{ x: true }}
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
        />
      </Col>
    </Row>
  );
};

export default Users;

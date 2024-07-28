import { Col, Row, Table, Button, Modal, notification, Tag } from "antd";
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
import AddHospital from "./AddHospital";

const { confirm } = Modal;

type Props = {};

const Users = (props: Props) => {
  const [dataSource, setDataSource] = useState<HospitalData[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const [editHospitalData, setEditHospitalData] = useState<HospitalData>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
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
        const q = query(hospitalsRef, where("userId", "==", user?.userId));
        const querySnapshot = await getDocs(q);

        const hospitalsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          userId: user?.userId,
          ...doc.data(),
        })) as HospitalData[];
        console.log("HOSPITALDATA : ", hospitalsData);
        setDataSource(hospitalsData);
      } catch (error) {
        console.error("Error fetching hospital data: ", error);
      }
    };

    getInfo();
  }, [user]);

  const handleEdit = (record: HospitalData) => {
    setEditHospitalData(record);
    setShowEditModal(true);
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

  const updateHospitalData = (updatedHospital: HospitalData) => {
    setDataSource((prevDataSource) => {
      const index = prevDataSource.findIndex(
        (item) => item.id === updatedHospital.id
      );
      if (index !== -1) {
        const newDataSource = [...prevDataSource];
        newDataSource[index] = updatedHospital;
        return newDataSource;
      }
      return [...prevDataSource, updatedHospital];
    });
    setShowEditModal(false);
  };

  const columns = [
    ...HOSPITAL_COLUMNS,
    {
      title: "Status",
      key: "status",
      render: (text: any, record: HospitalData) => (
        <Tag color={record.approved ? "purple" : "volcano"}>
          {record.approved ? "Approved" : "Not Approved"}
        </Tag>
      ),
    },
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
      <Modal
        width={"90%"}
        centered
        open={showEditModal}
        footer={false}
        onCancel={() => setShowEditModal(false)}
      >
        <AddHospital
          hospitalData={editHospitalData}
          onUpdate={updateHospitalData}
        />
      </Modal>
    </Row>
  );
};

export default Users;

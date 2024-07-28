import {
  Col,
  Row,
  Table,
  Button,
  Modal,
  notification,
  Input,
  Radio,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { db } from "../../firebaseConfig";
import { HOSPITAL_COLUMNS, HospitalData } from "../../constants/table_columns";
import { SearchOutlined } from "@ant-design/icons";

import { useAuth } from "../../context/authContext";
import AddHospital from "./AddHospital";

const { confirm } = Modal;

type Props = {};

const AllUserHospitals = (props: Props) => {
  const [dataSource, setDataSource] = useState<HospitalData[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const [editHospitalData, setEditHospitalData] = useState<HospitalData>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [filterCriteria, setFilterCriteria] = useState<string>("clear"); // New state for filter criteria

  const openNotification = (message: string) => {
    api.open({
      message,
      duration: 3,
    });
  };

  useEffect(() => {
    const getInfo = async () => {
      const querySnapshot = await getDocs(collection(db, "hospitals"));
      const allHospitalData: HospitalData[] = [];

      querySnapshot.forEach((doc) => {
        let data = doc.data();
        allHospitalData.push({
          id: doc.id,
          approved: data?.approved || false,
          userId: data?.userId,
          hospitalName: data?.hospitalName,
          doctorName: data?.doctorName,
          address: data?.address,
          latitude: data?.latitude,
          longitude: data?.longitude,
          position: data?.position,
          city: data?.city,
          state: data?.state,
          contact: data?.contact,
        });
      });

      setDataSource(allHospitalData);
    };

    getInfo();
  }, [isApproved]);

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

  const handleApprove = async (hospital: HospitalData, isApproved: boolean) => {
    delete hospital.position;
    await setDoc(doc(db, "hospitals", hospital.id), {
      ...hospital,
      approved: isApproved ? false : true,
    });
    setIsApproved((prev) => !prev);
  };

  const showDeleteConfirm = (record: HospitalData) => {
    confirm({
      title: "Are you sure delete this hospital?",
      icon: <ExclamationCircleOutlined />,
      content: "You can disapprove any time.",
      okText: "Yes",
      centered: true,
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(record);
      },
    });
  };

  const showApproveConfirm = (record: HospitalData) => {
    const isApproved = record.approved;
    confirm({
      title: isApproved
        ? "Are you sure want to cancel approval of this hospital"
        : "Are you sure want to approve this hospital?",
      icon: <ExclamationCircleOutlined />,
      okText: isApproved ? "Cancel Approval" : "Aprrove",
      centered: true,
      okType: "primary",
      okButtonProps: {
        style: {
          backgroundColor: "#9966CC",
        },
      },
      cancelText: "No",
      onOk() {
        handleApprove(record, isApproved);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredDataSource = dataSource.filter((hospital) => {
    const matchesSearchText = [hospital.hospitalName, hospital.doctorName].some(
      (field) =>
        field.toString().toLowerCase().includes(searchText.toLowerCase())
    );

    const matchesFilterCriteria =
      filterCriteria === "clear" ||
      (filterCriteria === "approved" && hospital.approved) ||
      (filterCriteria === "notApproved" && !hospital.approved);

    return matchesSearchText && matchesFilterCriteria;
  });

  const columns = [
    ...HOSPITAL_COLUMNS,
    {
      title: "Status",
      key: "status",
      render: (text: any, record: HospitalData) => (
        <Tag
          color={record.approved ? "purple" : "volcano"}
          style={{ cursor: "pointer" }}
          onClick={() => showApproveConfirm(record)}
        >
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
        <Row style={{ display: "flex", alignItems: "center", marginBlock: 20 }}>
          <Col span={17} sm={14} xs={24} md={17}>
            <h1 style={{ marginTop: 0 }}>Registered Hospitals</h1>
          </Col>
          <Col span={7} sm={10} xs={24} md={7}>
            <Input
              size="large"
              placeholder="Search by name, email, etc"
              value={searchText}
              onChange={handleSearch}
              prefix={<SearchOutlined style={{ marginRight: 5 }} />}
            />
            <Radio.Group
              buttonStyle="solid"
              style={{ marginTop: 10 }}
              onChange={(e) => setFilterCriteria(e.target.value)}
            >
              <Radio.Button value="approved">Approved</Radio.Button>
              <Radio.Button value="notApproved">Not Approverd</Radio.Button>
              <Radio.Button value="clear">No Filter</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <Table
          scroll={{ x: true }}
          dataSource={filteredDataSource}
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

export default AllUserHospitals;

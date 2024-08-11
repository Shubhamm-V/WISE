import { Col, Row, Table, Button, Modal, notification, Input } from "antd";
import { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { db } from "../../firebaseConfig";
import { BOOKLET_COLUMNS, BookletData } from "../../constants/table_columns";
import AddBooklet from "./AddBooklet";

const { confirm } = Modal;

type Props = {};

const PostedBooklets = (props: Props) => {
  const [dataSource, setDataSource] = useState<BookletData[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const [editBookletData, setEditBookletData] = useState<BookletData>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");

  const openNotification = (message: string) => {
    api.open({
      message,
      duration: 3,
    });
  };

  useEffect(() => {
    const getInfo = async () => {
      const querySnapshot = await getDocs(collection(db, "booklets"));
      const allBookletData: BookletData[] = [];

      querySnapshot.forEach((doc) => {
        let data = doc.data();
        allBookletData.push({
          id: doc.id,
          url: data?.url,
          title: data?.title,
        });
      });
      console.log("BOOKLET DATA : ", allBookletData);
      setDataSource(allBookletData);
    };

    getInfo();
  }, []);

  const handleEdit = (record: BookletData) => {
    setEditBookletData(record);
    setShowEditModal(true);
  };

  const handleDelete = async (record: BookletData) => {
    try {
      const bookletDoc = doc(db, "booklets", record.id);
      await deleteDoc(bookletDoc);
      setDataSource((prevDataSource) =>
        prevDataSource.filter((item) => item.id !== record.id)
      );
      openNotification("booklet successfully deleted");
    } catch (error) {
      console.error("Error removing booklet: ", error);
    }
  };

  const showDeleteConfirm = (record: BookletData) => {
    confirm({
      title: "Are you sure delete this booklet?",
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

  const updateBookletData = (updatedbooklet: BookletData) => {
    setDataSource((prevDataSource) => {
      const index = prevDataSource.findIndex(
        (item) => item.id === updatedbooklet.id
      );
      if (index !== -1) {
        const newDataSource = [...prevDataSource];
        newDataSource[index] = updatedbooklet;
        return newDataSource;
      }
      return [...prevDataSource, updatedbooklet];
    });
    setShowEditModal(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredDataSource = dataSource.filter((booklet) =>
    [booklet.title].some((field) =>
      field.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    {
      title: "Sr No",
      key: "srno",
      render: (text: any, record: BookletData, index: number) => index + 1,
    },
    ...BOOKLET_COLUMNS,
    {
      title: "Edit",
      key: "edit",
      render: (text: any, record: BookletData) => (
        <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (text: any, record: BookletData) => (
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
        <Row
          style={{ display: "flex", alignItems: "center", marginBottom: 12 }}
        >
          <Col span={17} sm={14} xs={24} md={17}>
            <h1 style={{ marginTop: 0 }}>Posted booklets</h1>
          </Col>
          <Col span={7} sm={10} xs={24} md={7}>
            <Input
              size="large"
              placeholder="Search by booklet title"
              value={searchText}
              onChange={handleSearch}
              prefix={<SearchOutlined style={{ marginRight: 5 }} />}
            />
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
        <AddBooklet
          bookletData={editBookletData}
          onUpdate={updateBookletData}
        />
      </Modal>
    </Row>
  );
};

export default PostedBooklets;

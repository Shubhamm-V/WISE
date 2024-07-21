import { Col, Row, Table, Button, Modal, notification, Input } from "antd";
import { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { db } from "../../firebaseConfig";
import { VIDEO_COLUMNS, VideoData } from "../../constants/table_columns";
import { SearchOutlined } from "@ant-design/icons";

import { useAuth } from "../../context/authContext";
import AddVideo from "./AddVideo";
const { confirm } = Modal;

type Props = {};

const AllVideos = (props: Props) => {
  const [dataSource, setDataSource] = useState<VideoData[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const [editVideoData, setEditVideoData] = useState<VideoData>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const { user } = useAuth();

  const openNotification = (message: string) => {
    api.open({
      message,
      duration: 3,
    });
  };

  useEffect(() => {
    const getInfo = async () => {
      const querySnapshot = await getDocs(collection(db, "videos"));
      const allVideoData: VideoData[] = [];

      querySnapshot.forEach((doc) => {
        let data = doc.data();
        allVideoData.push({
          id: doc.id,
          url: data?.url,
          title: data?.title,
          description: data?.description,
          category: data?.category,
        });
      });

      setDataSource(allVideoData);
    };

    getInfo();
  }, []);

  const handleEdit = (record: VideoData) => {
    setEditVideoData(record);
    setShowEditModal(true);
  };

  const handleDelete = async (record: VideoData) => {
    try {
      const videoDoc = doc(db, "videos", record.id);
      await deleteDoc(videoDoc);
      setDataSource((prevDataSource) =>
        prevDataSource.filter((item) => item.id !== record.id)
      );
      openNotification("Video successfully deleted");
    } catch (error) {
      console.error("Error removing video: ", error);
    }
  };

  const showDeleteConfirm = (record: VideoData) => {
    confirm({
      title: "Are you sure delete this video?",
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

  const updateVideoData = (updatedVideo: VideoData) => {
    setDataSource((prevDataSource) => {
      const index = prevDataSource.findIndex(
        (item) => item.id === updatedVideo.id
      );
      if (index !== -1) {
        const newDataSource = [...prevDataSource];
        newDataSource[index] = updatedVideo;
        return newDataSource;
      }
      return [...prevDataSource, updatedVideo];
    });
    setShowEditModal(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredDataSource = dataSource.filter((video) =>
    [video.title, video.description].some((field) =>
      field.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    ...VIDEO_COLUMNS,
    {
      title: "Edit",
      key: "edit",
      render: (text: any, record: VideoData) => (
        <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (text: any, record: VideoData) => (
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
            <h1 style={{ marginTop: 0 }}>Posted Videos</h1>
          </Col>
          <Col span={7} sm={10} xs={24} md={7}>
            <Input
              size="large"
              placeholder="Search title or description"
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
        <AddVideo videoData={editVideoData} onUpdate={updateVideoData} />
      </Modal>
    </Row>
  );
};

export default AllVideos;

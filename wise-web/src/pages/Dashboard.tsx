import "./styles.css";
import { Row, Col, Card } from "antd";
import {
  PlusSquareOutlined,
  VideoCameraOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

type Props = {};

type DataCount = {
  totalUsers: number;
  totalHospitals: number;
  totalVideos: number;
};

const Dashboard = (props: Props) => {
  const [allData, setAllData] = useState<DataCount>({
    totalUsers: 0,
    totalHospitals: 0,
    totalVideos: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersSnapshot, hospitalsSnapshot, videosSnapshot] =
          await Promise.all([
            getDocs(collection(db, "users")),
            getDocs(collection(db, "hospitals")),
            getDocs(collection(db, "videos")),
          ]);

        setAllData({
          totalUsers: usersSnapshot.size,
          totalHospitals: hospitalsSnapshot.size,
          totalVideos: videosSnapshot.size,
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      <Row gutter={30}>
        <Col
          span={8}
          lg={8}
          md={12}
          sm={24}
          xs={24}
          style={{ marginBlock: 10 }}
        >
          <Card>
            <div className="cardContent">
              <label className="cardLabel">
                <span>
                  <TeamOutlined style={{ color: "#9966CC", marginRight: 8 }} />
                </span>
                Total Users
              </label>
              <label className="cardLabel">{allData.totalUsers}</label>
            </div>
          </Card>
        </Col>
        <Col
          span={8}
          lg={8}
          md={12}
          sm={24}
          xs={24}
          style={{ marginBlock: 10 }}
        >
          <Card>
            <div className="cardContent">
              <label className="cardLabel">
                <span>
                  <PlusSquareOutlined
                    style={{ color: "#9966CC", marginRight: 8 }}
                  />
                </span>
                Total Hospitals
              </label>
              <label className="cardLabel">{allData.totalHospitals}</label>
            </div>
          </Card>
        </Col>
        <Col
          span={8}
          lg={8}
          md={12}
          sm={24}
          xs={24}
          style={{ marginBlock: 10 }}
        >
          <Card>
            <div className="cardContent">
              <label className="cardLabel">
                <span>
                  <VideoCameraOutlined
                    style={{ color: "#9966CC", marginRight: 8 }}
                  />
                </span>
                Videos Posted
              </label>
              <label className="cardLabel">{allData.totalVideos}</label>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

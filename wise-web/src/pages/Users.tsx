import { Col, Input, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { SearchOutlined } from "@ant-design/icons";
import { USERS_COLUMNS, UserData } from "../constants/table_columns";
type Props = {};

const Users = (props: Props) => {
  const [dataSource, setDataSource] = useState<UserData[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getInfo = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const allUsersData: UserData[] = [];

      querySnapshot.forEach((doc) => {
        let data = doc.data();
        allUsersData.push({
          id: doc.id,
          name: data?.name || "--",
          email: data?.email || "--",
          age: data.age ? data.age.toString() : "--",
          city: data?.city || "--",
          phone: data.phone ? data.phone.toString() : "--",
          state: data?.state || "--",
        });
      });

      setDataSource(allUsersData);
    };

    getInfo();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredDataSource = dataSource.filter((user) =>
    [user.name, user.email, user.age, user.state, user.city].some((field) =>
      field.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Row>
      <Col span={24}>
        <Row style={{ display: "flex", alignItems: "center" }}>
          <Col span={17} sm={14} xs={24} md={17}>
            <h1 style={{ marginTop: 0 }}>Registered Users</h1>
          </Col>
          <Col span={7} sm={10} xs={24} md={7}>
            <Input
              size="large"
              placeholder="Search by name, email, etc"
              value={searchText}
              onChange={handleSearch}
              prefix={<SearchOutlined style={{ marginRight: 5 }} />}
            />
          </Col>
        </Row>
        <Table
          scroll={{ x: true }}
          dataSource={filteredDataSource}
          columns={USERS_COLUMNS}
          rowKey="id"
        />
      </Col>
    </Row>
  );
};

export default Users;

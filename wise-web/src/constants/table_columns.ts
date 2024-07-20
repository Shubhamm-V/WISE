export type UserData = {
  id: string;
  name: string;
  email: string;
  age: string;
  city: string;
  phone: string;
  state: string;
};

export type HospitalData = {
  id: string;
  hospitalName: string;
  doctorName: string;
  address: string;
  latitude: string;
  longitude: string;
  position?: boolean;
  city: string;
  state: string;
  contact: string;
};
export const USERS_COLUMNS = [
  {
    title: "Sr. No.",
    key: "index",
    render: (_text: any, _record: UserData, index: number) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
  },
];

export const HOSPITAL_COLUMNS = [
  {
    title: "Sr. No.",
    key: "index",
    render: (_text: any, _record: HospitalData, index: number) => index + 1,
  },
  {
    title: "Hospital Name",
    dataIndex: "hospitalName",
    key: "hospitalName",
  },
  {
    title: "Doctor Name",
    dataIndex: "doctorName",
    key: "doctorName",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "Contact",
    dataIndex: "contact",
    key: "contact",
  },
];

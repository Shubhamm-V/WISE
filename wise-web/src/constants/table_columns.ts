// Users Table
export type UserData = {
  id: string;
  name: string;
  email: string;
  age: string;
  city: string;
  phone: string;
  state: string;
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

export type HospitalData = {
  id: string;
  hospitalName: string;
  approved: boolean;
  doctorName: string;
  address: string;
  latitude: string;
  longitude: string;
  position?: boolean;
  city: string;
  state: string;
  contact: string;
  userId?: string;
};

// Hospital Table
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

// Videos Table
export type VideoData = {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  category: string;
};

export const VIDEO_COLUMNS = [
  {
    title: "Youtube URL",
    dataIndex: "url",
    key: "url",
  },
  {
    title: "Video Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Video Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Video Category",
    dataIndex: "category",
    key: "category",
  },
];

// Videos Table
export type BookletData = {
  id: string;
  url: string;
  title: string;
};

export const BOOKLET_COLUMNS = [
  {
    title: "Booklet URL",
    dataIndex: "url",
    key: "url",
  },
  {
    title: "Booklet Title",
    dataIndex: "title",
    key: "title",
  },
];

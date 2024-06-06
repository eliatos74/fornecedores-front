import { Space, Table } from "antd";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  name: string;
  lastName: string;
  email: string;
  address: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Sobrenome",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "E-mail",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Endereço",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Ação",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>
          <EditOutlined />
        </a>
        <a>
          <EyeOutlined />
        </a>
        <a>
          <DeleteOutlined />
        </a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "Elias",
    lastName: "Almeida",
    email: "elias@teste",
    address: "Morada Nova",
  },
];

function Tabela() {

  

  return <Table columns={columns} dataSource={data} />;
}

export default Tabela;

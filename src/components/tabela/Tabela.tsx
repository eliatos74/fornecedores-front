import { useEffect, useState } from "react";
import axios from "axios";
import { Space, Table } from "antd";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";

interface DataType {
  key: number;
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

// const data: DataType[] = [
//   {
//     key: "1",
//     name: "Elias",
//     lastName: "Almeida",
//     email: "elias@teste",
//     address: "Morada Nova",
//   },
// ];

function Tabela() {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/fornecedores")
      .then((response) => {
        const transformedData = response.data.map(
          (item: DataType, index: number) => ({
            key: index,
            name: item.name,
            lastName: item.lastName,
            email: item.email,
            address: item.address,
          })
        );
        setData(transformedData);
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao buscar os dados:", error);
      });
  }, []);

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/v1/fornecedores")
  //     .then((response) => {
  //       console.log(response.status); // Exibe os dados no console
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the data!", error);
  //     });
  // }, []);

  return <Table columns={columns} dataSource={data} />;
}

export default Tabela;

import { useEffect, useState } from "react";
import axios from "axios";
import { Space, Table } from "antd";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import BotaoAdd from "./BotaoAdd";
import "./Tabela.css";
import Modal from "../modal/Modal";

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
  const [modalVisible, setModalVisible] = useState(false);

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

  const showModal = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className="header-fornecedores">
        <h2>Fornecedores</h2>
        <BotaoAdd showModal={showModal} />
      </div>
      <Modal showModal={modalVisible} onCancel={handleModalCancel} />
      <Table columns={columns} dataSource={data} className="table" />
    </>
  );
}

export default Tabela;

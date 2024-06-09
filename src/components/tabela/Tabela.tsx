import { useEffect, useState } from "react";
import axios from "axios";
import { Space, Table } from "antd";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import BotaoAdd from "./BotaoAdd";
import "./Tabela.css";
import Modal from "../modal/Modal";

interface DataType {
  key: number;
  id: number;
  name: string;
  lastName: string;
  email: string;
  address: string;
}

function Tabela() {
  const [data, setData] = useState<DataType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFornecedor, setSelectedFornecedor] = useState<DataType | null>(
    null
  );
  const [actionType, setActionType] = useState<
    "create" | "edit" | "delete" | "view"
  >("create");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/api/v1/fornecedores")
      .then((response) => {
        const transformedData = response.data.map(
          (item: DataType, index: number) => ({
            key: index,
            id: item.id,
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
  };

  const showModal = (
    type: "create" | "edit" | "delete" | "view",
    fornecedor?: DataType
  ) => {
    setActionType(type);
    setSelectedFornecedor(fornecedor || null);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleEdit = (record: DataType) => {
    showModal("edit", record);
  };

  const handleView = (record: DataType) => {
    showModal("view", record);
  };

  const handleDelete = (record: DataType) => {
    showModal("delete", record);
  };

  const columns = [
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
      render: (_: unknown, record: DataType) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>
            <EditOutlined />
          </a>
          <a onClick={() => handleView(record)}>
            <EyeOutlined />
          </a>
          <a onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="header-fornecedores">
        <h2>Fornecedores</h2>
        <BotaoAdd showModal={() => showModal("create")} />
      </div>
      <Modal
        showModal={modalVisible}
        onCancel={handleModalCancel}
        fetchData={fetchData}
        selectedFornecedor={selectedFornecedor}
        actionType={actionType}
      />
      <Table columns={columns} dataSource={data} className="table" />
    </>
  );
}

export default Tabela;

import { Modal as AntModal, Form, Input, Button } from "antd";
import axios, { AxiosError } from "axios";
import Notificacao from "../notificacao/Notificacao";
import { useState, useEffect } from "react";

interface ModalProps {
  showModal: boolean;
  onCancel: () => void;
  fetchData: () => void;
  selectedFornecedor?: Data | null;
  actionType: "create" | "edit" | "delete" | "view";
}

interface Data {
  id?: number;
  name: string;
  lastName: string;
  email: string;
  address: string;
}

function Modal({
  showModal,
  onCancel,
  fetchData,
  selectedFornecedor,
  actionType,
}: ModalProps) {
  const [form] = Form.useForm();
  const [typeNotification, setTypeNotification] = useState<"success" | "error">(
    "success"
  );
  const [notification, setNotification] = useState<string>("");

  useEffect(() => {
    if (!showModal) {
      setTypeNotification("success");
      setNotification("");
    } else if (
      (actionType === "edit" || actionType === "view") &&
      selectedFornecedor
    ) {
      form.setFieldsValue(selectedFornecedor);
    } else {
      form.resetFields();
    }
  }, [showModal, actionType, selectedFornecedor]);

  const handleFormSubmit = async (values: Data) => {
    try {
      if (actionType === "create") {
        await axios.post("https://8080-eliatos74-fornecedoresb-r87fn6qhecg.ws-us114.gitpod.io/api/v1/fornecedores", values);
        setNotification("Fornecedor salvo com sucesso!");
      } else if (actionType === "edit" && selectedFornecedor) {
        await axios.put(
          `https://8080-eliatos74-fornecedoresb-r87fn6qhecg.ws-us114.gitpod.io/api/v1/fornecedores/${selectedFornecedor.id}`,
          values
        );
        setNotification("Fornecedor atualizado com sucesso!");
      }
      setTypeNotification("success");
      form.resetFields();
      fetchData();
      onCancel();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.data) {
          console.log(axiosError.response.data.errors.email);
          setNotification(axiosError.response.data.errors.email);
        } else {
          setNotification("Erro desconhecido");
        }
      } else {
        setNotification("Erro desconhecido");
      }
      setTypeNotification("error");
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedFornecedor) {
        await axios.delete(
          `https://8080-eliatos74-fornecedoresb-r87fn6qhecg.ws-us114.gitpod.io/api/v1/fornecedores/${selectedFornecedor.id}`
        );
        setTypeNotification("success");
        setNotification("Fornecedor excluído com sucesso!");
        fetchData();
        onCancel();
      }
    } catch (error) {
      setTypeNotification("error");
      setNotification("Erro ao excluir fornecedor");
    }
  };

  return (
    <>
      <AntModal
        title={
          actionType === "create"
            ? "Adicionar Fornecedor"
            : actionType === "edit"
            ? "Editar Fornecedor"
            : actionType === "view"
            ? "Visualizar Fornecedor"
            : "Excluir Fornecedor"
        }
        open={showModal}
        onCancel={onCancel}
        footer={
          actionType === "delete"
            ? [
                <Button key="cancel" onClick={onCancel}>
                  Cancelar
                </Button>,
                <Button
                  key="delete"
                  type="primary"
                  danger
                  onClick={handleDelete}
                >
                  Excluir
                </Button>,
              ]
            : actionType !== "view"
            ? [
                <Button key="cancel" onClick={onCancel}>
                  Cancelar
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  onClick={() => form.submit()}
                >
                  Salvar
                </Button>,
              ]
            : [
                <Button key="close" onClick={onCancel}>
                  Fechar
                </Button>,
              ]
        }
      >
        {actionType === "delete" ? (
          <p>Deseja realmente excluir o fornecedor?</p>
        ) : (
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              label="Nome"
              name="name"
              rules={
                actionType !== "view"
                  ? [{ required: true, message: "Por favor, insira o nome" }]
                  : undefined
              }
            >
              <Input disabled={actionType === "view"} />
            </Form.Item>
            <Form.Item
              label="Sobrenome"
              name="lastName"
              rules={
                actionType !== "view"
                  ? [
                      {
                        required: true,
                        message: "Por favor, insira o sobrenome",
                      },
                    ]
                  : undefined
              }
            >
              <Input disabled={actionType === "view"} />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name="email"
              rules={
                actionType !== "view"
                  ? [{ required: true, message: "Por favor, insira o e-mail" }]
                  : undefined
              }
            >
              <Input disabled={actionType === "view"} />
            </Form.Item>
            <Form.Item label="Endereço" name="address">
              <Input disabled={actionType === "view"} />
            </Form.Item>
          </Form>
        )}
      </AntModal>
      <Notificacao type={typeNotification} message={notification} />
    </>
  );
}

export default Modal;

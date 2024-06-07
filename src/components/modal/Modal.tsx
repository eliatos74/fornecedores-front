import { Modal as AntModal, Form, Input, Button } from "antd";
import axios, { AxiosError } from "axios";
import Notificacao from "../notificacao/Notificacao";
import { useState, useEffect } from "react";

interface ModalProps {
  showModal: boolean;
  onCancel: () => void;
  fetchData: () => void;
}

interface Data {
  name: string;
  lastName: string;
  email: string;
  address: string;
}

function Modal({ showModal, onCancel, fetchData}: ModalProps) {
  const [form] = Form.useForm();
  const [typeNotification, setTypeNotification] = useState<"success" | "error">(
    "success"
  );
  const [notification, setNotification] = useState<string>("");

  useEffect(() => {
    if (!showModal) {
      setTypeNotification("success");
      setNotification("");
    }
  }, [showModal]);

  const handleFormSubmit = async (values: Data) => {
    try {

      await axios.post("http://localhost:8080/api/v1/fornecedores", values);

      setTypeNotification("success");
      setNotification("Fornecedor salvo com sucesso!");

      form.resetFields();
      fetchData();
      onCancel();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.data) {
          console.log(axiosError.response.data.errors.email)
          setTypeNotification("error");
          setNotification(axiosError.response.data.errors.email);
        } else {
          setTypeNotification("error");
          setNotification("Erro desconhecido");
        }
      }
    }
  };

  return (
    <>
      <AntModal
        title="Adicionar Fornecedor"
        open={showModal}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Salvar
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            handleFormSubmit(values);
          }}
        >
          <Form.Item
            label="Nome"
            name="name"
            rules={[{ required: true, message: "Por favor, insira o nome" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Sobrenome"
            name="lastName"
            rules={[
              { required: true, message: "Por favor, insira o sobrenome" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, message: "Por favor, insira o e-mail" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Endereço" name="address">
            <Input />
          </Form.Item>
        </Form>
      </AntModal>
      <Notificacao type={typeNotification} message={notification} />
    </>
  );
}

export default Modal;

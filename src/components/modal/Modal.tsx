// Modal.tsx
import { Modal as AntModal, Form, Input, Button } from "antd";

interface ModalProps {
  showModal: boolean;
  onCancel: () => void;
}

function Modal({ showModal, onCancel }: ModalProps) {
  const [form] = Form.useForm();

  return (
    <AntModal
      title="Adicionar Fornecedor"
      visible={showModal}
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
          console.log(values); // Aqui você pode enviar os dados para o servidor
          form.resetFields(); // Limpa os campos do formulário após enviar
          onCancel(); // Fecha o modal após enviar o formulário
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
          rules={[{ required: true, message: "Por favor, insira o sobrenome" }]}
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
  );
}

export default Modal;

import { Button, Flex } from "antd";

interface BotaoAddProps {
  showModal: () => void;
}

function BotaoAdd({ showModal }: BotaoAddProps) {
  return (
    <Flex gap="small" wrap>
      <Button type="primary" onClick={showModal}>
        Adicionar
      </Button>
    </Flex>
  );
}

export default BotaoAdd;

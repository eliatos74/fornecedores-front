import { Alert, Space } from "antd";
import { ReactNode } from "react";
import "./Alerttas.css";

interface AlertsProps {
  alertType: "success" | "error" | null;
  alertMessage: ReactNode;
}

function Alertas({ alertType, alertMessage }: AlertsProps) {
  return (
    <Space className={`alerta ${alertType}`}>
      {alertType && <Alert message={alertMessage} type={alertType} />}
    </Space>
  );
}

export default Alertas;

import { useEffect } from "react";
import { notification } from "antd";
import type { NotificationArgsProps } from "antd";

type NotificationPlacement = NotificationArgsProps["placement"];

interface NotificacaoProps {
  type: "error" | "success";
  message: string;
}

function Notificacao({ type, message }: NotificacaoProps) {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const openNotification = (placement: NotificationPlacement) => {
      api[type]({
        message: message,
        placement,
        style: {
          backgroundColor: type === "error" ? "#ff4d4f" : "#52c41a",
        },
      });
    };

    if (message) {
      openNotification("topRight");
    }
  }, [api, type, message]);

  return <>{contextHolder}</>;
}

export default Notificacao;

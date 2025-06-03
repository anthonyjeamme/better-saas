import { ThemeVariant, UIVariant } from "../../core/types";

export type NotificationData =
  | DefaultNotificationData
  | PromiseNotificationData;

export type DefaultNotificationDataInput = Omit<
  DefaultNotificationData,
  "id" | "type"
>;

export type DefaultNotificationData = {
  id: string;
  type: "default";
  text: string;
  theme?: ThemeVariant;
  variant?: UIVariant;
  duration?: number;
  description?: string;
  icon?: React.ReactNode;

  actions?: {
    label: string;
    onClick: (handleClose: () => void) => void;
  }[];
};

export type PromiseNotificationDataInput = Omit<
  PromiseNotificationData,
  "id" | "type" | "status"
>;

export type PromiseNotificationData = {
  id: string;
  type: "promise";

  promise: Promise<void>;
  status: "pending" | "success" | "failure";

  pending: {
    title: string;
    description?: string;
  };
  success?: {
    title: string;
    description?: string;
    duration?: number;
  };
  failure?: {
    title: string;
    description?: string;
    duration?: number;
  };
};

export interface Notification {
  title: string;
  message: string;
  type: "success" | "danger" | "info" | "default" | "warning";
}

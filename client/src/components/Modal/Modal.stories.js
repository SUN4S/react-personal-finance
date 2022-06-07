import { ModalComponent } from "./Modal";

export default {
  title: "Modal",
  component: ModalComponent,
};

export const Default_Light = () => (
  <html data-theme="light">
    <ModalComponent style={{ transform: "translateX(100%)" }} />
  </html>
);

export const Default_Dark = () => (
  <html data-theme="dark">
    <ModalComponent />
  </html>
);

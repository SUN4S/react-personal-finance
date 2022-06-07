import { Sidebar } from "../Navbar/Sidebar";
import { SidebarList } from "./SidebarList";

export default {
  title: "Sidebar List",
  component: SidebarList,
};

export const Default_Light = () => (
  <html data-theme="light">
    <SidebarList />
  </html>
);

export const Default_Dark = () => (
  <html data-theme="dark">
    <SidebarList />
  </html>
);

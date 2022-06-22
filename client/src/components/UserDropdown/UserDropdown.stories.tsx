import { Meta, Story } from "@storybook/react/types-6-0";

import { UserDropdown } from "./UserDropdown";

interface TemplateProps {
  theme: string;
  openStatus: boolean;
  logoutFunction: Function;
}

export default {
  title: "Components/Collapse Button",
  component: UserDropdown,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body style={{}}>
        <UserDropdown
          openStatus={args.openStatus}
          logoutFunction={args.logoutFunction}
        />
      </body>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  openStatus: true,
  logoutFunction: () => alert("clicked"),
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  openStatus: true,
  logoutFunction: () => alert("clicked"),
};

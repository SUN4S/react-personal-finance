import { Meta, Story } from "@storybook/react/types-6-0";
import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

import { ExpenseModalState } from "../../models/expenses";
import { ModalComponent } from "./Modal";
import { Provider } from "react-redux";

interface TemplateProps {
  theme: string;
}

interface StoreProps {
  children: JSX.Element;
  modalData: ExpenseModalState;
}

const collapsedModal = {
  isOpen: false,
  editable: false,
  data: {},
} as ExpenseModalState;

const openModal = {
  isOpen: true,
  editable: false,
  data: {},
} as ExpenseModalState;

// A super-simple mock of a redux store
const Mockstore = ({ children, modalData }: StoreProps) => (
  <Provider
    store={configureStore({
      reducer: {
        modal: createSlice({
          name: "modal",
          initialState: modalData,
          reducers: {
            toggleModal: (
              state: ExpenseModalState,
              action: PayloadAction<ExpenseModalState>
            ) => {
              state.isOpen = action.payload.isOpen;
              state.editable = action.payload.editable;
              state.data = action.payload.data;
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export default {
  title: "Layout/Modal",
  component: ModalComponent,
  excludeStories: /.*MockedState$/,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <ModalComponent />
    </html>
  );
};

export const Default = Template.bind({});
Default.decorators = [
  (story) => <Mockstore modalData={collapsedModal}>{story()}</Mockstore>,
];
Default.args = {
  theme: "light",
};

export const Default_Open_Light = Template.bind({});
Default_Open_Light.decorators = [
  (story) => <Mockstore modalData={openModal}>{story()}</Mockstore>,
];
Default_Open_Light.args = {
  theme: "light",
};

export const Default_Open_Dark = Template.bind({});
Default_Open_Dark.decorators = [
  (story) => <Mockstore modalData={openModal}>{story()}</Mockstore>,
];
Default_Open_Dark.args = {
  theme: "dark",
};

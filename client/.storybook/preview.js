import "../src/styles/main.scss";

import { BrowserRouter, Route, Routes } from "react-router";

import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "../src/app/store";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    </Provider>
  ),
];

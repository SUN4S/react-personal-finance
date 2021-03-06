import "../src/styles/main.scss";
import "../src/styles/normalize.css";
import "../src/layout/ChartContainer/ChartContainer.scss";

import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "../src/app/store";

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    </Provider>
  ),
];

export const parameters = {
  layout: "fullscreen",
};

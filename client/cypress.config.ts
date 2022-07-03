import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    fixturesFolder: "./cypress/fixtures",
    supportFile: "./cypress/support/e2e.ts",
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/integration/*.spec.{js,jsx,ts,tsx}",
  },
});

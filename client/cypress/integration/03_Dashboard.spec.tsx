/// <reference types="Cypress" />

import { afterEach, beforeEach, cy, describe, it } from "local-cypress";

describe("Dashboard", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  it("Renders", () => {
    cy.visit("/");
  });
});

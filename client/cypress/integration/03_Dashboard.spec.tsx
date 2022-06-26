/// <reference types="Cypress" />

describe("Dashboard", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  it("Renders", () => {
    cy.visit("/");
  });
});

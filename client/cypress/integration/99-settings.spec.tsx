/// <reference types="Cypress" />

describe("Settings Page", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  it("Delete User", () => {
    cy.visit("/");
    cy.get(`[data-testid="dropdownToggle"]`).click();
    cy.get(`[data-testid="settingsLink"]`).click();

    cy.get(`[data-testid="deleteUser"]`).should("be.visible");
    cy.get(`[data-testid="deleteUser"]`).click();
    cy.on("window:confirm", () => true);

    cy.contains("Delete User").should("exist");
    cy.contains("User Successfully Deleted").should("exist");
  });
});

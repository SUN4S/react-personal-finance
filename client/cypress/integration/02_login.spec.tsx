/// <reference types="Cypress" />

describe("Login Page", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  it("Contains Inputs", () => {
    cy.visit("/login");
    cy.clearLocalStorage();
    cy.clearCookies();

    cy.get(`[data-testid="username"]`).should("be.visible");
    cy.get(`[data-testid="password"]`).should("be.visible");
    cy.get(`[data-testid="login"]`).should("be.visible");
    cy.get(`[data-testid="register"]`).should("be.visible");
  });

  it("Handles missing fields", () => {
    cy.get(`[data-testid="login"]`).click();

    cy.get(`[data-testid="usernameMissing"]`).should("be.visible");
    cy.get(`[data-testid="passwordMissing"]`).should("be.visible");
  });

  it("Redirects to Register", () => {
    cy.get(`[data-testid="register"]`).click();
  });

  it("Failed Login", () => {
    cy.visit("/login");

    cy.get(`[data-testid="username"]`).type("thisuserdoesnotexis2");
    cy.get(`[data-testid="password"]`).type("!@*#/!$-+Svnmac");
    cy.get(`[data-testid="login"]`).click();

    cy.contains("Login Atempt").should("exist");
    cy.contains("Wrong Username or Password").should("exist");
  });

  it("Log user In", () => {
    cy.get(`[data-testid="username"]`).clear().type("testuser123");
    cy.get(`[data-testid="password"]`)
      .clear()
      .type("randomTestPassword-123!@#");
    cy.get(`[data-testid="login"]`).click();

    cy.contains("Login Atempt").should("exist");
    cy.contains("Logged in successfully").should("exist");

    cy.url().should("be.equal", "http://localhost:3000/");
  });
});

/// <reference types="Cypress" />

import { beforeEach, cy, describe, it } from "local-cypress";

describe("Register Page", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  it("Contains Register Form", () => {
    cy.visit("/register");
    cy.clearLocalStorage();
    cy.clearCookies();

    cy.get(`[data-testid="username"]`).should("be.visible");
    cy.get(`[data-testid="email"]`).should("be.visible");
    cy.get(`[data-testid="password"]`).should("be.visible");
    cy.get(`[data-testid="register"]`).should("be.visible");
  });

  it("Handles missing fields", () => {
    cy.get(`[data-testid="register"]`).click();

    cy.get(`[data-testid="usernameMissing"]`).should("be.visible");
    cy.get(`[data-testid="emailMissing"]`).should("be.visible");
    cy.get(`[data-testid="passwordMissing"]`).should("be.visible");
  });

  it("Failed Register (Weak password)", () => {
    cy.get(`[data-testid="username"]`).type("thisuserdoesnotexis2");
    cy.get(`[data-testid="email"]`).type("dog@gmail.com");
    cy.get(`[data-testid="password"]`).type("dog");
    cy.get(`[data-testid="register"]`).click();

    cy.contains("Register User").should("exist");
    cy.contains(
      "Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length"
    ).should("exist");
  });

  it("Failed Register (Duplicate User)", () => {
    cy.get(`[data-testid="username"]`).clear().type("user123");
    cy.get(`[data-testid="email"]`).clear().type("email@email123-123.com");
    cy.get(`[data-testid="password"]`).clear().type("Password-123");
    cy.get(`[data-testid="register"]`).click();

    cy.contains("Register User").should("exist");
    cy.contains("Username or Email already in use").should("exist");
  });

  it("Registers user", () => {
    cy.get(`[data-testid="username"]`).clear().type("testuser123");
    cy.get(`[data-testid="email"]`).clear().type("randomemail@emaocia.com");
    cy.get(`[data-testid="password"]`)
      .clear()
      .type("randomTestPassword-123!@#");
    cy.get(`[data-testid="register"]`).click();

    cy.url().should("be.equal", "http://localhost:3000/login");
  });
});

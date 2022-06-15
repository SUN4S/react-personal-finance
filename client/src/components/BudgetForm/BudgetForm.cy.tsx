/// <reference types="cypress" />

import { mockBudget, mockExpense } from "../../resources/mockData";

import { BudgetForm } from "./BudgetForm";

describe("<BudgetForm>", () => {
  it("Mounts", () => {
    cy.window().should("have.property", "store");
    //cy.mount(<BudgetForm />);
    cy.viewport(500, 200);
    cy.wait(2000).screenshot({ overwrite: true });
  });
});

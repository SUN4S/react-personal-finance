/// <reference types="cypress" />

import { mockBudget, mockExpense } from "../../resources/mockData";

import { BudgetChart } from "./BudgetChart";

describe("<BudgetChart>", () => {
  it("Mounts", () => {
    cy.mount(
      <BudgetChart
        budgetData={mockBudget}
        expenseData={mockExpense}
        budgetIsFetching={false}
        budgetIsSuccess={true}
        expenseIsFetching={false}
        expenseIsSuccess={true}
      />
    );
    cy.viewport(500, 200);
    cy.wait(2000).screenshot({ overwrite: true });
  });

  it("Changes Theme", () => {
    cy.mount(
      <BudgetChart
        budgetData={mockBudget}
        expenseData={mockExpense}
        budgetIsFetching={false}
        budgetIsSuccess={true}
        expenseIsFetching={false}
        expenseIsSuccess={true}
      />
    );
    cy.viewport(500, 200);

    cy.get(".chart").should(
      "have.css",
      "background-color",
      "rgb(238, 238, 238)"
    );
    cy.get(".chart").should("have.css", "border", "1px solid rgb(157, 23, 77)");
    cy.get(".chart .chartHeader").should(
      "have.css",
      "border-bottom",
      "1px solid rgb(157, 23, 77)"
    );
    cy.get(".chart .chartHeader h3").should(
      "have.css",
      "color",
      "rgb(0, 0, 0)"
    );

    cy.get("html").invoke("attr", "data-theme", "dark");

    cy.get(".chart").should("have.css", "background-color", "rgb(15, 23, 42)");
    cy.get(".chart").should(
      "have.css",
      "border",
      "1px solid rgba(157, 23, 77, 0.93)"
    );
    cy.get(".chart .chartHeader").should(
      "have.css",
      "border-bottom",
      "1px solid rgba(157, 23, 77, 0.93)"
    );
    cy.get(".chart .chartHeader h3").should(
      "have.css",
      "color",
      "rgb(241, 245, 249)"
    );
    cy.wait(2000).screenshot({ overwrite: true });
  });

  it("Contains Chart", () => {
    cy.mount(
      <BudgetChart
        budgetData={mockBudget}
        expenseData={mockExpense}
        budgetIsFetching={false}
        budgetIsSuccess={true}
        expenseIsFetching={false}
        expenseIsSuccess={true}
      />
    );
    cy.wait(2000).viewport(500, 200);

    cy.get("svg").should("be.visible");
  });

  it("Displays Text", () => {
    cy.mount(
      <BudgetChart
        budgetData={mockBudget}
        expenseData={mockExpense}
        budgetIsFetching={false}
        budgetIsSuccess={true}
        expenseIsFetching={false}
        expenseIsSuccess={true}
      />
    );
    cy.viewport(500, 200);

    cy.get("svg text tspan").eq(0).should("have.text", "Remaining");
    cy.get("svg text tspan").eq(1).should("have.text", "409.00");
  });

  it("Displays Loader", () => {
    cy.mount(
      <BudgetChart
        budgetData={mockBudget}
        expenseData={mockExpense}
        budgetIsFetching={true}
        budgetIsSuccess={true}
        expenseIsFetching={true}
        expenseIsSuccess={true}
      />
    );
    cy.viewport(500, 200);

    cy.get("html").invoke("attr", "data-theme", "light");
    cy.screenshot("BudgetChart -- Displays Loader Light", {
      overwrite: true,
    });

    cy.get("html").invoke("attr", "data-theme", "dark");
    cy.screenshot("BudgetChart -- Displays Loader Dark", {
      overwrite: true,
    });
  });
});

/// <reference types="cypress" />

import { DoughnutContainer } from "./BudgetChartDoughnut";
import { mockExpense } from "../../resources/mockData";

describe("<DoughnutContainer>", () => {
  it("Mounts", () => {
    cy.mount(<DoughnutContainer budgetData={420} expenseData={mockExpense} />);
    cy.viewport(500, 150);
    cy.wait(2000).screenshot({ overwrite: true });
  });

  it("Changes Theme", () => {
    cy.mount(<DoughnutContainer budgetData={420} expenseData={mockExpense} />);
    cy.viewport(500, 150);

    cy.get(".doughnutContainer").should(
      "have.css",
      "background-color",
      "rgb(238, 238, 238)"
    );

    cy.get("html").invoke("attr", "data-theme", "dark");

    cy.get(".doughnutContainer").should(
      "have.css",
      "background-color",
      "rgb(15, 23, 42)"
    );

    cy.wait(2000).screenshot({ overwrite: true });
  });

  it("Chart Colors", () => {
    cy.mount(<DoughnutContainer budgetData={420} expenseData={mockExpense} />);
    cy.viewport(500, 150);

    cy.get("html").invoke("attr", "data-theme", "light");
    cy.get("svg path[name=Spent]").should(
      "have.css",
      "fill",
      "rgb(220, 38, 38)"
    );

    cy.get("html").invoke("attr", "data-theme", "dark");
    cy.get("svg path[name=Remaining]").should(
      "have.css",
      "fill",
      "rgb(34, 197, 94)"
    );
  });

  it("Displays Text", () => {
    cy.mount(<DoughnutContainer budgetData={420} expenseData={mockExpense} />);
    cy.viewport(500, 150);

    cy.get("html").invoke("attr", "data-theme", "light");

    cy.get("svg text tspan")
      .eq(0)
      .should("have.text", "Remaining")
      .should("have.css", "fill", "rgb(51, 51, 51)");
    cy.get("svg text tspan")
      .eq(1)
      .should("have.text", "184.00")
      .should("have.css", "fill", "rgb(0, 0, 0)");

    cy.get("html").invoke("attr", "data-theme", "dark");

    cy.get("svg text tspan")
      .eq(0)
      .should("have.text", "Remaining")
      .should("have.css", "fill", "rgb(100, 116, 139)");
    cy.get("svg text tspan")
      .eq(1)
      .should("have.text", "184.00")
      .should("have.css", "fill", "rgb(241, 245, 249)");
  });

  it("Display Legend", () => {
    cy.mount(<DoughnutContainer budgetData={420} expenseData={mockExpense} />);
    cy.viewport(500, 150);

    cy.get(".recharts-legend-wrapper .recharts-default-legend li")
      .eq(0)
      .should("have.text", "Spent");
    cy.get(".recharts-legend-wrapper .recharts-default-legend li")
      .eq(1)
      .should("have.text", "Remaining");
  });

  it("Display Legend Color", () => {
    cy.mount(<DoughnutContainer budgetData={420} expenseData={mockExpense} />);
    cy.viewport(500, 150);

    cy.get(".recharts-legend-wrapper .recharts-default-legend li span")
      .eq(0)
      .should("have.css", "color", "rgb(220, 38, 38)");
    cy.get(".recharts-legend-wrapper .recharts-default-legend li span")
      .eq(1)
      .should("have.css", "color", "rgb(34, 197, 94)");
  });
});

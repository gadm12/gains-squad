describe("Test 05", () => {
  it("will test a successful login", () => {
    cy.visit("/");
    cy.get('[data-cy="email"]').type("mg@mg.com");
    cy.get('[data-cy="password"]').type("mg");
    cy.get('[data-cy="log-btn"]').click();
    cy.url().should("include", "/home");
  });
});

describe("Test 04", () => {
  it("will test creating a user", () => {
    cy.visit("/signup");
    cy.get('[data-cy="email"]').type("mg@mg.com");
    cy.get('[data-cy="password"]').type("mg");
    cy.get('[data-cy="signup-btn"]').click();
    cy.url().should("include", "/signup");
  });
});

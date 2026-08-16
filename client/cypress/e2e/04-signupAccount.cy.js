describe("Sign up", () => {
  it("creates a new account", () => {
    cy.visit("/signup");
    cy.get('[data-cy="email"]').type("cypress@test.com");
    cy.get('[data-cy="password"]').type("test123");
    cy.get('[data-cy="signup-btn"]').click();
    cy.url().should("include", "/signup");
  });
});

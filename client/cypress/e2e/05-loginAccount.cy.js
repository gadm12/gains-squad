describe("login", () => {
  it("login the the account", () => {
    cy.visit("/");
    cy.get('[data-cy="email"]').type("cypress@test.com");
    cy.get('[data-cy="password"]').type("test123");
    cy.get('[data-cy="log-btn"]').click();
    cy.url().should("include", "/home");
  });
});

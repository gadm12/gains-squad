describe("logout", () => {
  it("logout to login page", () => {
    cy.login();
    cy.get('[data-cy="logout-btn"]').click();
    cy.url().should("include", "/");
  });
});

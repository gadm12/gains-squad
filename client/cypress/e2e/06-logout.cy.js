describe("Test 06", () => {
  it("will test user logging out", () => {
    cy.login();
    cy.get('[data-cy="logout-btn"]').click();
    cy.url().should("include", "/");
  });
});

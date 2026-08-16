describe("Test 04", () => {
  it("will test creating a user", () => {
    cy.visit("/signup");
    cy.get('[data-cy="email"]').type("cypress@test.com");
    cy.get('[data-cy="password"]').type("test123");
    cy.get('[data-cy="signup-btn"]').click();
    cy.url().should("include", "/signup");
  });
});

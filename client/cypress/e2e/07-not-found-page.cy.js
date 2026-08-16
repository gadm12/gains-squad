describe("Test 07", () => {
  it("will test if not found page exist", () => {
    cy.login();
    cy.visit("/foo");
    cy.contains("404");
    cy.get('[data-cy="notFound-btn"]').click();
    cy.url().should("include", "/home");
    
  });
});

describe("Not Found", () => {
  it("test if not found page exists", () => {
    cy.visit("/");
    cy.get('[data-cy="email"]').type("cypress@test.com");
    cy.get('[data-cy="password"]').type("test123");
    cy.get('[data-cy="log-btn"]').click();
    cy.url().should("include", "/home");
    cy.visit("/foo");
    cy.contains("404");
    cy.get('[data-cy="notFound-btn"]').click();
    cy.url().should("include", "/home");
  });
});

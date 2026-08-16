describe("Gains Squad", () => {
  it("loads the login page", () => {
    cy.visit("/");
    cy.contains("Gains Squad");
    cy.contains("Login");
  });
});

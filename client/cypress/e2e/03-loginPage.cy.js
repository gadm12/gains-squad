describe("Gain Squad login page", () => {
  it("loads the login page", () => {
    cy.visit("/");
    cy.contains("Login");
    cy.contains("I don't have an account");
  });
});

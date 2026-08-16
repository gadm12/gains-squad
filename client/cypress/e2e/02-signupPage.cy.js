describe("Gain Squad signup page", () => {
  it("loads the signup page", () => {
    cy.visit("/signup");
    cy.contains("already a member");
    cy.contains("Create Account");
  });
});

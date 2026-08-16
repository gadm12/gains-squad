describe("Test 02", () => {
  it("will test if signup page exist", () => {
    cy.visit("/signup");
    cy.contains("already a member");
    cy.contains("Create Account");
  });
});

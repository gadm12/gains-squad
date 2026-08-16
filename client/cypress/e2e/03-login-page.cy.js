describe("Test 03", () => {
  it("will test if the login page exist", () => {
    cy.visit("/");
    cy.contains("Login");
    cy.contains("I don't have an account");
  });
});

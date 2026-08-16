describe("Test 01", () => {
  it("will test if app loads", () => {
    cy.visit("/");
    cy.contains("Gains Squad");
    cy.contains("Login");
  });
});

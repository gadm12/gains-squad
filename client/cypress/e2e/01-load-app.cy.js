describe("Test 01", () => {
  it("will test if app loads", () => {
    cy.visit("/");
    cy.get('canvas');
    cy.contains("Login");
  });
});

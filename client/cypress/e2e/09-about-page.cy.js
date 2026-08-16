describe("Test 09", () => {
  it("will test if about page exist", () => {
    cy.login();
    cy.get('[data-cy="aboutBtn').click();
    cy.url().should("include", "/about");
    cy.get('[data-cy="aboutHeader"]')
      .should("exist")
      .and("have.text", "About Gains Squad");
  });
});

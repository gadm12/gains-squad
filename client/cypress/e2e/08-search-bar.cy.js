describe("Test 08", () => {
  it("will test if search bar exist", () => {
    cy.login();
    cy.get('[data-cy="searchInput"]')
      .should("exist")
      .and(
        "have.attr",
        "placeholder",
        "Search exercise...",
      );
  });
});

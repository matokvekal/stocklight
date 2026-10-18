describe("home page", () => {
  it("shows S&P 500 Swipe", () => {
    cy.visit("/");
    cy.contains("h1", "S&P 500 Swipe").should("be.visible");
  });
});

describe("ItemManager spec", () => {
  context("mobile view", () => {
    beforeEach(() => {
      cy.viewport("samsung-s10");
      cy.visit("http://localhost:3000");
    });
    it("should display the logo and the searchbar in the header", () => {
      cy.get('[data-testid="header-logo"]').should("exist");
      cy.get('[data-testid="header-searchbar"]').should("exist");
    });
    it("should render max 5 elements if there is no search", () => {
      cy.get('[data-testid="item-component"]').should("have.length", 5);
    });
    it("should load more elements if the button is present", () => {
      cy.get('[data-testid="button-load-more"]').should("exist");
      cy.get('[data-testid="item-component"]').should("have.length", 5);
      cy.get('[data-testid="button-load-more"]').click();
      cy.get('[data-testid="item-component"]').should("have.length", 10);
    });
    it('should render "No results" if there is no match', () => {
      cy.get('[data-testid="header-searchbar"]').type("asdasfasdfads");
      cy.get('[data-testid="item-component"]').should("have.length", 0);
      cy.get('[data-testid="item-component__no-results"]').should("exist");
    });
    it("should render the elements according to map", () => {
      cy.fixture("search-assertions").then(
        (
          searchAssertions: {
            searchTerm: string;
            results: number;
          }[]
        ) => {
          searchAssertions.forEach(({ searchTerm, results }) => {
            cy.get('[data-testid="header-searchbar"]').clear().type(searchTerm);
            cy.get('[data-testid="item-component"]').should(
              "have.length",
              results
            );
          });
        }
      );
    });
  });
});

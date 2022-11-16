describe("ItemManager spec", () => {
  context("mobile view", () => {
    beforeEach(() => {
      cy.viewport("samsung-s10");
      cy.visit("http://localhost:3000");
    });
    it("should display the logo and the searchbar", () => {
      cy.get('[data-testid="logo"]').should("exist");
      cy.get('[data-testid="searchbar"]').should("exist");
    });
    it("should render all elements if there is no search", () => {
      cy.get('[data-testid="item-component"]').should("have.length", 20);
    });
    it('should render "No results" if there is no match', () => {
      cy.get('[data-testid="searchbar"]').type("asdasfasdfads");
      cy.get('[data-testid="item-component"]').should("have.length", 0);
      cy.get('[data-testid="no-results"]').should("exist");
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
            cy.get('[data-testid="searchbar"]').clear().type(searchTerm);
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

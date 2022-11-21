describe("ItemManager spec", () => {
  context("mobile view", () => {
    beforeEach(() => {
      cy.viewport("samsung-s10");
      cy.visit("http://localhost:3000");
    });

    it("should display the logo and the searchbar in the header", () => {
      cy.get('[data-testid="header-logo"]').should("exist");
      cy.get('[data-testid="searchbar"]').should("exist");
    });

    describe("searchbar tests", () => {
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
        cy.get('[data-testid="searchbar"]').type("asdasfasdfads");
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
    describe("sorting tests", () => {
      it("should sort the items according to sorting options", () => {
        cy.fixture("sort-assertions").then(
          (
            sortAssertions: {
              sortBy: string;
              orderBy: "asc" | "desc";
              firstResult: string;
              secondResult: string;
            }[]
          ) => {
            sortAssertions.forEach(
              ({ sortBy, orderBy, firstResult, secondResult }) => {
                cy.log(`Sorting by ${sortBy} in ${orderBy} order`);
                cy.get('[data-testid="searchbar"]').clear();
                cy.get('[data-testid="select-sort-field"]').select(sortBy);
                cy.get('[data-testid="select-sort-order"]').select(orderBy);
                cy.wait(100); // wait for the items to be sorted
                cy.get('[data-testid="item-component"]')
                  .first()
                  .should("contain.text", firstResult);
                cy.get('[data-testid="item-component"]')
                  .eq(1)
                  .should("contain.text", secondResult);
              }
            );
          }
        );
      });
    });

    describe("modal & favourite tests", () => {
      it("should open and close the modal", () => {
        cy.get('[data-testid="searchbar-modal"]').should("not.be.visible");
        cy.get('[data-testid="open-modal-button"]').click();
        cy.get('[data-testid="searchbar-modal"]').should("be.visible");
        cy.get('[data-testid="modal-close"]').click();
        cy.get('[data-testid="searchbar-modal"]').should("not.be.visible");
      });

      it("should set and unset favourites", () => {
        // There should be 5 favourite buttons in the page
        cy.get('[data-testid="item-favourite-button"]').should(
          "to.have.length",
          5
        );
        // Favourite everythind in the page
        cy.get('[data-testid="item-favourite-button"]').each(($el) => {
          expect($el).to.contain("♡");
          cy.wrap($el).click();
        });
        // There should be 5 favourite-items in the modal
        cy.get('[data-testid="open-modal-button"]').click();
        cy.get('[data-testid="favourite-item"]').should("to.have.length", 5);
        cy.get('[data-testid="modal-close"]').click();
        // Unfavourite everything in the page
        cy.get('[data-testid="item-favourite-button"]').each(($el) => {
          expect($el).to.contain("♥");
          cy.wrap($el).click();
        });
        cy.get('[data-testid="open-modal-button"]').click();
        // There should be 0 favourite-items in the modal
        cy.get('[data-testid="favourite-item"]').should("to.have.length", 0);
      });

      it("should search items by the title in the favourite modal", () => {
        // mark as favourite every item
        cy.get('[data-testid="item-favourite-button"]').each(($el) => {
          expect($el).to.contain("♡");
          cy.wrap($el).click();
        });
        cy.get('[data-testid="open-modal-button"]').click();
        cy.get('[data-testid="searchbar-modal"]').type("ba");
        cy.get('[data-testid="favourite-item"]').should("to.have.length", 2);
        cy.get('[data-testid="searchbar-modal"]').type("t");
        cy.get('[data-testid="favourite-item"]').should("to.have.length", 1);
        cy.get('[data-testid="searchbar-modal"]').clear();
        cy.get('[data-testid="favourite-item"]').should("to.have.length", 5);
      });

      it("should remove items from the modal", () => {
        cy.get('[data-testid="item-favourite-button"]').each(($el) => {
          cy.wrap($el).click();
        });
        cy.get('[data-state="favourite-active"]').should("to.have.length", 5);
        cy.get('[data-testid="open-modal-button"]').click();
        cy.get('[data-testid="favourite-item-remove"]').first().click();
        cy.get('[data-testid="favourite-item-remove"]').last().click();
        cy.get('[data-testid="favourite-item"]').should("to.have.length", 3);
        cy.get('[data-testid="modal-close"]').click();
        cy.get('[data-state="favourite-active"]').should("to.have.length", 3);
      });
    });
  });
});

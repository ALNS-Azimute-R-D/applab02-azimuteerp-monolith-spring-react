import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('StockLevel e2e test', () => {
  const stockLevelPageUrl = '/stock-level';
  const stockLevelPageUrlPattern = new RegExp('/stock-level(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const stockLevelSample = {"lastModifiedDate":"2024-06-09T08:52:39.361Z","remainingQuantity":5523};

  let stockLevel;
  // let warehouse;
  // let product;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/warehouses',
      body: {"acronym":"although","name":"or lest deceivingly","description":"upbeat ringed","streetAddress":"virtual pantry","houseNumber":"straight yippee nor","locationName":"naive","postalCode":"absent lu","pointLocation":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","pointLocationContentType":"unknown","mainEmail":"eFG@)X.yY","landPhoneNumber":"ah parry","mobilePhoneNumber":"why","faxNumber":"cheery complain","customAttributesDetailsJSON":"exhibition dutiful","activationStatus":"INVALID"},
    }).then(({ body }) => {
      warehouse = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/products',
      body: {"productSKU":"nor","productName":"shellac tournament","description":"measles phooey neatly","standardCost":12837.32,"listPrice":9123.47,"reorderLevel":15682,"targetLevel":16892,"quantityPerUnit":"triangular bathrobe as","discontinued":false,"minimumReorderQuantity":600,"suggestedCategory":"boastfully during kindly","attachments":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","attachmentsContentType":"unknown","activationStatus":"ACTIVE"},
    }).then(({ body }) => {
      product = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/stock-levels+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/stock-levels').as('postEntityRequest');
    cy.intercept('DELETE', '/api/stock-levels/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/warehouses', {
      statusCode: 200,
      body: [warehouse],
    });

    cy.intercept('GET', '/api/products', {
      statusCode: 200,
      body: [product],
    });

  });
   */

  afterEach(() => {
    if (stockLevel) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/stock-levels/${stockLevel.id}`,
      }).then(() => {
        stockLevel = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (warehouse) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/warehouses/${warehouse.id}`,
      }).then(() => {
        warehouse = undefined;
      });
    }
    if (product) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/products/${product.id}`,
      }).then(() => {
        product = undefined;
      });
    }
  });
   */

  it('StockLevels menu should load StockLevels page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('stock-level');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('StockLevel').should('exist');
    cy.url().should('match', stockLevelPageUrlPattern);
  });

  describe('StockLevel page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(stockLevelPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create StockLevel page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/stock-level/new$'));
        cy.getEntityCreateUpdateHeading('StockLevel');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', stockLevelPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/stock-levels',
          body: {
            ...stockLevelSample,
            warehouse: warehouse,
            product: product,
          },
        }).then(({ body }) => {
          stockLevel = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/stock-levels+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/stock-levels?page=0&size=20>; rel="last",<http://localhost/api/stock-levels?page=0&size=20>; rel="first"',
              },
              body: [stockLevel],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(stockLevelPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(stockLevelPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response?.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details StockLevel page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('stockLevel');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', stockLevelPageUrlPattern);
      });

      it('edit button click should load edit StockLevel page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('StockLevel');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', stockLevelPageUrlPattern);
      });

      it('edit button click should load edit StockLevel page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('StockLevel');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', stockLevelPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of StockLevel', () => {
        cy.intercept('GET', '/api/stock-levels/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('stockLevel').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', stockLevelPageUrlPattern);

        stockLevel = undefined;
      });
    });
  });

  describe('new StockLevel page', () => {
    beforeEach(() => {
      cy.visit(`${stockLevelPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('StockLevel');
    });

    it.skip('should create an instance of StockLevel', () => {
      cy.get(`[data-cy="lastModifiedDate"]`).type('2024-06-08T23:24');
      cy.get(`[data-cy="lastModifiedDate"]`).blur();
      cy.get(`[data-cy="lastModifiedDate"]`).should('have.value', '2024-06-08T23:24');

      cy.get(`[data-cy="remainingQuantity"]`).type('2543');
      cy.get(`[data-cy="remainingQuantity"]`).should('have.value', '2543');

      cy.get(`[data-cy="commonAttributesDetailsJSON"]`).type('how');
      cy.get(`[data-cy="commonAttributesDetailsJSON"]`).should('have.value', 'how');

      cy.get(`[data-cy="warehouse"]`).select(1);
      cy.get(`[data-cy="product"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        stockLevel = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', stockLevelPageUrlPattern);
    });
  });
});

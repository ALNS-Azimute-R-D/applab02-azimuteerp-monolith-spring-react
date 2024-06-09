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

describe('CommonLocality e2e test', () => {
  const commonLocalityPageUrl = '/common-locality';
  const commonLocalityPageUrlPattern = new RegExp('/common-locality(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const commonLocalitySample = {"acronym":"stench among woot","name":"alienated","streetAddress":"drab sympathetically but","postalCode":"though co"};

  let commonLocality;
  // let district;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/districts',
      body: {"acronym":"until ov","name":"to circa hmph","geoPolygonArea":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","geoPolygonAreaContentType":"unknown"},
    }).then(({ body }) => {
      district = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/common-localities+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/common-localities').as('postEntityRequest');
    cy.intercept('DELETE', '/api/common-localities/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/districts', {
      statusCode: 200,
      body: [district],
    });

  });
   */

  afterEach(() => {
    if (commonLocality) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/common-localities/${commonLocality.id}`,
      }).then(() => {
        commonLocality = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (district) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/districts/${district.id}`,
      }).then(() => {
        district = undefined;
      });
    }
  });
   */

  it('CommonLocalities menu should load CommonLocalities page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('common-locality');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('CommonLocality').should('exist');
    cy.url().should('match', commonLocalityPageUrlPattern);
  });

  describe('CommonLocality page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(commonLocalityPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create CommonLocality page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/common-locality/new$'));
        cy.getEntityCreateUpdateHeading('CommonLocality');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', commonLocalityPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/common-localities',
          body: {
            ...commonLocalitySample,
            district: district,
          },
        }).then(({ body }) => {
          commonLocality = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/common-localities+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/common-localities?page=0&size=20>; rel="last",<http://localhost/api/common-localities?page=0&size=20>; rel="first"',
              },
              body: [commonLocality],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(commonLocalityPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(commonLocalityPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response?.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details CommonLocality page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('commonLocality');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', commonLocalityPageUrlPattern);
      });

      it('edit button click should load edit CommonLocality page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('CommonLocality');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', commonLocalityPageUrlPattern);
      });

      it('edit button click should load edit CommonLocality page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('CommonLocality');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', commonLocalityPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of CommonLocality', () => {
        cy.intercept('GET', '/api/common-localities/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('commonLocality').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', commonLocalityPageUrlPattern);

        commonLocality = undefined;
      });
    });
  });

  describe('new CommonLocality page', () => {
    beforeEach(() => {
      cy.visit(`${commonLocalityPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('CommonLocality');
    });

    it.skip('should create an instance of CommonLocality', () => {
      cy.get(`[data-cy="acronym"]`).type('apud consensus');
      cy.get(`[data-cy="acronym"]`).should('have.value', 'apud consensus');

      cy.get(`[data-cy="name"]`).type('boohoo strip gadzooks');
      cy.get(`[data-cy="name"]`).should('have.value', 'boohoo strip gadzooks');

      cy.get(`[data-cy="description"]`).type('after mutt');
      cy.get(`[data-cy="description"]`).should('have.value', 'after mutt');

      cy.get(`[data-cy="streetAddress"]`).type('than');
      cy.get(`[data-cy="streetAddress"]`).should('have.value', 'than');

      cy.get(`[data-cy="houseNumber"]`).type('needy');
      cy.get(`[data-cy="houseNumber"]`).should('have.value', 'needy');

      cy.get(`[data-cy="locationName"]`).type('beautifully barley');
      cy.get(`[data-cy="locationName"]`).should('have.value', 'beautifully barley');

      cy.get(`[data-cy="postalCode"]`).type('which');
      cy.get(`[data-cy="postalCode"]`).should('have.value', 'which');

      cy.setFieldImageAsBytesOfEntity('geoPolygonArea', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="district"]`).select(1);

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        commonLocality = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', commonLocalityPageUrlPattern);
    });
  });
});

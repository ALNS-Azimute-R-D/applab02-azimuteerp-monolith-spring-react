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

describe('Supplier e2e test', () => {
  const supplierPageUrl = '/supplier';
  const supplierPageUrlPattern = new RegExp('/supplier(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const supplierSample = {"acronym":"inspect ingest","companyName":"unless","streetAddress":"jittery","activationStatus":"ACTIVE"};

  let supplier;
  // let person;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/people',
      body: {"firstname":"optimistically harbour","lastname":"secret premium","fullname":"lovable breastplate upside-down","birthDate":"2024-06-09","gender":"FEMALE","codeBI":"awkwardly for bah","codeNIF":"restfully excuse","streetAddress":"pupate","houseNumber":"kiddingly between","locationName":"a","postalCode":"felony","mainEmail":"f@VjX.;\"","landPhoneNumber":"angrily shutdow","mobilePhoneNumber":"mid while gladl","occupation":"fearful gladly","preferredLanguage":"who u","usernameInOAuth2":"to without aside","userIdInOAuth2":"provided until sweltering","customAttributesDetailsJSON":"shape closed","activationStatus":"INACTIVE","avatarImg":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","avatarImgContentType":"unknown"},
    }).then(({ body }) => {
      person = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/suppliers+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/suppliers').as('postEntityRequest');
    cy.intercept('DELETE', '/api/suppliers/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/people', {
      statusCode: 200,
      body: [person],
    });

    cy.intercept('GET', '/api/inventory-transactions', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/products', {
      statusCode: 200,
      body: [],
    });

  });
   */

  afterEach(() => {
    if (supplier) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/suppliers/${supplier.id}`,
      }).then(() => {
        supplier = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (person) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/people/${person.id}`,
      }).then(() => {
        person = undefined;
      });
    }
  });
   */

  it('Suppliers menu should load Suppliers page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('supplier');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Supplier').should('exist');
    cy.url().should('match', supplierPageUrlPattern);
  });

  describe('Supplier page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(supplierPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Supplier page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/supplier/new$'));
        cy.getEntityCreateUpdateHeading('Supplier');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', supplierPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/suppliers',
          body: {
            ...supplierSample,
            representativePerson: person,
          },
        }).then(({ body }) => {
          supplier = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/suppliers+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/suppliers?page=0&size=20>; rel="last",<http://localhost/api/suppliers?page=0&size=20>; rel="first"',
              },
              body: [supplier],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(supplierPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(supplierPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response?.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details Supplier page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('supplier');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', supplierPageUrlPattern);
      });

      it('edit button click should load edit Supplier page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Supplier');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', supplierPageUrlPattern);
      });

      it('edit button click should load edit Supplier page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Supplier');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', supplierPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of Supplier', () => {
        cy.intercept('GET', '/api/suppliers/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('supplier').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', supplierPageUrlPattern);

        supplier = undefined;
      });
    });
  });

  describe('new Supplier page', () => {
    beforeEach(() => {
      cy.visit(`${supplierPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Supplier');
    });

    it.skip('should create an instance of Supplier', () => {
      cy.get(`[data-cy="acronym"]`).type('excited modulo faithfully');
      cy.get(`[data-cy="acronym"]`).should('have.value', 'excited modulo faithfully');

      cy.get(`[data-cy="companyName"]`).type('wont hopeful');
      cy.get(`[data-cy="companyName"]`).should('have.value', 'wont hopeful');

      cy.get(`[data-cy="streetAddress"]`).type('incidentally');
      cy.get(`[data-cy="streetAddress"]`).should('have.value', 'incidentally');

      cy.get(`[data-cy="houseNumber"]`).type('compress hand mmm');
      cy.get(`[data-cy="houseNumber"]`).should('have.value', 'compress hand mmm');

      cy.get(`[data-cy="locationName"]`).type('which');
      cy.get(`[data-cy="locationName"]`).should('have.value', 'which');

      cy.get(`[data-cy="city"]`).type('Cheektowaga');
      cy.get(`[data-cy="city"]`).should('have.value', 'Cheektowaga');

      cy.get(`[data-cy="stateProvince"]`).type('lest');
      cy.get(`[data-cy="stateProvince"]`).should('have.value', 'lest');

      cy.get(`[data-cy="zipPostalCode"]`).type('antling ha');
      cy.get(`[data-cy="zipPostalCode"]`).should('have.value', 'antling ha');

      cy.get(`[data-cy="countryRegion"]`).type('migrant');
      cy.get(`[data-cy="countryRegion"]`).should('have.value', 'migrant');

      cy.setFieldImageAsBytesOfEntity('pointLocation', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="mainEmail"]`).type('SQYt.O@BV.G');
      cy.get(`[data-cy="mainEmail"]`).should('have.value', 'SQYt.O@BV.G');

      cy.get(`[data-cy="phoneNumber1"]`).type('suppose');
      cy.get(`[data-cy="phoneNumber1"]`).should('have.value', 'suppose');

      cy.get(`[data-cy="phoneNumber2"]`).type('fluid aromatic ');
      cy.get(`[data-cy="phoneNumber2"]`).should('have.value', 'fluid aromatic ');

      cy.get(`[data-cy="customAttributesDetailsJSON"]`).type('change backcomb');
      cy.get(`[data-cy="customAttributesDetailsJSON"]`).should('have.value', 'change backcomb');

      cy.get(`[data-cy="activationStatus"]`).select('PENDENT');

      cy.get(`[data-cy="representativePerson"]`).select(1);

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        supplier = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', supplierPageUrlPattern);
    });
  });
});

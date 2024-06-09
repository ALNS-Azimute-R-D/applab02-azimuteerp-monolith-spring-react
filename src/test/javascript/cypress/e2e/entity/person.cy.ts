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

describe('Person e2e test', () => {
  const personPageUrl = '/person';
  const personPageUrlPattern = new RegExp('/person(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const personSample = {
    firstname: 'phooey transgress criminalize',
    lastname: 'pale forenenst condor',
    birthDate: '2024-06-09',
    gender: 'OTHER',
    streetAddress: 'subsume downlink',
    postalCode: 'amidst zo',
    mainEmail: 'XMvNtE@E.6iIq*',
    activationStatus: 'BLOCKED',
  };

  let person;
  let typeOfPerson;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/type-of-people',
      body: { code: 'resha', description: 'bossy' },
    }).then(({ body }) => {
      typeOfPerson = body;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/people+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/people').as('postEntityRequest');
    cy.intercept('DELETE', '/api/people/*').as('deleteEntityRequest');
  });

  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/type-of-people', {
      statusCode: 200,
      body: [typeOfPerson],
    });

    cy.intercept('GET', '/api/districts', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/people', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/organization-memberships', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/suppliers', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/customers', {
      statusCode: 200,
      body: [],
    });
  });

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

  afterEach(() => {
    if (typeOfPerson) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/type-of-people/${typeOfPerson.id}`,
      }).then(() => {
        typeOfPerson = undefined;
      });
    }
  });

  it('People menu should load People page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('person');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Person').should('exist');
    cy.url().should('match', personPageUrlPattern);
  });

  describe('Person page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(personPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Person page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/person/new$'));
        cy.getEntityCreateUpdateHeading('Person');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', personPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/people',
          body: {
            ...personSample,
            typeOfPerson: typeOfPerson,
          },
        }).then(({ body }) => {
          person = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/people+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/people?page=0&size=20>; rel="last",<http://localhost/api/people?page=0&size=20>; rel="first"',
              },
              body: [person],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(personPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Person page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('person');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', personPageUrlPattern);
      });

      it('edit button click should load edit Person page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Person');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', personPageUrlPattern);
      });

      it('edit button click should load edit Person page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Person');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', personPageUrlPattern);
      });

      it('last delete button click should delete instance of Person', () => {
        cy.intercept('GET', '/api/people/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('person').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', personPageUrlPattern);

        person = undefined;
      });
    });
  });

  describe('new Person page', () => {
    beforeEach(() => {
      cy.visit(`${personPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Person');
    });

    it('should create an instance of Person', () => {
      cy.get(`[data-cy="firstname"]`).type('dental');
      cy.get(`[data-cy="firstname"]`).should('have.value', 'dental');

      cy.get(`[data-cy="lastname"]`).type('gee insidious psst');
      cy.get(`[data-cy="lastname"]`).should('have.value', 'gee insidious psst');

      cy.get(`[data-cy="fullname"]`).type('even ouch');
      cy.get(`[data-cy="fullname"]`).should('have.value', 'even ouch');

      cy.get(`[data-cy="birthDate"]`).type('2024-06-09');
      cy.get(`[data-cy="birthDate"]`).blur();
      cy.get(`[data-cy="birthDate"]`).should('have.value', '2024-06-09');

      cy.get(`[data-cy="gender"]`).select('MALE');

      cy.get(`[data-cy="codeBI"]`).type('reproachfully');
      cy.get(`[data-cy="codeBI"]`).should('have.value', 'reproachfully');

      cy.get(`[data-cy="codeNIF"]`).type('dictaphone');
      cy.get(`[data-cy="codeNIF"]`).should('have.value', 'dictaphone');

      cy.get(`[data-cy="streetAddress"]`).type('bedroom curdle er');
      cy.get(`[data-cy="streetAddress"]`).should('have.value', 'bedroom curdle er');

      cy.get(`[data-cy="houseNumber"]`).type('handlebar');
      cy.get(`[data-cy="houseNumber"]`).should('have.value', 'handlebar');

      cy.get(`[data-cy="locationName"]`).type('evergreen yuck unwritten');
      cy.get(`[data-cy="locationName"]`).should('have.value', 'evergreen yuck unwritten');

      cy.get(`[data-cy="postalCode"]`).type('yahoo');
      cy.get(`[data-cy="postalCode"]`).should('have.value', 'yahoo');

      cy.get(`[data-cy="mainEmail"]`).type('Hw|@M].{~sC');
      cy.get(`[data-cy="mainEmail"]`).should('have.value', 'Hw|@M].{~sC');

      cy.get(`[data-cy="landPhoneNumber"]`).type('ew');
      cy.get(`[data-cy="landPhoneNumber"]`).should('have.value', 'ew');

      cy.get(`[data-cy="mobilePhoneNumber"]`).type('at huzzah throu');
      cy.get(`[data-cy="mobilePhoneNumber"]`).should('have.value', 'at huzzah throu');

      cy.get(`[data-cy="occupation"]`).type('motion politely couch');
      cy.get(`[data-cy="occupation"]`).should('have.value', 'motion politely couch');

      cy.get(`[data-cy="preferredLanguage"]`).type('tende');
      cy.get(`[data-cy="preferredLanguage"]`).should('have.value', 'tende');

      cy.get(`[data-cy="usernameInOAuth2"]`).type('ha until');
      cy.get(`[data-cy="usernameInOAuth2"]`).should('have.value', 'ha until');

      cy.get(`[data-cy="userIdInOAuth2"]`).type('only and beret');
      cy.get(`[data-cy="userIdInOAuth2"]`).should('have.value', 'only and beret');

      cy.get(`[data-cy="customAttributesDetailsJSON"]`).type('ha');
      cy.get(`[data-cy="customAttributesDetailsJSON"]`).should('have.value', 'ha');

      cy.get(`[data-cy="activationStatus"]`).select('INACTIVE');

      cy.setFieldImageAsBytesOfEntity('avatarImg', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="typeOfPerson"]`).select(1);

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        person = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', personPageUrlPattern);
    });
  });
});

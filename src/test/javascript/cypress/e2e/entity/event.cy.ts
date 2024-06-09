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

describe('Event e2e test', () => {
  const eventPageUrl = '/event';
  const eventPageUrlPattern = new RegExp('/event(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const eventSample = {
    name: 'correct',
    description: 'a',
    startTime: '2024-06-08T22:26:09.835Z',
    defaultTicketValue: 18169.98,
    status: 'CANCELLED',
    activationStatus: 'ON_HOLD',
  };

  let event;
  let typeOfEvent;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/type-of-events',
      body: { acronym: 'biosphere', name: 'hmph forage gaseous', description: 'however', handlerClazzName: 'around' },
    }).then(({ body }) => {
      typeOfEvent = body;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/events+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/events').as('postEntityRequest');
    cy.intercept('DELETE', '/api/events/*').as('deleteEntityRequest');
  });

  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/venues', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/type-of-events', {
      statusCode: 200,
      body: [typeOfEvent],
    });

    cy.intercept('GET', '/api/people', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/asset-collections', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/event-programs', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/ticket-purchaseds', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/event-attendees', {
      statusCode: 200,
      body: [],
    });
  });

  afterEach(() => {
    if (event) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/events/${event.id}`,
      }).then(() => {
        event = undefined;
      });
    }
  });

  afterEach(() => {
    if (typeOfEvent) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/type-of-events/${typeOfEvent.id}`,
      }).then(() => {
        typeOfEvent = undefined;
      });
    }
  });

  it('Events menu should load Events page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('event');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Event').should('exist');
    cy.url().should('match', eventPageUrlPattern);
  });

  describe('Event page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(eventPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Event page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/event/new$'));
        cy.getEntityCreateUpdateHeading('Event');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', eventPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/events',
          body: {
            ...eventSample,
            typeOfEvent: typeOfEvent,
          },
        }).then(({ body }) => {
          event = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/events+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/events?page=0&size=20>; rel="last",<http://localhost/api/events?page=0&size=20>; rel="first"',
              },
              body: [event],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(eventPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Event page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('event');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', eventPageUrlPattern);
      });

      it('edit button click should load edit Event page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Event');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', eventPageUrlPattern);
      });

      it('edit button click should load edit Event page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Event');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', eventPageUrlPattern);
      });

      it('last delete button click should delete instance of Event', () => {
        cy.intercept('GET', '/api/events/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('event').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', eventPageUrlPattern);

        event = undefined;
      });
    });
  });

  describe('new Event page', () => {
    beforeEach(() => {
      cy.visit(`${eventPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Event');
    });

    it('should create an instance of Event', () => {
      cy.get(`[data-cy="acronym"]`).type('brain offensive experienced');
      cy.get(`[data-cy="acronym"]`).should('have.value', 'brain offensive experienced');

      cy.get(`[data-cy="name"]`).type('as slot');
      cy.get(`[data-cy="name"]`).should('have.value', 'as slot');

      cy.get(`[data-cy="description"]`).type('anxiously');
      cy.get(`[data-cy="description"]`).should('have.value', 'anxiously');

      cy.get(`[data-cy="fullDescription"]`).type('per ack indeed');
      cy.get(`[data-cy="fullDescription"]`).should('have.value', 'per ack indeed');

      cy.get(`[data-cy="startTime"]`).type('2024-06-09T04:29');
      cy.get(`[data-cy="startTime"]`).blur();
      cy.get(`[data-cy="startTime"]`).should('have.value', '2024-06-09T04:29');

      cy.get(`[data-cy="endTime"]`).type('2024-06-09T05:29');
      cy.get(`[data-cy="endTime"]`).blur();
      cy.get(`[data-cy="endTime"]`).should('have.value', '2024-06-09T05:29');

      cy.get(`[data-cy="defaultTicketValue"]`).type('23275.69');
      cy.get(`[data-cy="defaultTicketValue"]`).should('have.value', '23275.69');

      cy.get(`[data-cy="status"]`).select('CANCELLED');

      cy.get(`[data-cy="activationStatus"]`).select('INACTIVE');

      cy.get(`[data-cy="typeOfEvent"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        event = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', eventPageUrlPattern);
    });
  });
});

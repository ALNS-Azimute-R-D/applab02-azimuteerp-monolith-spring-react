import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './ticket-purchased.reducer';

export const TicketPurchasedDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const ticketPurchasedEntity = useAppSelector(state => state.ticketPurchased.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="ticketPurchasedDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.detail.title">TicketPurchased</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{ticketPurchasedEntity.id}</dd>
          <dt>
            <span id="buyingCode">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.buyingCode">Buying Code</Translate>
            </span>
          </dt>
          <dd>{ticketPurchasedEntity.buyingCode}</dd>
          <dt>
            <span id="duePaymentDate">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.duePaymentDate">Due Payment Date</Translate>
            </span>
          </dt>
          <dd>
            {ticketPurchasedEntity.duePaymentDate ? (
              <TextFormat value={ticketPurchasedEntity.duePaymentDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="amountOfTickets">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.amountOfTickets">Amount Of Tickets</Translate>
            </span>
          </dt>
          <dd>{ticketPurchasedEntity.amountOfTickets}</dd>
          <dt>
            <span id="taxValue">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.taxValue">Tax Value</Translate>
            </span>
          </dt>
          <dd>{ticketPurchasedEntity.taxValue}</dd>
          <dt>
            <span id="ticketValue">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.ticketValue">Ticket Value</Translate>
            </span>
          </dt>
          <dd>{ticketPurchasedEntity.ticketValue}</dd>
          <dt>
            <span id="acquiredSeatsNumbers">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.acquiredSeatsNumbers">
                Acquired Seats Numbers
              </Translate>
            </span>
          </dt>
          <dd>{ticketPurchasedEntity.acquiredSeatsNumbers}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.description">Description</Translate>
            </span>
          </dt>
          <dd>{ticketPurchasedEntity.description}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.event">Event</Translate>
          </dt>
          <dd>{ticketPurchasedEntity.event ? ticketPurchasedEntity.event.acronym : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.invoice">Invoice</Translate>
          </dt>
          <dd>{ticketPurchasedEntity.invoice ? ticketPurchasedEntity.invoice.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/ticket-purchased" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ticket-purchased/${ticketPurchasedEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TicketPurchasedDetail;

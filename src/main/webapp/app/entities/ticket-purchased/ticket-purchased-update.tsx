import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEvent } from 'app/shared/model/event.model';
import { getEntities as getEvents } from 'app/entities/event/event.reducer';
import { IInvoice } from 'app/shared/model/invoice.model';
import { getEntities as getInvoices } from 'app/entities/invoice/invoice.reducer';
import { ITicketPurchased } from 'app/shared/model/ticket-purchased.model';
import { getEntity, updateEntity, createEntity, reset } from './ticket-purchased.reducer';

export const TicketPurchasedUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const events = useAppSelector(state => state.event.entities);
  const invoices = useAppSelector(state => state.invoice.entities);
  const ticketPurchasedEntity = useAppSelector(state => state.ticketPurchased.entity);
  const loading = useAppSelector(state => state.ticketPurchased.loading);
  const updating = useAppSelector(state => state.ticketPurchased.updating);
  const updateSuccess = useAppSelector(state => state.ticketPurchased.updateSuccess);

  const handleClose = () => {
    navigate('/ticket-purchased' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getEvents({}));
    dispatch(getInvoices({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.duePaymentDate = convertDateTimeToServer(values.duePaymentDate);
    if (values.amountOfTickets !== undefined && typeof values.amountOfTickets !== 'number') {
      values.amountOfTickets = Number(values.amountOfTickets);
    }
    if (values.taxValue !== undefined && typeof values.taxValue !== 'number') {
      values.taxValue = Number(values.taxValue);
    }
    if (values.ticketValue !== undefined && typeof values.ticketValue !== 'number') {
      values.ticketValue = Number(values.ticketValue);
    }

    const entity = {
      ...ticketPurchasedEntity,
      ...values,
      event: events.find(it => it.id.toString() === values.event?.toString()),
      invoice: invoices.find(it => it.id.toString() === values.invoice?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          duePaymentDate: displayDefaultDateTime(),
        }
      : {
          ...ticketPurchasedEntity,
          duePaymentDate: convertDateTimeFromServer(ticketPurchasedEntity.duePaymentDate),
          event: ticketPurchasedEntity?.event?.id,
          invoice: ticketPurchasedEntity?.invoice?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.ticketPurchased.home.createOrEditLabel" data-cy="TicketPurchasedCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.home.createOrEditLabel">
              Create or edit a TicketPurchased
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="ticket-purchased-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.ticketPurchased.buyingCode')}
                id="ticket-purchased-buyingCode"
                name="buyingCode"
                data-cy="buyingCode"
                type="text"
                validate={{
                  maxLength: { value: 30, message: translate('entity.validation.maxlength', { max: 30 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.ticketPurchased.duePaymentDate')}
                id="ticket-purchased-duePaymentDate"
                name="duePaymentDate"
                data-cy="duePaymentDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.ticketPurchased.amountOfTickets')}
                id="ticket-purchased-amountOfTickets"
                name="amountOfTickets"
                data-cy="amountOfTickets"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.ticketPurchased.taxValue')}
                id="ticket-purchased-taxValue"
                name="taxValue"
                data-cy="taxValue"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.ticketPurchased.ticketValue')}
                id="ticket-purchased-ticketValue"
                name="ticketValue"
                data-cy="ticketValue"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.ticketPurchased.acquiredSeatsNumbers')}
                id="ticket-purchased-acquiredSeatsNumbers"
                name="acquiredSeatsNumbers"
                data-cy="acquiredSeatsNumbers"
                type="text"
                validate={{
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.ticketPurchased.description')}
                id="ticket-purchased-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  maxLength: { value: 255, message: translate('entity.validation.maxlength', { max: 255 }) },
                }}
              />
              <ValidatedField
                id="ticket-purchased-event"
                name="event"
                data-cy="event"
                label={translate('azimuteErpSpringReactMonolith03App.ticketPurchased.event')}
                type="select"
              >
                <option value="" key="0" />
                {events
                  ? events.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.acronym}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="ticket-purchased-invoice"
                name="invoice"
                data-cy="invoice"
                label={translate('azimuteErpSpringReactMonolith03App.ticketPurchased.invoice')}
                type="select"
              >
                <option value="" key="0" />
                {invoices
                  ? invoices.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/ticket-purchased" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TicketPurchasedUpdate;

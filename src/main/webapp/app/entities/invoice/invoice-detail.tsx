import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './invoice.reducer';

export const InvoiceDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const invoiceEntity = useAppSelector(state => state.invoice.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="invoiceDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.invoice.detail.title">Invoice</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.id}</dd>
          <dt>
            <span id="businessCode">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.invoice.businessCode">Business Code</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.businessCode}</dd>
          <dt>
            <span id="invoiceDate">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.invoice.invoiceDate">Invoice Date</Translate>
            </span>
          </dt>
          <dd>
            {invoiceEntity.invoiceDate ? <TextFormat value={invoiceEntity.invoiceDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="dueDate">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.invoice.dueDate">Due Date</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.dueDate ? <TextFormat value={invoiceEntity.dueDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.invoice.description">Description</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.description}</dd>
          <dt>
            <span id="taxValue">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.invoice.taxValue">Tax Value</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.taxValue}</dd>
          <dt>
            <span id="shippingValue">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.invoice.shippingValue">Shipping Value</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.shippingValue}</dd>
          <dt>
            <span id="amountDueValue">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.invoice.amountDueValue">Amount Due Value</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.amountDueValue}</dd>
          <dt>
            <span id="numberOfInstallmentsOriginal">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.invoice.numberOfInstallmentsOriginal">
                Number Of Installments Original
              </Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.numberOfInstallmentsOriginal}</dd>
          <dt>
            <span id="numberOfInstallmentsPaid">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.invoice.numberOfInstallmentsPaid">
                Number Of Installments Paid
              </Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.numberOfInstallmentsPaid}</dd>
          <dt>
            <span id="amountPaidValue">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.invoice.amountPaidValue">Amount Paid Value</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.amountPaidValue}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.invoice.status">Status</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.status}</dd>
          <dt>
            <span id="customAttributesDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.invoice.customAttributesDetailsJSON">
                Custom Attributes Details JSON
              </Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.customAttributesDetailsJSON}</dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.invoice.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.activationStatus}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.invoice.preferrablePaymentGateway">
              Preferrable Payment Gateway
            </Translate>
          </dt>
          <dd>{invoiceEntity.preferrablePaymentGateway ? invoiceEntity.preferrablePaymentGateway.aliasCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/invoice" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/invoice/${invoiceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default InvoiceDetail;

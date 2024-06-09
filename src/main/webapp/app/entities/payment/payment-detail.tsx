import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './payment.reducer';

export const PaymentDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const paymentEntity = useAppSelector(state => state.payment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="paymentDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.detail.title">Payment</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{paymentEntity.id}</dd>
          <dt>
            <span id="installmentNumber">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.installmentNumber">Installment Number</Translate>
            </span>
          </dt>
          <dd>{paymentEntity.installmentNumber}</dd>
          <dt>
            <span id="paymentDueDate">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.paymentDueDate">Payment Due Date</Translate>
            </span>
          </dt>
          <dd>
            {paymentEntity.paymentDueDate ? <TextFormat value={paymentEntity.paymentDueDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="paymentPaidDate">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.paymentPaidDate">Payment Paid Date</Translate>
            </span>
          </dt>
          <dd>
            {paymentEntity.paymentPaidDate ? (
              <TextFormat value={paymentEntity.paymentPaidDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="paymentAmount">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.paymentAmount">Payment Amount</Translate>
            </span>
          </dt>
          <dd>{paymentEntity.paymentAmount}</dd>
          <dt>
            <span id="typeOfPayment">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.typeOfPayment">Type Of Payment</Translate>
            </span>
          </dt>
          <dd>{paymentEntity.typeOfPayment}</dd>
          <dt>
            <span id="statusPayment">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.statusPayment">Status Payment</Translate>
            </span>
          </dt>
          <dd>{paymentEntity.statusPayment}</dd>
          <dt>
            <span id="customAttributesDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.customAttributesDetailsJSON">
                Custom Attributes Details JSON
              </Translate>
            </span>
          </dt>
          <dd>{paymentEntity.customAttributesDetailsJSON}</dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{paymentEntity.activationStatus}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.paymentGateway">Payment Gateway</Translate>
          </dt>
          <dd>{paymentEntity.paymentGateway ? paymentEntity.paymentGateway.aliasCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/payment" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payment/${paymentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PaymentDetail;

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './payment-gateway.reducer';

export const PaymentGatewayDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const paymentGatewayEntity = useAppSelector(state => state.paymentGateway.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="paymentGatewayDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.paymentGateway.detail.title">PaymentGateway</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{paymentGatewayEntity.id}</dd>
          <dt>
            <span id="aliasCode">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.paymentGateway.aliasCode">Alias Code</Translate>
            </span>
          </dt>
          <dd>{paymentGatewayEntity.aliasCode}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.paymentGateway.description">Description</Translate>
            </span>
          </dt>
          <dd>{paymentGatewayEntity.description}</dd>
          <dt>
            <span id="businessHandlerClazz">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.paymentGateway.businessHandlerClazz">
                Business Handler Clazz
              </Translate>
            </span>
          </dt>
          <dd>{paymentGatewayEntity.businessHandlerClazz}</dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.paymentGateway.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{paymentGatewayEntity.activationStatus}</dd>
        </dl>
        <Button tag={Link} to="/payment-gateway" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payment-gateway/${paymentGatewayEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PaymentGatewayDetail;

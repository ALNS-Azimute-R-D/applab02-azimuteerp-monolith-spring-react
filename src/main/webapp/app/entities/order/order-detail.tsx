import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './order.reducer';

export const OrderDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const orderEntity = useAppSelector(state => state.order.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="orderDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.order.detail.title">Order</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{orderEntity.id}</dd>
          <dt>
            <span id="businessCode">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.order.businessCode">Business Code</Translate>
            </span>
          </dt>
          <dd>{orderEntity.businessCode}</dd>
          <dt>
            <span id="placedDate">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.order.placedDate">Placed Date</Translate>
            </span>
          </dt>
          <dd>{orderEntity.placedDate ? <TextFormat value={orderEntity.placedDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="totalTaxValue">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.order.totalTaxValue">Total Tax Value</Translate>
            </span>
          </dt>
          <dd>{orderEntity.totalTaxValue}</dd>
          <dt>
            <span id="totalDueValue">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.order.totalDueValue">Total Due Value</Translate>
            </span>
          </dt>
          <dd>{orderEntity.totalDueValue}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.order.status">Status</Translate>
            </span>
          </dt>
          <dd>{orderEntity.status}</dd>
          <dt>
            <span id="estimatedDeliveryDate">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.order.estimatedDeliveryDate">Estimated Delivery Date</Translate>
            </span>
          </dt>
          <dd>
            {orderEntity.estimatedDeliveryDate ? (
              <TextFormat value={orderEntity.estimatedDeliveryDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.order.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{orderEntity.activationStatus}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.order.invoice">Invoice</Translate>
          </dt>
          <dd>{orderEntity.invoice ? orderEntity.invoice.description : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.order.customer">Customer</Translate>
          </dt>
          <dd>{orderEntity.customer ? orderEntity.customer.fullname : ''}</dd>
        </dl>
        <Button tag={Link} to="/order" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/order/${orderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrderDetail;

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './customer.reducer';

export const CustomerDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const customerEntity = useAppSelector(state => state.customer.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="customerDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.customer.detail.title">Customer</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{customerEntity.id}</dd>
          <dt>
            <span id="customerBusinessCode">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.customer.customerBusinessCode">Customer Business Code</Translate>
            </span>
          </dt>
          <dd>{customerEntity.customerBusinessCode}</dd>
          <dt>
            <span id="fullname">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.customer.fullname">Fullname</Translate>
            </span>
          </dt>
          <dd>{customerEntity.fullname}</dd>
          <dt>
            <span id="customAttributesDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.customer.customAttributesDetailsJSON">
                Custom Attributes Details JSON
              </Translate>
            </span>
          </dt>
          <dd>{customerEntity.customAttributesDetailsJSON}</dd>
          <dt>
            <span id="customerStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.customer.customerStatus">Customer Status</Translate>
            </span>
          </dt>
          <dd>{customerEntity.customerStatus}</dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.customer.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{customerEntity.activationStatus}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.customer.buyerPerson">Buyer Person</Translate>
          </dt>
          <dd>{customerEntity.buyerPerson ? customerEntity.buyerPerson.lastname : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.customer.customerType">Customer Type</Translate>
          </dt>
          <dd>{customerEntity.customerType ? customerEntity.customerType.name : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.customer.district">District</Translate>
          </dt>
          <dd>{customerEntity.district ? customerEntity.district.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/customer" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer/${customerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CustomerDetail;

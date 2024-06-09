import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './customer-type.reducer';

export const CustomerTypeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const customerTypeEntity = useAppSelector(state => state.customerType.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="customerTypeDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.customerType.detail.title">CustomerType</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{customerTypeEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.customerType.name">Name</Translate>
            </span>
          </dt>
          <dd>{customerTypeEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.customerType.description">Description</Translate>
            </span>
          </dt>
          <dd>{customerTypeEntity.description}</dd>
          <dt>
            <span id="businessHandlerClazz">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.customerType.businessHandlerClazz">
                Business Handler Clazz
              </Translate>
            </span>
          </dt>
          <dd>{customerTypeEntity.businessHandlerClazz}</dd>
        </dl>
        <Button tag={Link} to="/customer-type" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer-type/${customerTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CustomerTypeDetail;

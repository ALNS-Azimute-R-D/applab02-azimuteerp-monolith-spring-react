import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './business-unit.reducer';

export const BusinessUnitDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const businessUnitEntity = useAppSelector(state => state.businessUnit.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="businessUnitDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.businessUnit.detail.title">BusinessUnit</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{businessUnitEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.businessUnit.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{businessUnitEntity.acronym}</dd>
          <dt>
            <span id="hierarchicalLevel">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.businessUnit.hierarchicalLevel">Hierarchical Level</Translate>
            </span>
          </dt>
          <dd>{businessUnitEntity.hierarchicalLevel}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.businessUnit.name">Name</Translate>
            </span>
          </dt>
          <dd>{businessUnitEntity.name}</dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.businessUnit.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{businessUnitEntity.activationStatus}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.businessUnit.organization">Organization</Translate>
          </dt>
          <dd>{businessUnitEntity.organization ? businessUnitEntity.organization.name : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.businessUnit.businessUnitParent">Business Unit Parent</Translate>
          </dt>
          <dd>{businessUnitEntity.businessUnitParent ? businessUnitEntity.businessUnitParent.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/business-unit" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/business-unit/${businessUnitEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BusinessUnitDetail;

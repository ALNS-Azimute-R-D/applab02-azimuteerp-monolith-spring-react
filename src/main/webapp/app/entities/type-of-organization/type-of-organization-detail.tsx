import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './type-of-organization.reducer';

export const TypeOfOrganizationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const typeOfOrganizationEntity = useAppSelector(state => state.typeOfOrganization.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="typeOfOrganizationDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfOrganization.detail.title">TypeOfOrganization</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{typeOfOrganizationEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfOrganization.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{typeOfOrganizationEntity.acronym}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfOrganization.name">Name</Translate>
            </span>
          </dt>
          <dd>{typeOfOrganizationEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfOrganization.description">Description</Translate>
            </span>
          </dt>
          <dd>{typeOfOrganizationEntity.description}</dd>
          <dt>
            <span id="businessHandlerClazz">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.typeOfOrganization.businessHandlerClazz">
                Business Handler Clazz
              </Translate>
            </span>
          </dt>
          <dd>{typeOfOrganizationEntity.businessHandlerClazz}</dd>
        </dl>
        <Button tag={Link} to="/type-of-organization" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/type-of-organization/${typeOfOrganizationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TypeOfOrganizationDetail;

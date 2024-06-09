import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './organization-attribute.reducer';

export const OrganizationAttributeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const organizationAttributeEntity = useAppSelector(state => state.organizationAttribute.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="organizationAttributeDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationAttribute.detail.title">OrganizationAttribute</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{organizationAttributeEntity.id}</dd>
          <dt>
            <span id="attributeName">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationAttribute.attributeName">Attribute Name</Translate>
            </span>
          </dt>
          <dd>{organizationAttributeEntity.attributeName}</dd>
          <dt>
            <span id="attributeValue">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationAttribute.attributeValue">Attribute Value</Translate>
            </span>
          </dt>
          <dd>{organizationAttributeEntity.attributeValue}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationAttribute.organization">Organization</Translate>
          </dt>
          <dd>{organizationAttributeEntity.organization ? organizationAttributeEntity.organization.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/organization-attribute" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/organization-attribute/${organizationAttributeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrganizationAttributeDetail;

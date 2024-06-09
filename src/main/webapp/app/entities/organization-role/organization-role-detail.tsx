import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './organization-role.reducer';

export const OrganizationRoleDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const organizationRoleEntity = useAppSelector(state => state.organizationRole.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="organizationRoleDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationRole.detail.title">OrganizationRole</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{organizationRoleEntity.id}</dd>
          <dt>
            <span id="roleName">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationRole.roleName">Role Name</Translate>
            </span>
          </dt>
          <dd>{organizationRoleEntity.roleName}</dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationRole.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{organizationRoleEntity.activationStatus}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationRole.organization">Organization</Translate>
          </dt>
          <dd>{organizationRoleEntity.organization ? organizationRoleEntity.organization.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/organization-role" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/organization-role/${organizationRoleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrganizationRoleDetail;

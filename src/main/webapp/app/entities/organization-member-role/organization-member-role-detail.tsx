import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './organization-member-role.reducer';

export const OrganizationMemberRoleDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const organizationMemberRoleEntity = useAppSelector(state => state.organizationMemberRole.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="organizationMemberRoleDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationMemberRole.detail.title">OrganizationMemberRole</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{organizationMemberRoleEntity.id}</dd>
          <dt>
            <span id="joinedAt">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationMemberRole.joinedAt">Joined At</Translate>
            </span>
          </dt>
          <dd>
            {organizationMemberRoleEntity.joinedAt ? (
              <TextFormat value={organizationMemberRoleEntity.joinedAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationMemberRole.organizationMembership">
              Organization Membership
            </Translate>
          </dt>
          <dd>{organizationMemberRoleEntity.organizationMembership ? organizationMemberRoleEntity.organizationMembership.id : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationMemberRole.organizationRole">Organization Role</Translate>
          </dt>
          <dd>{organizationMemberRoleEntity.organizationRole ? organizationMemberRoleEntity.organizationRole.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/organization-member-role" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/organization-member-role/${organizationMemberRoleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrganizationMemberRoleDetail;

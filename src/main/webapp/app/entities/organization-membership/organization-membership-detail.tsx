import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './organization-membership.reducer';

export const OrganizationMembershipDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const organizationMembershipEntity = useAppSelector(state => state.organizationMembership.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="organizationMembershipDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationMembership.detail.title">OrganizationMembership</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{organizationMembershipEntity.id}</dd>
          <dt>
            <span id="joinedAt">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationMembership.joinedAt">Joined At</Translate>
            </span>
          </dt>
          <dd>
            {organizationMembershipEntity.joinedAt ? (
              <TextFormat value={organizationMembershipEntity.joinedAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationMembership.activationStatus">
                Activation Status
              </Translate>
            </span>
          </dt>
          <dd>{organizationMembershipEntity.activationStatus}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationMembership.organization">Organization</Translate>
          </dt>
          <dd>{organizationMembershipEntity.organization ? organizationMembershipEntity.organization.name : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationMembership.person">Person</Translate>
          </dt>
          <dd>{organizationMembershipEntity.person ? organizationMembershipEntity.person.lastname : ''}</dd>
        </dl>
        <Button tag={Link} to="/organization-membership" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/organization-membership/${organizationMembershipEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrganizationMembershipDetail;

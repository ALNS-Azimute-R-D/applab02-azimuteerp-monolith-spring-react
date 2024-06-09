import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './organization-domain.reducer';

export const OrganizationDomainDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const organizationDomainEntity = useAppSelector(state => state.organizationDomain.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="organizationDomainDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationDomain.detail.title">OrganizationDomain</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{organizationDomainEntity.id}</dd>
          <dt>
            <span id="domainAcronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationDomain.domainAcronym">Domain Acronym</Translate>
            </span>
          </dt>
          <dd>{organizationDomainEntity.domainAcronym}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationDomain.name">Name</Translate>
            </span>
          </dt>
          <dd>{organizationDomainEntity.name}</dd>
          <dt>
            <span id="isVerified">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationDomain.isVerified">Is Verified</Translate>
            </span>
          </dt>
          <dd>{organizationDomainEntity.isVerified ? 'true' : 'false'}</dd>
          <dt>
            <span id="businessHandlerClazz">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationDomain.businessHandlerClazz">
                Business Handler Clazz
              </Translate>
            </span>
          </dt>
          <dd>{organizationDomainEntity.businessHandlerClazz}</dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationDomain.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{organizationDomainEntity.activationStatus}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationDomain.organization">Organization</Translate>
          </dt>
          <dd>{organizationDomainEntity.organization ? organizationDomainEntity.organization.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/organization-domain" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/organization-domain/${organizationDomainEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrganizationDomainDetail;

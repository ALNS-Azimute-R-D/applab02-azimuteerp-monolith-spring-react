import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './organization.reducer';

export const OrganizationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const organizationEntity = useAppSelector(state => state.organization.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="organizationDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.detail.title">Organization</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.acronym}</dd>
          <dt>
            <span id="businessCode">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.businessCode">Business Code</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.businessCode}</dd>
          <dt>
            <span id="hierarchicalLevel">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.hierarchicalLevel">Hierarchical Level</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.hierarchicalLevel}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.name">Name</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.description">Description</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.description}</dd>
          <dt>
            <span id="businessHandlerClazz">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.businessHandlerClazz">
                Business Handler Clazz
              </Translate>
            </span>
          </dt>
          <dd>{organizationEntity.businessHandlerClazz}</dd>
          <dt>
            <span id="mainContactPersonDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.mainContactPersonDetailsJSON">
                Main Contact Person Details JSON
              </Translate>
            </span>
          </dt>
          <dd>{organizationEntity.mainContactPersonDetailsJSON}</dd>
          <dt>
            <span id="technicalEnvironmentsDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.technicalEnvironmentsDetailsJSON">
                Technical Environments Details JSON
              </Translate>
            </span>
          </dt>
          <dd>{organizationEntity.technicalEnvironmentsDetailsJSON}</dd>
          <dt>
            <span id="customAttributesDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.customAttributesDetailsJSON">
                Custom Attributes Details JSON
              </Translate>
            </span>
          </dt>
          <dd>{organizationEntity.customAttributesDetailsJSON}</dd>
          <dt>
            <span id="organizationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.organizationStatus">Organization Status</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.organizationStatus}</dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.activationStatus}</dd>
          <dt>
            <span id="logoImg">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.logoImg">Logo Img</Translate>
            </span>
          </dt>
          <dd>
            {organizationEntity.logoImg ? (
              <div>
                {organizationEntity.logoImgContentType ? (
                  <a onClick={openFile(organizationEntity.logoImgContentType, organizationEntity.logoImg)}>
                    <img
                      src={`data:${organizationEntity.logoImgContentType};base64,${organizationEntity.logoImg}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {organizationEntity.logoImgContentType}, {byteSize(organizationEntity.logoImg)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.tenant">Tenant</Translate>
          </dt>
          <dd>{organizationEntity.tenant ? organizationEntity.tenant.name : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.typeOfOrganization">Type Of Organization</Translate>
          </dt>
          <dd>{organizationEntity.typeOfOrganization ? organizationEntity.typeOfOrganization.name : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.organizationParent">Organization Parent</Translate>
          </dt>
          <dd>{organizationEntity.organizationParent ? organizationEntity.organizationParent.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/organization" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/organization/${organizationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrganizationDetail;

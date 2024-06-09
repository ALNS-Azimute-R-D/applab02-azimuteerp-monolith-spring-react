import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './tenant.reducer';

export const TenantDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const tenantEntity = useAppSelector(state => state.tenant.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="tenantDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.detail.title">Tenant</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{tenantEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{tenantEntity.acronym}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.name">Name</Translate>
            </span>
          </dt>
          <dd>{tenantEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.description">Description</Translate>
            </span>
          </dt>
          <dd>{tenantEntity.description}</dd>
          <dt>
            <span id="customerBusinessCode">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.customerBusinessCode">Customer Business Code</Translate>
            </span>
          </dt>
          <dd>{tenantEntity.customerBusinessCode}</dd>
          <dt>
            <span id="businessHandlerClazz">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.businessHandlerClazz">Business Handler Clazz</Translate>
            </span>
          </dt>
          <dd>{tenantEntity.businessHandlerClazz}</dd>
          <dt>
            <span id="mainContactPersonDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.mainContactPersonDetailsJSON">
                Main Contact Person Details JSON
              </Translate>
            </span>
          </dt>
          <dd>{tenantEntity.mainContactPersonDetailsJSON}</dd>
          <dt>
            <span id="billingDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.billingDetailsJSON">Billing Details JSON</Translate>
            </span>
          </dt>
          <dd>{tenantEntity.billingDetailsJSON}</dd>
          <dt>
            <span id="technicalEnvironmentsDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.technicalEnvironmentsDetailsJSON">
                Technical Environments Details JSON
              </Translate>
            </span>
          </dt>
          <dd>{tenantEntity.technicalEnvironmentsDetailsJSON}</dd>
          <dt>
            <span id="customAttributesDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.customAttributesDetailsJSON">
                Custom Attributes Details JSON
              </Translate>
            </span>
          </dt>
          <dd>{tenantEntity.customAttributesDetailsJSON}</dd>
          <dt>
            <span id="logoImg">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.logoImg">Logo Img</Translate>
            </span>
          </dt>
          <dd>
            {tenantEntity.logoImg ? (
              <div>
                {tenantEntity.logoImgContentType ? (
                  <a onClick={openFile(tenantEntity.logoImgContentType, tenantEntity.logoImg)}>
                    <img src={`data:${tenantEntity.logoImgContentType};base64,${tenantEntity.logoImg}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {tenantEntity.logoImgContentType}, {byteSize(tenantEntity.logoImg)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.tenant.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{tenantEntity.activationStatus}</dd>
        </dl>
        <Button tag={Link} to="/tenant" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tenant/${tenantEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TenantDetail;

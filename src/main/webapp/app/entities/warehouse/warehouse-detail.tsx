import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './warehouse.reducer';

export const WarehouseDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const warehouseEntity = useAppSelector(state => state.warehouse.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="warehouseDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.detail.title">Warehouse</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{warehouseEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{warehouseEntity.acronym}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.name">Name</Translate>
            </span>
          </dt>
          <dd>{warehouseEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.description">Description</Translate>
            </span>
          </dt>
          <dd>{warehouseEntity.description}</dd>
          <dt>
            <span id="streetAddress">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.streetAddress">Street Address</Translate>
            </span>
          </dt>
          <dd>{warehouseEntity.streetAddress}</dd>
          <dt>
            <span id="houseNumber">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.houseNumber">House Number</Translate>
            </span>
          </dt>
          <dd>{warehouseEntity.houseNumber}</dd>
          <dt>
            <span id="locationName">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.locationName">Location Name</Translate>
            </span>
          </dt>
          <dd>{warehouseEntity.locationName}</dd>
          <dt>
            <span id="postalCode">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.postalCode">Postal Code</Translate>
            </span>
          </dt>
          <dd>{warehouseEntity.postalCode}</dd>
          <dt>
            <span id="pointLocation">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.pointLocation">Point Location</Translate>
            </span>
          </dt>
          <dd>
            {warehouseEntity.pointLocation ? (
              <div>
                {warehouseEntity.pointLocationContentType ? (
                  <a onClick={openFile(warehouseEntity.pointLocationContentType, warehouseEntity.pointLocation)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {warehouseEntity.pointLocationContentType}, {byteSize(warehouseEntity.pointLocation)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="mainEmail">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.mainEmail">Main Email</Translate>
            </span>
          </dt>
          <dd>{warehouseEntity.mainEmail}</dd>
          <dt>
            <span id="landPhoneNumber">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.landPhoneNumber">Land Phone Number</Translate>
            </span>
          </dt>
          <dd>{warehouseEntity.landPhoneNumber}</dd>
          <dt>
            <span id="mobilePhoneNumber">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.mobilePhoneNumber">Mobile Phone Number</Translate>
            </span>
          </dt>
          <dd>{warehouseEntity.mobilePhoneNumber}</dd>
          <dt>
            <span id="faxNumber">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.faxNumber">Fax Number</Translate>
            </span>
          </dt>
          <dd>{warehouseEntity.faxNumber}</dd>
          <dt>
            <span id="customAttributesDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.customAttributesDetailsJSON">
                Custom Attributes Details JSON
              </Translate>
            </span>
          </dt>
          <dd>{warehouseEntity.customAttributesDetailsJSON}</dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.warehouse.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{warehouseEntity.activationStatus}</dd>
        </dl>
        <Button tag={Link} to="/warehouse" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/warehouse/${warehouseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default WarehouseDetail;

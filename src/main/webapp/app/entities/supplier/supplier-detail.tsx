import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './supplier.reducer';

export const SupplierDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const supplierEntity = useAppSelector(state => state.supplier.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="supplierDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.detail.title">Supplier</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.acronym}</dd>
          <dt>
            <span id="companyName">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.companyName">Company Name</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.companyName}</dd>
          <dt>
            <span id="streetAddress">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.streetAddress">Street Address</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.streetAddress}</dd>
          <dt>
            <span id="houseNumber">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.houseNumber">House Number</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.houseNumber}</dd>
          <dt>
            <span id="locationName">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.locationName">Location Name</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.locationName}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.city">City</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.city}</dd>
          <dt>
            <span id="stateProvince">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.stateProvince">State Province</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.stateProvince}</dd>
          <dt>
            <span id="zipPostalCode">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.zipPostalCode">Zip Postal Code</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.zipPostalCode}</dd>
          <dt>
            <span id="countryRegion">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.countryRegion">Country Region</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.countryRegion}</dd>
          <dt>
            <span id="pointLocation">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.pointLocation">Point Location</Translate>
            </span>
          </dt>
          <dd>
            {supplierEntity.pointLocation ? (
              <div>
                {supplierEntity.pointLocationContentType ? (
                  <a onClick={openFile(supplierEntity.pointLocationContentType, supplierEntity.pointLocation)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {supplierEntity.pointLocationContentType}, {byteSize(supplierEntity.pointLocation)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="mainEmail">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.mainEmail">Main Email</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.mainEmail}</dd>
          <dt>
            <span id="phoneNumber1">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.phoneNumber1">Phone Number 1</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.phoneNumber1}</dd>
          <dt>
            <span id="phoneNumber2">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.phoneNumber2">Phone Number 2</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.phoneNumber2}</dd>
          <dt>
            <span id="customAttributesDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.customAttributesDetailsJSON">
                Custom Attributes Details JSON
              </Translate>
            </span>
          </dt>
          <dd>{supplierEntity.customAttributesDetailsJSON}</dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.activationStatus}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.representativePerson">Representative Person</Translate>
          </dt>
          <dd>{supplierEntity.representativePerson ? supplierEntity.representativePerson.lastname : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.supplier.toProduct">To Product</Translate>
          </dt>
          <dd>
            {supplierEntity.toProducts
              ? supplierEntity.toProducts.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {supplierEntity.toProducts && i === supplierEntity.toProducts.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/supplier" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/supplier/${supplierEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SupplierDetail;

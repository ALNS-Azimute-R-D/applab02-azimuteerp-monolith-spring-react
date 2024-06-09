import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './common-locality.reducer';

export const CommonLocalityDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const commonLocalityEntity = useAppSelector(state => state.commonLocality.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="commonLocalityDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.detail.title">CommonLocality</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{commonLocalityEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{commonLocalityEntity.acronym}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.name">Name</Translate>
            </span>
          </dt>
          <dd>{commonLocalityEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.description">Description</Translate>
            </span>
          </dt>
          <dd>{commonLocalityEntity.description}</dd>
          <dt>
            <span id="streetAddress">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.streetAddress">Street Address</Translate>
            </span>
          </dt>
          <dd>{commonLocalityEntity.streetAddress}</dd>
          <dt>
            <span id="houseNumber">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.houseNumber">House Number</Translate>
            </span>
          </dt>
          <dd>{commonLocalityEntity.houseNumber}</dd>
          <dt>
            <span id="locationName">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.locationName">Location Name</Translate>
            </span>
          </dt>
          <dd>{commonLocalityEntity.locationName}</dd>
          <dt>
            <span id="postalCode">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.postalCode">Postal Code</Translate>
            </span>
          </dt>
          <dd>{commonLocalityEntity.postalCode}</dd>
          <dt>
            <span id="geoPolygonArea">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.geoPolygonArea">Geo Polygon Area</Translate>
            </span>
          </dt>
          <dd>
            {commonLocalityEntity.geoPolygonArea ? (
              <div>
                {commonLocalityEntity.geoPolygonAreaContentType ? (
                  <a onClick={openFile(commonLocalityEntity.geoPolygonAreaContentType, commonLocalityEntity.geoPolygonArea)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {commonLocalityEntity.geoPolygonAreaContentType}, {byteSize(commonLocalityEntity.geoPolygonArea)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.district">District</Translate>
          </dt>
          <dd>{commonLocalityEntity.district ? commonLocalityEntity.district.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/common-locality" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/common-locality/${commonLocalityEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CommonLocalityDetail;

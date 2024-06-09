import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './town-city.reducer';

export const TownCityDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const townCityEntity = useAppSelector(state => state.townCity.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="townCityDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.townCity.detail.title">TownCity</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{townCityEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.townCity.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{townCityEntity.acronym}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.townCity.name">Name</Translate>
            </span>
          </dt>
          <dd>{townCityEntity.name}</dd>
          <dt>
            <span id="geoPolygonArea">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.townCity.geoPolygonArea">Geo Polygon Area</Translate>
            </span>
          </dt>
          <dd>
            {townCityEntity.geoPolygonArea ? (
              <div>
                {townCityEntity.geoPolygonAreaContentType ? (
                  <a onClick={openFile(townCityEntity.geoPolygonAreaContentType, townCityEntity.geoPolygonArea)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {townCityEntity.geoPolygonAreaContentType}, {byteSize(townCityEntity.geoPolygonArea)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.townCity.province">Province</Translate>
          </dt>
          <dd>{townCityEntity.province ? townCityEntity.province.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/town-city" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/town-city/${townCityEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TownCityDetail;

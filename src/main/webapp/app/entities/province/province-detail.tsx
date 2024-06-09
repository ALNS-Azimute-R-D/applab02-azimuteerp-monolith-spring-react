import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './province.reducer';

export const ProvinceDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const provinceEntity = useAppSelector(state => state.province.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="provinceDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.province.detail.title">Province</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{provinceEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.province.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{provinceEntity.acronym}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.province.name">Name</Translate>
            </span>
          </dt>
          <dd>{provinceEntity.name}</dd>
          <dt>
            <span id="geoPolygonArea">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.province.geoPolygonArea">Geo Polygon Area</Translate>
            </span>
          </dt>
          <dd>
            {provinceEntity.geoPolygonArea ? (
              <div>
                {provinceEntity.geoPolygonAreaContentType ? (
                  <a onClick={openFile(provinceEntity.geoPolygonAreaContentType, provinceEntity.geoPolygonArea)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {provinceEntity.geoPolygonAreaContentType}, {byteSize(provinceEntity.geoPolygonArea)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.province.country">Country</Translate>
          </dt>
          <dd>{provinceEntity.country ? provinceEntity.country.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/province" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/province/${provinceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProvinceDetail;

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './brand.reducer';

export const BrandDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const brandEntity = useAppSelector(state => state.brand.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="brandDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.brand.detail.title">Brand</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{brandEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.brand.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{brandEntity.acronym}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.brand.name">Name</Translate>
            </span>
          </dt>
          <dd>{brandEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.brand.description">Description</Translate>
            </span>
          </dt>
          <dd>{brandEntity.description}</dd>
          <dt>
            <span id="logoBrand">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.brand.logoBrand">Logo Brand</Translate>
            </span>
          </dt>
          <dd>
            {brandEntity.logoBrand ? (
              <div>
                {brandEntity.logoBrandContentType ? (
                  <a onClick={openFile(brandEntity.logoBrandContentType, brandEntity.logoBrand)}>
                    <img src={`data:${brandEntity.logoBrandContentType};base64,${brandEntity.logoBrand}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {brandEntity.logoBrandContentType}, {byteSize(brandEntity.logoBrand)}
                </span>
              </div>
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/brand" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/brand/${brandEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BrandDetail;

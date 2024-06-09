import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './asset-type.reducer';

export const AssetTypeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const assetTypeEntity = useAppSelector(state => state.assetType.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="assetTypeDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.assetType.detail.title">AssetType</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{assetTypeEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.assetType.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{assetTypeEntity.acronym}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.assetType.name">Name</Translate>
            </span>
          </dt>
          <dd>{assetTypeEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.assetType.description">Description</Translate>
            </span>
          </dt>
          <dd>{assetTypeEntity.description}</dd>
          <dt>
            <span id="handlerClazzName">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.assetType.handlerClazzName">Handler Clazz Name</Translate>
            </span>
          </dt>
          <dd>{assetTypeEntity.handlerClazzName}</dd>
          <dt>
            <span id="customAttributesDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.assetType.customAttributesDetailsJSON">
                Custom Attributes Details JSON
              </Translate>
            </span>
          </dt>
          <dd>{assetTypeEntity.customAttributesDetailsJSON}</dd>
        </dl>
        <Button tag={Link} to="/asset-type" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/asset-type/${assetTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AssetTypeDetail;

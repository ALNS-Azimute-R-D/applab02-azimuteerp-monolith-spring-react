import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './asset-metadata.reducer';

export const AssetMetadataDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const assetMetadataEntity = useAppSelector(state => state.assetMetadata.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="assetMetadataDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.assetMetadata.detail.title">AssetMetadata</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{assetMetadataEntity.id}</dd>
          <dt>
            <span id="metadataDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.assetMetadata.metadataDetailsJSON">Metadata Details JSON</Translate>
            </span>
          </dt>
          <dd>{assetMetadataEntity.metadataDetailsJSON}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.assetMetadata.asset">Asset</Translate>
          </dt>
          <dd>{assetMetadataEntity.asset ? assetMetadataEntity.asset.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/asset-metadata" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/asset-metadata/${assetMetadataEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AssetMetadataDetail;

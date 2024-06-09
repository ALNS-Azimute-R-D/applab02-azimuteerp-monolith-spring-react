import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './asset-collection.reducer';

export const AssetCollectionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const assetCollectionEntity = useAppSelector(state => state.assetCollection.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="assetCollectionDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.assetCollection.detail.title">AssetCollection</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{assetCollectionEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.assetCollection.name">Name</Translate>
            </span>
          </dt>
          <dd>{assetCollectionEntity.name}</dd>
          <dt>
            <span id="fullFilenamePath">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.assetCollection.fullFilenamePath">Full Filename Path</Translate>
            </span>
          </dt>
          <dd>{assetCollectionEntity.fullFilenamePath}</dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.assetCollection.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{assetCollectionEntity.activationStatus}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.assetCollection.asset">Asset</Translate>
          </dt>
          <dd>
            {assetCollectionEntity.assets
              ? assetCollectionEntity.assets.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {assetCollectionEntity.assets && i === assetCollectionEntity.assets.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.assetCollection.article">Article</Translate>
          </dt>
          <dd>
            {assetCollectionEntity.articles
              ? assetCollectionEntity.articles.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {assetCollectionEntity.articles && i === assetCollectionEntity.articles.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/asset-collection" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/asset-collection/${assetCollectionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AssetCollectionDetail;

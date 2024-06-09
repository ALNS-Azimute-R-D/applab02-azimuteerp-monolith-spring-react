import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './article.reducer';

export const ArticleDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const articleEntity = useAppSelector(state => state.article.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="articleDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.article.detail.title">Article</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{articleEntity.id}</dd>
          <dt>
            <span id="inventoryProductId">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.article.inventoryProductId">Inventory Product Id</Translate>
            </span>
          </dt>
          <dd>{articleEntity.inventoryProductId}</dd>
          <dt>
            <span id="skuCode">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.article.skuCode">Sku Code</Translate>
            </span>
          </dt>
          <dd>{articleEntity.skuCode}</dd>
          <dt>
            <span id="customName">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.article.customName">Custom Name</Translate>
            </span>
          </dt>
          <dd>{articleEntity.customName}</dd>
          <dt>
            <span id="customDescription">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.article.customDescription">Custom Description</Translate>
            </span>
          </dt>
          <dd>{articleEntity.customDescription}</dd>
          <dt>
            <span id="priceValue">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.article.priceValue">Price Value</Translate>
            </span>
          </dt>
          <dd>{articleEntity.priceValue}</dd>
          <dt>
            <span id="itemSize">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.article.itemSize">Item Size</Translate>
            </span>
          </dt>
          <dd>{articleEntity.itemSize}</dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.article.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{articleEntity.activationStatus}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.article.assetCollection">Asset Collection</Translate>
          </dt>
          <dd>
            {articleEntity.assetCollections
              ? articleEntity.assetCollections.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {articleEntity.assetCollections && i === articleEntity.assetCollections.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.article.mainCategory">Main Category</Translate>
          </dt>
          <dd>{articleEntity.mainCategory ? articleEntity.mainCategory.acronym : ''}</dd>
        </dl>
        <Button tag={Link} to="/article" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/article/${articleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ArticleDetail;

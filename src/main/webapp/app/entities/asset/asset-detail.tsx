import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './asset.reducer';

export const AssetDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const assetEntity = useAppSelector(state => state.asset.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="assetDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.detail.title">Asset</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{assetEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.name">Name</Translate>
            </span>
          </dt>
          <dd>{assetEntity.name}</dd>
          <dt>
            <span id="storageTypeUsed">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.storageTypeUsed">Storage Type Used</Translate>
            </span>
          </dt>
          <dd>{assetEntity.storageTypeUsed}</dd>
          <dt>
            <span id="fullFilenamePath">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.fullFilenamePath">Full Filename Path</Translate>
            </span>
          </dt>
          <dd>{assetEntity.fullFilenamePath}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.status">Status</Translate>
            </span>
          </dt>
          <dd>{assetEntity.status}</dd>
          <dt>
            <span id="preferredPurpose">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.preferredPurpose">Preferred Purpose</Translate>
            </span>
          </dt>
          <dd>{assetEntity.preferredPurpose}</dd>
          <dt>
            <span id="assetContentAsBlob">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.assetContentAsBlob">Asset Content As Blob</Translate>
            </span>
          </dt>
          <dd>
            {assetEntity.assetContentAsBlob ? (
              <div>
                {assetEntity.assetContentAsBlobContentType ? (
                  <a onClick={openFile(assetEntity.assetContentAsBlobContentType, assetEntity.assetContentAsBlob)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {assetEntity.assetContentAsBlobContentType}, {byteSize(assetEntity.assetContentAsBlob)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{assetEntity.activationStatus}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.assetType">Asset Type</Translate>
          </dt>
          <dd>{assetEntity.assetType ? assetEntity.assetType.name : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.rawAssetProcTmp">Raw Asset Proc Tmp</Translate>
          </dt>
          <dd>{assetEntity.rawAssetProcTmp ? assetEntity.rawAssetProcTmp.name : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.assetCollection">Asset Collection</Translate>
          </dt>
          <dd>
            {assetEntity.assetCollections
              ? assetEntity.assetCollections.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {assetEntity.assetCollections && i === assetEntity.assetCollections.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/asset" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/asset/${assetEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AssetDetail;

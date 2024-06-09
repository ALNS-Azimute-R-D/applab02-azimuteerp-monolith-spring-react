import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './raw-asset-proc-tmp.reducer';

export const RawAssetProcTmpDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const rawAssetProcTmpEntity = useAppSelector(state => state.rawAssetProcTmp.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="rawAssetProcTmpDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.detail.title">RawAssetProcTmp</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{rawAssetProcTmpEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.name">Name</Translate>
            </span>
          </dt>
          <dd>{rawAssetProcTmpEntity.name}</dd>
          <dt>
            <span id="statusRawProcessing">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.statusRawProcessing">
                Status Raw Processing
              </Translate>
            </span>
          </dt>
          <dd>{rawAssetProcTmpEntity.statusRawProcessing}</dd>
          <dt>
            <span id="fullFilenamePath">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.fullFilenamePath">Full Filename Path</Translate>
            </span>
          </dt>
          <dd>{rawAssetProcTmpEntity.fullFilenamePath}</dd>
          <dt>
            <span id="assetRawContentAsBlob">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.assetRawContentAsBlob">
                Asset Raw Content As Blob
              </Translate>
            </span>
          </dt>
          <dd>
            {rawAssetProcTmpEntity.assetRawContentAsBlob ? (
              <div>
                {rawAssetProcTmpEntity.assetRawContentAsBlobContentType ? (
                  <a
                    onClick={openFile(rawAssetProcTmpEntity.assetRawContentAsBlobContentType, rawAssetProcTmpEntity.assetRawContentAsBlob)}
                  >
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {rawAssetProcTmpEntity.assetRawContentAsBlobContentType}, {byteSize(rawAssetProcTmpEntity.assetRawContentAsBlob)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="customAttributesDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.customAttributesDetailsJSON">
                Custom Attributes Details JSON
              </Translate>
            </span>
          </dt>
          <dd>{rawAssetProcTmpEntity.customAttributesDetailsJSON}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.assetType">Asset Type</Translate>
          </dt>
          <dd>{rawAssetProcTmpEntity.assetType ? rawAssetProcTmpEntity.assetType.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/raw-asset-proc-tmp" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/raw-asset-proc-tmp/${rawAssetProcTmpEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default RawAssetProcTmpDetail;

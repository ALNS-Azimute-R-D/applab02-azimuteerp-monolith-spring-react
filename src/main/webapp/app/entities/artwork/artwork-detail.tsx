import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './artwork.reducer';

export const ArtworkDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const artworkEntity = useAppSelector(state => state.artwork.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="artworkDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.detail.title">Artwork</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{artworkEntity.id}</dd>
          <dt>
            <span id="artworkTitle">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.artworkTitle">Artwork Title</Translate>
            </span>
          </dt>
          <dd>{artworkEntity.artworkTitle}</dd>
          <dt>
            <span id="productionYear">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.productionYear">Production Year</Translate>
            </span>
          </dt>
          <dd>{artworkEntity.productionYear}</dd>
          <dt>
            <span id="seasonNumber">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.seasonNumber">Season Number</Translate>
            </span>
          </dt>
          <dd>{artworkEntity.seasonNumber}</dd>
          <dt>
            <span id="episodeOrSequenceNumber">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.episodeOrSequenceNumber">
                Episode Or Sequence Number
              </Translate>
            </span>
          </dt>
          <dd>{artworkEntity.episodeOrSequenceNumber}</dd>
          <dt>
            <span id="registerIdInIMDB">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.registerIdInIMDB">Register Id In IMDB</Translate>
            </span>
          </dt>
          <dd>{artworkEntity.registerIdInIMDB}</dd>
          <dt>
            <span id="assetsCollectionUUID">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.assetsCollectionUUID">Assets Collection UUID</Translate>
            </span>
          </dt>
          <dd>{artworkEntity.assetsCollectionUUID}</dd>
          <dt>
            <span id="contentDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.contentDetailsJSON">Content Details JSON</Translate>
            </span>
          </dt>
          <dd>{artworkEntity.contentDetailsJSON}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.typeOfArtmedia">Type Of Artmedia</Translate>
          </dt>
          <dd>{artworkEntity.typeOfArtmedia ? artworkEntity.typeOfArtmedia.acronym : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.artworkAggregator">Artwork Aggregator</Translate>
          </dt>
          <dd>{artworkEntity.artworkAggregator ? artworkEntity.artworkAggregator.artworkTitle : ''}</dd>
        </dl>
        <Button tag={Link} to="/artwork" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/artwork/${artworkEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ArtworkDetail;

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './artwork-cast.reducer';

export const ArtworkCastDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const artworkCastEntity = useAppSelector(state => state.artworkCast.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="artworkCastDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.detail.title">ArtworkCast</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{artworkCastEntity.id}</dd>
          <dt>
            <span id="orderOfAppearance">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.orderOfAppearance">Order Of Appearance</Translate>
            </span>
          </dt>
          <dd>{artworkCastEntity.orderOfAppearance}</dd>
          <dt>
            <span id="characterName">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.characterName">Character Name</Translate>
            </span>
          </dt>
          <dd>{artworkCastEntity.characterName}</dd>
          <dt>
            <span id="mainAssetUUID">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.mainAssetUUID">Main Asset UUID</Translate>
            </span>
          </dt>
          <dd>{artworkCastEntity.mainAssetUUID}</dd>
          <dt>
            <span id="characterDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.characterDetailsJSON">Character Details JSON</Translate>
            </span>
          </dt>
          <dd>{artworkCastEntity.characterDetailsJSON}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.artwork">Artwork</Translate>
          </dt>
          <dd>{artworkCastEntity.artwork ? artworkCastEntity.artwork.artworkTitle : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.artist">Artist</Translate>
          </dt>
          <dd>{artworkCastEntity.artist ? artworkCastEntity.artist.publicName : ''}</dd>
        </dl>
        <Button tag={Link} to="/artwork-cast" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/artwork-cast/${artworkCastEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ArtworkCastDetail;

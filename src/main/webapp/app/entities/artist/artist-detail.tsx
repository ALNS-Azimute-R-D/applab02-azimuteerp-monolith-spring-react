import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './artist.reducer';

export const ArtistDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const artistEntity = useAppSelector(state => state.artist.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="artistDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.detail.title">Artist</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{artistEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{artistEntity.acronym}</dd>
          <dt>
            <span id="publicName">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.publicName">Public Name</Translate>
            </span>
          </dt>
          <dd>{artistEntity.publicName}</dd>
          <dt>
            <span id="realName">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.realName">Real Name</Translate>
            </span>
          </dt>
          <dd>{artistEntity.realName}</dd>
          <dt>
            <span id="biographyDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.biographyDetailsJSON">Biography Details JSON</Translate>
            </span>
          </dt>
          <dd>{artistEntity.biographyDetailsJSON}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.typeOfArtmedia">Type Of Artmedia</Translate>
          </dt>
          <dd>{artistEntity.typeOfArtmedia ? artistEntity.typeOfArtmedia.acronym : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.typeOfArtist">Type Of Artist</Translate>
          </dt>
          <dd>{artistEntity.typeOfArtist ? artistEntity.typeOfArtist.acronym : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.artistAggregator">Artist Aggregator</Translate>
          </dt>
          <dd>{artistEntity.artistAggregator ? artistEntity.artistAggregator.acronym : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.artist">Artist</Translate>
          </dt>
          <dd>
            {artistEntity.artists
              ? artistEntity.artists.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {artistEntity.artists && i === artistEntity.artists.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/artist" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/artist/${artistEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ArtistDetail;

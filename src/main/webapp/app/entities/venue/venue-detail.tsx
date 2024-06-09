import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './venue.reducer';

export const VenueDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const venueEntity = useAppSelector(state => state.venue.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="venueDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.venue.detail.title">Venue</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{venueEntity.id}</dd>
          <dt>
            <span id="acronym">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.venue.acronym">Acronym</Translate>
            </span>
          </dt>
          <dd>{venueEntity.acronym}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.venue.name">Name</Translate>
            </span>
          </dt>
          <dd>{venueEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.venue.description">Description</Translate>
            </span>
          </dt>
          <dd>{venueEntity.description}</dd>
          <dt>
            <span id="geoPointLocation">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.venue.geoPointLocation">Geo Point Location</Translate>
            </span>
          </dt>
          <dd>
            {venueEntity.geoPointLocation ? (
              <div>
                {venueEntity.geoPointLocationContentType ? (
                  <a onClick={openFile(venueEntity.geoPointLocationContentType, venueEntity.geoPointLocation)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {venueEntity.geoPointLocationContentType}, {byteSize(venueEntity.geoPointLocation)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.venue.typeOfVenue">Type Of Venue</Translate>
          </dt>
          <dd>{venueEntity.typeOfVenue ? venueEntity.typeOfVenue.acronym : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.venue.commonLocality">Common Locality</Translate>
          </dt>
          <dd>{venueEntity.commonLocality ? venueEntity.commonLocality.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/venue" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/venue/${venueEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default VenueDetail;

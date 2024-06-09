import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITypeOfArtmedia } from 'app/shared/model/type-of-artmedia.model';
import { getEntities as getTypeOfArtmedias } from 'app/entities/type-of-artmedia/type-of-artmedia.reducer';
import { ITypeOfArtist } from 'app/shared/model/type-of-artist.model';
import { getEntities as getTypeOfArtists } from 'app/entities/type-of-artist/type-of-artist.reducer';
import { getEntities as getArtists } from 'app/entities/artist/artist.reducer';
import { IArtisticGenre } from 'app/shared/model/artistic-genre.model';
import { getEntities as getArtisticGenres } from 'app/entities/artistic-genre/artistic-genre.reducer';
import { IArtist } from 'app/shared/model/artist.model';
import { getEntity, updateEntity, createEntity, reset } from './artist.reducer';

export const ArtistUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const typeOfArtmedias = useAppSelector(state => state.typeOfArtmedia.entities);
  const typeOfArtists = useAppSelector(state => state.typeOfArtist.entities);
  const artists = useAppSelector(state => state.artist.entities);
  const artisticGenres = useAppSelector(state => state.artisticGenre.entities);
  const artistEntity = useAppSelector(state => state.artist.entity);
  const loading = useAppSelector(state => state.artist.loading);
  const updating = useAppSelector(state => state.artist.updating);
  const updateSuccess = useAppSelector(state => state.artist.updateSuccess);

  const handleClose = () => {
    navigate('/artist' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTypeOfArtmedias({}));
    dispatch(getTypeOfArtists({}));
    dispatch(getArtists({}));
    dispatch(getArtisticGenres({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }

    const entity = {
      ...artistEntity,
      ...values,
      typeOfArtmedia: typeOfArtmedias.find(it => it.id.toString() === values.typeOfArtmedia?.toString()),
      typeOfArtist: typeOfArtists.find(it => it.id.toString() === values.typeOfArtist?.toString()),
      artistAggregator: artists.find(it => it.id.toString() === values.artistAggregator?.toString()),
      artists: mapIdList(values.artists),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...artistEntity,
          typeOfArtmedia: artistEntity?.typeOfArtmedia?.id,
          typeOfArtist: artistEntity?.typeOfArtist?.id,
          artistAggregator: artistEntity?.artistAggregator?.id,
          artists: artistEntity?.artists?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.artist.home.createOrEditLabel" data-cy="ArtistCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.artist.home.createOrEditLabel">Create or edit a Artist</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="artist-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.artist.acronym')}
                id="artist-acronym"
                name="acronym"
                data-cy="acronym"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.artist.publicName')}
                id="artist-publicName"
                name="publicName"
                data-cy="publicName"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 2, message: translate('entity.validation.minlength', { min: 2 }) },
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.artist.realName')}
                id="artist-realName"
                name="realName"
                data-cy="realName"
                type="text"
                validate={{
                  minLength: { value: 2, message: translate('entity.validation.minlength', { min: 2 }) },
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.artist.biographyDetailsJSON')}
                id="artist-biographyDetailsJSON"
                name="biographyDetailsJSON"
                data-cy="biographyDetailsJSON"
                type="text"
                validate={{
                  maxLength: { value: 2048, message: translate('entity.validation.maxlength', { max: 2048 }) },
                }}
              />
              <ValidatedField
                id="artist-typeOfArtmedia"
                name="typeOfArtmedia"
                data-cy="typeOfArtmedia"
                label={translate('azimuteErpSpringReactMonolith03App.artist.typeOfArtmedia')}
                type="select"
                required
              >
                <option value="" key="0" />
                {typeOfArtmedias
                  ? typeOfArtmedias.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.acronym}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="artist-typeOfArtist"
                name="typeOfArtist"
                data-cy="typeOfArtist"
                label={translate('azimuteErpSpringReactMonolith03App.artist.typeOfArtist')}
                type="select"
                required
              >
                <option value="" key="0" />
                {typeOfArtists
                  ? typeOfArtists.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.acronym}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="artist-artistAggregator"
                name="artistAggregator"
                data-cy="artistAggregator"
                label={translate('azimuteErpSpringReactMonolith03App.artist.artistAggregator')}
                type="select"
              >
                <option value="" key="0" />
                {artists
                  ? artists.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.acronym}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.artist.artist')}
                id="artist-artist"
                data-cy="artist"
                type="select"
                multiple
                name="artists"
              >
                <option value="" key="0" />
                {artisticGenres
                  ? artisticGenres.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/artist" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ArtistUpdate;

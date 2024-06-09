import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IArtwork } from 'app/shared/model/artwork.model';
import { getEntities as getArtworks } from 'app/entities/artwork/artwork.reducer';
import { IArtist } from 'app/shared/model/artist.model';
import { getEntities as getArtists } from 'app/entities/artist/artist.reducer';
import { IArtworkCast } from 'app/shared/model/artwork-cast.model';
import { getEntity, updateEntity, createEntity, reset } from './artwork-cast.reducer';

export const ArtworkCastUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const artworks = useAppSelector(state => state.artwork.entities);
  const artists = useAppSelector(state => state.artist.entities);
  const artworkCastEntity = useAppSelector(state => state.artworkCast.entity);
  const loading = useAppSelector(state => state.artworkCast.loading);
  const updating = useAppSelector(state => state.artworkCast.updating);
  const updateSuccess = useAppSelector(state => state.artworkCast.updateSuccess);

  const handleClose = () => {
    navigate('/artwork-cast' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getArtworks({}));
    dispatch(getArtists({}));
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
    if (values.orderOfAppearance !== undefined && typeof values.orderOfAppearance !== 'number') {
      values.orderOfAppearance = Number(values.orderOfAppearance);
    }

    const entity = {
      ...artworkCastEntity,
      ...values,
      artwork: artworks.find(it => it.id.toString() === values.artwork?.toString()),
      artist: artists.find(it => it.id.toString() === values.artist?.toString()),
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
          ...artworkCastEntity,
          artwork: artworkCastEntity?.artwork?.id,
          artist: artworkCastEntity?.artist?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.artworkCast.home.createOrEditLabel" data-cy="ArtworkCastCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.artworkCast.home.createOrEditLabel">
              Create or edit a ArtworkCast
            </Translate>
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
                  id="artwork-cast-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.artworkCast.orderOfAppearance')}
                id="artwork-cast-orderOfAppearance"
                name="orderOfAppearance"
                data-cy="orderOfAppearance"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.artworkCast.characterName')}
                id="artwork-cast-characterName"
                name="characterName"
                data-cy="characterName"
                type="text"
                validate={{
                  minLength: { value: 2, message: translate('entity.validation.minlength', { min: 2 }) },
                  maxLength: { value: 255, message: translate('entity.validation.maxlength', { max: 255 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.artworkCast.mainAssetUUID')}
                id="artwork-cast-mainAssetUUID"
                name="mainAssetUUID"
                data-cy="mainAssetUUID"
                type="text"
                validate={{
                  maxLength: { value: 255, message: translate('entity.validation.maxlength', { max: 255 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.artworkCast.characterDetailsJSON')}
                id="artwork-cast-characterDetailsJSON"
                name="characterDetailsJSON"
                data-cy="characterDetailsJSON"
                type="text"
                validate={{
                  maxLength: { value: 2048, message: translate('entity.validation.maxlength', { max: 2048 }) },
                }}
              />
              <ValidatedField
                id="artwork-cast-artwork"
                name="artwork"
                data-cy="artwork"
                label={translate('azimuteErpSpringReactMonolith03App.artworkCast.artwork')}
                type="select"
                required
              >
                <option value="" key="0" />
                {artworks
                  ? artworks.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.artworkTitle}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="artwork-cast-artist"
                name="artist"
                data-cy="artist"
                label={translate('azimuteErpSpringReactMonolith03App.artworkCast.artist')}
                type="select"
                required
              >
                <option value="" key="0" />
                {artists
                  ? artists.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.publicName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/artwork-cast" replace color="info">
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

export default ArtworkCastUpdate;

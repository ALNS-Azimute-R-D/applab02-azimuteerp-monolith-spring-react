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
import { getEntities as getArtworks } from 'app/entities/artwork/artwork.reducer';
import { IArtwork } from 'app/shared/model/artwork.model';
import { getEntity, updateEntity, createEntity, reset } from './artwork.reducer';

export const ArtworkUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const typeOfArtmedias = useAppSelector(state => state.typeOfArtmedia.entities);
  const artworks = useAppSelector(state => state.artwork.entities);
  const artworkEntity = useAppSelector(state => state.artwork.entity);
  const loading = useAppSelector(state => state.artwork.loading);
  const updating = useAppSelector(state => state.artwork.updating);
  const updateSuccess = useAppSelector(state => state.artwork.updateSuccess);

  const handleClose = () => {
    navigate('/artwork' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTypeOfArtmedias({}));
    dispatch(getArtworks({}));
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
    if (values.productionYear !== undefined && typeof values.productionYear !== 'number') {
      values.productionYear = Number(values.productionYear);
    }
    if (values.seasonNumber !== undefined && typeof values.seasonNumber !== 'number') {
      values.seasonNumber = Number(values.seasonNumber);
    }
    if (values.episodeOrSequenceNumber !== undefined && typeof values.episodeOrSequenceNumber !== 'number') {
      values.episodeOrSequenceNumber = Number(values.episodeOrSequenceNumber);
    }

    const entity = {
      ...artworkEntity,
      ...values,
      typeOfArtmedia: typeOfArtmedias.find(it => it.id.toString() === values.typeOfArtmedia?.toString()),
      artworkAggregator: artworks.find(it => it.id.toString() === values.artworkAggregator?.toString()),
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
          ...artworkEntity,
          typeOfArtmedia: artworkEntity?.typeOfArtmedia?.id,
          artworkAggregator: artworkEntity?.artworkAggregator?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.artwork.home.createOrEditLabel" data-cy="ArtworkCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.artwork.home.createOrEditLabel">Create or edit a Artwork</Translate>
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
                  id="artwork-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.artwork.artworkTitle')}
                id="artwork-artworkTitle"
                name="artworkTitle"
                data-cy="artworkTitle"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 2, message: translate('entity.validation.minlength', { min: 2 }) },
                  maxLength: { value: 255, message: translate('entity.validation.maxlength', { max: 255 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.artwork.productionYear')}
                id="artwork-productionYear"
                name="productionYear"
                data-cy="productionYear"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.artwork.seasonNumber')}
                id="artwork-seasonNumber"
                name="seasonNumber"
                data-cy="seasonNumber"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.artwork.episodeOrSequenceNumber')}
                id="artwork-episodeOrSequenceNumber"
                name="episodeOrSequenceNumber"
                data-cy="episodeOrSequenceNumber"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.artwork.registerIdInIMDB')}
                id="artwork-registerIdInIMDB"
                name="registerIdInIMDB"
                data-cy="registerIdInIMDB"
                type="text"
                validate={{
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.artwork.assetsCollectionUUID')}
                id="artwork-assetsCollectionUUID"
                name="assetsCollectionUUID"
                data-cy="assetsCollectionUUID"
                type="text"
                validate={{
                  maxLength: { value: 255, message: translate('entity.validation.maxlength', { max: 255 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.artwork.contentDetailsJSON')}
                id="artwork-contentDetailsJSON"
                name="contentDetailsJSON"
                data-cy="contentDetailsJSON"
                type="text"
                validate={{
                  maxLength: { value: 4096, message: translate('entity.validation.maxlength', { max: 4096 }) },
                }}
              />
              <ValidatedField
                id="artwork-typeOfArtmedia"
                name="typeOfArtmedia"
                data-cy="typeOfArtmedia"
                label={translate('azimuteErpSpringReactMonolith03App.artwork.typeOfArtmedia')}
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
                id="artwork-artworkAggregator"
                name="artworkAggregator"
                data-cy="artworkAggregator"
                label={translate('azimuteErpSpringReactMonolith03App.artwork.artworkAggregator')}
                type="select"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/artwork" replace color="info">
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

export default ArtworkUpdate;

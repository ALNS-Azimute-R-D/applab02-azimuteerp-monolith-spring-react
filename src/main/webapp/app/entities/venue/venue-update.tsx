import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITypeOfVenue } from 'app/shared/model/type-of-venue.model';
import { getEntities as getTypeOfVenues } from 'app/entities/type-of-venue/type-of-venue.reducer';
import { ICommonLocality } from 'app/shared/model/common-locality.model';
import { getEntities as getCommonLocalities } from 'app/entities/common-locality/common-locality.reducer';
import { IVenue } from 'app/shared/model/venue.model';
import { getEntity, updateEntity, createEntity, reset } from './venue.reducer';

export const VenueUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const typeOfVenues = useAppSelector(state => state.typeOfVenue.entities);
  const commonLocalities = useAppSelector(state => state.commonLocality.entities);
  const venueEntity = useAppSelector(state => state.venue.entity);
  const loading = useAppSelector(state => state.venue.loading);
  const updating = useAppSelector(state => state.venue.updating);
  const updateSuccess = useAppSelector(state => state.venue.updateSuccess);

  const handleClose = () => {
    navigate('/venue' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTypeOfVenues({}));
    dispatch(getCommonLocalities({}));
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
      ...venueEntity,
      ...values,
      typeOfVenue: typeOfVenues.find(it => it.id.toString() === values.typeOfVenue?.toString()),
      commonLocality: commonLocalities.find(it => it.id.toString() === values.commonLocality?.toString()),
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
          ...venueEntity,
          typeOfVenue: venueEntity?.typeOfVenue?.id,
          commonLocality: venueEntity?.commonLocality?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.venue.home.createOrEditLabel" data-cy="VenueCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.venue.home.createOrEditLabel">Create or edit a Venue</Translate>
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
                  id="venue-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.venue.acronym')}
                id="venue-acronym"
                name="acronym"
                data-cy="acronym"
                type="text"
                validate={{
                  maxLength: { value: 30, message: translate('entity.validation.maxlength', { max: 30 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.venue.name')}
                id="venue-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 100, message: translate('entity.validation.maxlength', { max: 100 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.venue.description')}
                id="venue-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  maxLength: { value: 255, message: translate('entity.validation.maxlength', { max: 255 }) },
                }}
              />
              <ValidatedBlobField
                label={translate('azimuteErpSpringReactMonolith03App.venue.geoPointLocation')}
                id="venue-geoPointLocation"
                name="geoPointLocation"
                data-cy="geoPointLocation"
                openActionLabel={translate('entity.action.open')}
              />
              <ValidatedField
                id="venue-typeOfVenue"
                name="typeOfVenue"
                data-cy="typeOfVenue"
                label={translate('azimuteErpSpringReactMonolith03App.venue.typeOfVenue')}
                type="select"
                required
              >
                <option value="" key="0" />
                {typeOfVenues
                  ? typeOfVenues.map(otherEntity => (
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
                id="venue-commonLocality"
                name="commonLocality"
                data-cy="commonLocality"
                label={translate('azimuteErpSpringReactMonolith03App.venue.commonLocality')}
                type="select"
              >
                <option value="" key="0" />
                {commonLocalities
                  ? commonLocalities.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/venue" replace color="info">
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

export default VenueUpdate;

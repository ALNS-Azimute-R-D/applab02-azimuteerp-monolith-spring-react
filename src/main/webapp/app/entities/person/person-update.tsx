import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITypeOfPerson } from 'app/shared/model/type-of-person.model';
import { getEntities as getTypeOfPeople } from 'app/entities/type-of-person/type-of-person.reducer';
import { IDistrict } from 'app/shared/model/district.model';
import { getEntities as getDistricts } from 'app/entities/district/district.reducer';
import { getEntities as getPeople } from 'app/entities/person/person.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { GenderEnum } from 'app/shared/model/enumerations/gender-enum.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';
import { getEntity, updateEntity, createEntity, reset } from './person.reducer';

export const PersonUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const typeOfPeople = useAppSelector(state => state.typeOfPerson.entities);
  const districts = useAppSelector(state => state.district.entities);
  const people = useAppSelector(state => state.person.entities);
  const personEntity = useAppSelector(state => state.person.entity);
  const loading = useAppSelector(state => state.person.loading);
  const updating = useAppSelector(state => state.person.updating);
  const updateSuccess = useAppSelector(state => state.person.updateSuccess);
  const genderEnumValues = Object.keys(GenderEnum);
  const activationStatusEnumValues = Object.keys(ActivationStatusEnum);

  const handleClose = () => {
    navigate('/person' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTypeOfPeople({}));
    dispatch(getDistricts({}));
    dispatch(getPeople({}));
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
      ...personEntity,
      ...values,
      typeOfPerson: typeOfPeople.find(it => it.id.toString() === values.typeOfPerson?.toString()),
      district: districts.find(it => it.id.toString() === values.district?.toString()),
      managerPerson: people.find(it => it.id.toString() === values.managerPerson?.toString()),
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
          gender: 'MALE',
          activationStatus: 'INACTIVE',
          ...personEntity,
          typeOfPerson: personEntity?.typeOfPerson?.id,
          district: personEntity?.district?.id,
          managerPerson: personEntity?.managerPerson?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.person.home.createOrEditLabel" data-cy="PersonCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.person.home.createOrEditLabel">Create or edit a Person</Translate>
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
                  id="person-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.firstname')}
                id="person-firstname"
                name="firstname"
                data-cy="firstname"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.lastname')}
                id="person-lastname"
                name="lastname"
                data-cy="lastname"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.fullname')}
                id="person-fullname"
                name="fullname"
                data-cy="fullname"
                type="text"
                validate={{
                  maxLength: { value: 100, message: translate('entity.validation.maxlength', { max: 100 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.birthDate')}
                id="person-birthDate"
                name="birthDate"
                data-cy="birthDate"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.gender')}
                id="person-gender"
                name="gender"
                data-cy="gender"
                type="select"
              >
                {genderEnumValues.map(genderEnum => (
                  <option value={genderEnum} key={genderEnum}>
                    {translate('azimuteErpSpringReactMonolith03App.GenderEnum.' + genderEnum)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.codeBI')}
                id="person-codeBI"
                name="codeBI"
                data-cy="codeBI"
                type="text"
                validate={{
                  maxLength: { value: 20, message: translate('entity.validation.maxlength', { max: 20 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.codeNIF')}
                id="person-codeNIF"
                name="codeNIF"
                data-cy="codeNIF"
                type="text"
                validate={{
                  maxLength: { value: 20, message: translate('entity.validation.maxlength', { max: 20 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.streetAddress')}
                id="person-streetAddress"
                name="streetAddress"
                data-cy="streetAddress"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.houseNumber')}
                id="person-houseNumber"
                name="houseNumber"
                data-cy="houseNumber"
                type="text"
                validate={{
                  maxLength: { value: 20, message: translate('entity.validation.maxlength', { max: 20 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.locationName')}
                id="person-locationName"
                name="locationName"
                data-cy="locationName"
                type="text"
                validate={{
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.postalCode')}
                id="person-postalCode"
                name="postalCode"
                data-cy="postalCode"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 9, message: translate('entity.validation.maxlength', { max: 9 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.mainEmail')}
                id="person-mainEmail"
                name="mainEmail"
                data-cy="mainEmail"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: translate('entity.validation.pattern', { pattern: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$' }),
                  },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.landPhoneNumber')}
                id="person-landPhoneNumber"
                name="landPhoneNumber"
                data-cy="landPhoneNumber"
                type="text"
                validate={{
                  maxLength: { value: 15, message: translate('entity.validation.maxlength', { max: 15 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.mobilePhoneNumber')}
                id="person-mobilePhoneNumber"
                name="mobilePhoneNumber"
                data-cy="mobilePhoneNumber"
                type="text"
                validate={{
                  maxLength: { value: 15, message: translate('entity.validation.maxlength', { max: 15 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.occupation')}
                id="person-occupation"
                name="occupation"
                data-cy="occupation"
                type="text"
                validate={{
                  maxLength: { value: 40, message: translate('entity.validation.maxlength', { max: 40 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.preferredLanguage')}
                id="person-preferredLanguage"
                name="preferredLanguage"
                data-cy="preferredLanguage"
                type="text"
                validate={{
                  maxLength: { value: 5, message: translate('entity.validation.maxlength', { max: 5 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.usernameInOAuth2')}
                id="person-usernameInOAuth2"
                name="usernameInOAuth2"
                data-cy="usernameInOAuth2"
                type="text"
                validate={{
                  maxLength: { value: 40, message: translate('entity.validation.maxlength', { max: 40 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.userIdInOAuth2')}
                id="person-userIdInOAuth2"
                name="userIdInOAuth2"
                data-cy="userIdInOAuth2"
                type="text"
                validate={{
                  maxLength: { value: 80, message: translate('entity.validation.maxlength', { max: 80 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.customAttributesDetailsJSON')}
                id="person-customAttributesDetailsJSON"
                name="customAttributesDetailsJSON"
                data-cy="customAttributesDetailsJSON"
                type="text"
                validate={{
                  maxLength: { value: 2048, message: translate('entity.validation.maxlength', { max: 2048 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.person.activationStatus')}
                id="person-activationStatus"
                name="activationStatus"
                data-cy="activationStatus"
                type="select"
              >
                {activationStatusEnumValues.map(activationStatusEnum => (
                  <option value={activationStatusEnum} key={activationStatusEnum}>
                    {translate('azimuteErpSpringReactMonolith03App.ActivationStatusEnum.' + activationStatusEnum)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedBlobField
                label={translate('azimuteErpSpringReactMonolith03App.person.avatarImg')}
                id="person-avatarImg"
                name="avatarImg"
                data-cy="avatarImg"
                isImage
                accept="image/*"
              />
              <ValidatedField
                id="person-typeOfPerson"
                name="typeOfPerson"
                data-cy="typeOfPerson"
                label={translate('azimuteErpSpringReactMonolith03App.person.typeOfPerson')}
                type="select"
                required
              >
                <option value="" key="0" />
                {typeOfPeople
                  ? typeOfPeople.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.code}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="person-district"
                name="district"
                data-cy="district"
                label={translate('azimuteErpSpringReactMonolith03App.person.district')}
                type="select"
              >
                <option value="" key="0" />
                {districts
                  ? districts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="person-managerPerson"
                name="managerPerson"
                data-cy="managerPerson"
                label={translate('azimuteErpSpringReactMonolith03App.person.managerPerson')}
                type="select"
              >
                <option value="" key="0" />
                {people
                  ? people.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.lastname}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/person" replace color="info">
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

export default PersonUpdate;

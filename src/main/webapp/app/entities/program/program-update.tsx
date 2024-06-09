import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProgram } from 'app/shared/model/program.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';
import { getEntity, updateEntity, createEntity, reset } from './program.reducer';

export const ProgramUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const programEntity = useAppSelector(state => state.program.entity);
  const loading = useAppSelector(state => state.program.loading);
  const updating = useAppSelector(state => state.program.updating);
  const updateSuccess = useAppSelector(state => state.program.updateSuccess);
  const activationStatusEnumValues = Object.keys(ActivationStatusEnum);

  const handleClose = () => {
    navigate('/program' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
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
      ...programEntity,
      ...values,
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
          activationStatus: 'INACTIVE',
          ...programEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.program.home.createOrEditLabel" data-cy="ProgramCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.program.home.createOrEditLabel">Create or edit a Program</Translate>
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
                  id="program-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.program.acronym')}
                id="program-acronym"
                name="acronym"
                data-cy="acronym"
                type="text"
                validate={{
                  maxLength: { value: 30, message: translate('entity.validation.maxlength', { max: 30 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.program.name')}
                id="program-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 100, message: translate('entity.validation.maxlength', { max: 100 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.program.description')}
                id="program-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  maxLength: { value: 255, message: translate('entity.validation.maxlength', { max: 255 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.program.fullDescription')}
                id="program-fullDescription"
                name="fullDescription"
                data-cy="fullDescription"
                type="text"
                validate={{
                  maxLength: { value: 2048, message: translate('entity.validation.maxlength', { max: 2048 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.program.targetPublic')}
                id="program-targetPublic"
                name="targetPublic"
                data-cy="targetPublic"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.program.activationStatus')}
                id="program-activationStatus"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/program" replace color="info">
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

export default ProgramUpdate;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAssetType } from 'app/shared/model/asset-type.model';
import { getEntities as getAssetTypes } from 'app/entities/asset-type/asset-type.reducer';
import { IRawAssetProcTmp } from 'app/shared/model/raw-asset-proc-tmp.model';
import { StatusRawProcessingEnum } from 'app/shared/model/enumerations/status-raw-processing-enum.model';
import { getEntity, updateEntity, createEntity, reset } from './raw-asset-proc-tmp.reducer';

export const RawAssetProcTmpUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const assetTypes = useAppSelector(state => state.assetType.entities);
  const rawAssetProcTmpEntity = useAppSelector(state => state.rawAssetProcTmp.entity);
  const loading = useAppSelector(state => state.rawAssetProcTmp.loading);
  const updating = useAppSelector(state => state.rawAssetProcTmp.updating);
  const updateSuccess = useAppSelector(state => state.rawAssetProcTmp.updateSuccess);
  const statusRawProcessingEnumValues = Object.keys(StatusRawProcessingEnum);

  const handleClose = () => {
    navigate('/raw-asset-proc-tmp' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAssetTypes({}));
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
      ...rawAssetProcTmpEntity,
      ...values,
      assetType: assetTypes.find(it => it.id.toString() === values.assetType?.toString()),
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
          statusRawProcessing: 'UPLOADING',
          ...rawAssetProcTmpEntity,
          assetType: rawAssetProcTmpEntity?.assetType?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.home.createOrEditLabel" data-cy="RawAssetProcTmpCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.rawAssetProcTmp.home.createOrEditLabel">
              Create or edit a RawAssetProcTmp
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
                  id="raw-asset-proc-tmp-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.rawAssetProcTmp.name')}
                id="raw-asset-proc-tmp-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 255, message: translate('entity.validation.maxlength', { max: 255 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.rawAssetProcTmp.statusRawProcessing')}
                id="raw-asset-proc-tmp-statusRawProcessing"
                name="statusRawProcessing"
                data-cy="statusRawProcessing"
                type="select"
              >
                {statusRawProcessingEnumValues.map(statusRawProcessingEnum => (
                  <option value={statusRawProcessingEnum} key={statusRawProcessingEnum}>
                    {translate('azimuteErpSpringReactMonolith03App.StatusRawProcessingEnum.' + statusRawProcessingEnum)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.rawAssetProcTmp.fullFilenamePath')}
                id="raw-asset-proc-tmp-fullFilenamePath"
                name="fullFilenamePath"
                data-cy="fullFilenamePath"
                type="text"
                validate={{
                  maxLength: { value: 512, message: translate('entity.validation.maxlength', { max: 512 }) },
                }}
              />
              <ValidatedBlobField
                label={translate('azimuteErpSpringReactMonolith03App.rawAssetProcTmp.assetRawContentAsBlob')}
                id="raw-asset-proc-tmp-assetRawContentAsBlob"
                name="assetRawContentAsBlob"
                data-cy="assetRawContentAsBlob"
                openActionLabel={translate('entity.action.open')}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.rawAssetProcTmp.customAttributesDetailsJSON')}
                id="raw-asset-proc-tmp-customAttributesDetailsJSON"
                name="customAttributesDetailsJSON"
                data-cy="customAttributesDetailsJSON"
                type="text"
                validate={{
                  maxLength: { value: 4096, message: translate('entity.validation.maxlength', { max: 4096 }) },
                }}
              />
              <ValidatedField
                id="raw-asset-proc-tmp-assetType"
                name="assetType"
                data-cy="assetType"
                label={translate('azimuteErpSpringReactMonolith03App.rawAssetProcTmp.assetType')}
                type="select"
                required
              >
                <option value="" key="0" />
                {assetTypes
                  ? assetTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/raw-asset-proc-tmp" replace color="info">
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

export default RawAssetProcTmpUpdate;

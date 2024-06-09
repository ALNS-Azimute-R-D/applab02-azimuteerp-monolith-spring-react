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
import { getEntities as getRawAssetProcTmps } from 'app/entities/raw-asset-proc-tmp/raw-asset-proc-tmp.reducer';
import { IAssetCollection } from 'app/shared/model/asset-collection.model';
import { getEntities as getAssetCollections } from 'app/entities/asset-collection/asset-collection.reducer';
import { IAsset } from 'app/shared/model/asset.model';
import { StorageTypeEnum } from 'app/shared/model/enumerations/storage-type-enum.model';
import { StatusAssetEnum } from 'app/shared/model/enumerations/status-asset-enum.model';
import { PreferredPurposeEnum } from 'app/shared/model/enumerations/preferred-purpose-enum.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';
import { getEntity, updateEntity, createEntity, reset } from './asset.reducer';

export const AssetUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const assetTypes = useAppSelector(state => state.assetType.entities);
  const rawAssetProcTmps = useAppSelector(state => state.rawAssetProcTmp.entities);
  const assetCollections = useAppSelector(state => state.assetCollection.entities);
  const assetEntity = useAppSelector(state => state.asset.entity);
  const loading = useAppSelector(state => state.asset.loading);
  const updating = useAppSelector(state => state.asset.updating);
  const updateSuccess = useAppSelector(state => state.asset.updateSuccess);
  const storageTypeEnumValues = Object.keys(StorageTypeEnum);
  const statusAssetEnumValues = Object.keys(StatusAssetEnum);
  const preferredPurposeEnumValues = Object.keys(PreferredPurposeEnum);
  const activationStatusEnumValues = Object.keys(ActivationStatusEnum);

  const handleClose = () => {
    navigate('/asset' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAssetTypes({}));
    dispatch(getRawAssetProcTmps({}));
    dispatch(getAssetCollections({}));
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
      ...assetEntity,
      ...values,
      assetType: assetTypes.find(it => it.id.toString() === values.assetType?.toString()),
      rawAssetProcTmp: rawAssetProcTmps.find(it => it.id.toString() === values.rawAssetProcTmp?.toString()),
      assetCollections: mapIdList(values.assetCollections),
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
          storageTypeUsed: 'BLOB_IN_DB',
          status: 'ENABLED',
          preferredPurpose: 'USER_AVATAR',
          activationStatus: 'INACTIVE',
          ...assetEntity,
          assetType: assetEntity?.assetType?.id,
          rawAssetProcTmp: assetEntity?.rawAssetProcTmp?.id,
          assetCollections: assetEntity?.assetCollections?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.asset.home.createOrEditLabel" data-cy="AssetCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.home.createOrEditLabel">Create or edit a Asset</Translate>
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
                  id="asset-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.asset.name')}
                id="asset-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 512, message: translate('entity.validation.maxlength', { max: 512 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.asset.storageTypeUsed')}
                id="asset-storageTypeUsed"
                name="storageTypeUsed"
                data-cy="storageTypeUsed"
                type="select"
              >
                {storageTypeEnumValues.map(storageTypeEnum => (
                  <option value={storageTypeEnum} key={storageTypeEnum}>
                    {translate('azimuteErpSpringReactMonolith03App.StorageTypeEnum.' + storageTypeEnum)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.asset.fullFilenamePath')}
                id="asset-fullFilenamePath"
                name="fullFilenamePath"
                data-cy="fullFilenamePath"
                type="text"
                validate={{
                  maxLength: { value: 512, message: translate('entity.validation.maxlength', { max: 512 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.asset.status')}
                id="asset-status"
                name="status"
                data-cy="status"
                type="select"
              >
                {statusAssetEnumValues.map(statusAssetEnum => (
                  <option value={statusAssetEnum} key={statusAssetEnum}>
                    {translate('azimuteErpSpringReactMonolith03App.StatusAssetEnum.' + statusAssetEnum)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.asset.preferredPurpose')}
                id="asset-preferredPurpose"
                name="preferredPurpose"
                data-cy="preferredPurpose"
                type="select"
              >
                {preferredPurposeEnumValues.map(preferredPurposeEnum => (
                  <option value={preferredPurposeEnum} key={preferredPurposeEnum}>
                    {translate('azimuteErpSpringReactMonolith03App.PreferredPurposeEnum.' + preferredPurposeEnum)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedBlobField
                label={translate('azimuteErpSpringReactMonolith03App.asset.assetContentAsBlob')}
                id="asset-assetContentAsBlob"
                name="assetContentAsBlob"
                data-cy="assetContentAsBlob"
                openActionLabel={translate('entity.action.open')}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.asset.activationStatus')}
                id="asset-activationStatus"
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
              <ValidatedField
                id="asset-assetType"
                name="assetType"
                data-cy="assetType"
                label={translate('azimuteErpSpringReactMonolith03App.asset.assetType')}
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
              <ValidatedField
                id="asset-rawAssetProcTmp"
                name="rawAssetProcTmp"
                data-cy="rawAssetProcTmp"
                label={translate('azimuteErpSpringReactMonolith03App.asset.rawAssetProcTmp')}
                type="select"
              >
                <option value="" key="0" />
                {rawAssetProcTmps
                  ? rawAssetProcTmps.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.asset.assetCollection')}
                id="asset-assetCollection"
                data-cy="assetCollection"
                type="select"
                multiple
                name="assetCollections"
              >
                <option value="" key="0" />
                {assetCollections
                  ? assetCollections.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/asset" replace color="info">
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

export default AssetUpdate;

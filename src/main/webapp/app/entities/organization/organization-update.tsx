import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITenant } from 'app/shared/model/tenant.model';
import { getEntities as getTenants } from 'app/entities/tenant/tenant.reducer';
import { ITypeOfOrganization } from 'app/shared/model/type-of-organization.model';
import { getEntities as getTypeOfOrganizations } from 'app/entities/type-of-organization/type-of-organization.reducer';
import { getEntities as getOrganizations } from 'app/entities/organization/organization.reducer';
import { IOrganization } from 'app/shared/model/organization.model';
import { OrganizationStatusEnum } from 'app/shared/model/enumerations/organization-status-enum.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';
import { getEntity, updateEntity, createEntity, reset } from './organization.reducer';

export const OrganizationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const tenants = useAppSelector(state => state.tenant.entities);
  const typeOfOrganizations = useAppSelector(state => state.typeOfOrganization.entities);
  const organizations = useAppSelector(state => state.organization.entities);
  const organizationEntity = useAppSelector(state => state.organization.entity);
  const loading = useAppSelector(state => state.organization.loading);
  const updating = useAppSelector(state => state.organization.updating);
  const updateSuccess = useAppSelector(state => state.organization.updateSuccess);
  const organizationStatusEnumValues = Object.keys(OrganizationStatusEnum);
  const activationStatusEnumValues = Object.keys(ActivationStatusEnum);

  const handleClose = () => {
    navigate('/organization' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTenants({}));
    dispatch(getTypeOfOrganizations({}));
    dispatch(getOrganizations({}));
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
      ...organizationEntity,
      ...values,
      tenant: tenants.find(it => it.id.toString() === values.tenant?.toString()),
      typeOfOrganization: typeOfOrganizations.find(it => it.id.toString() === values.typeOfOrganization?.toString()),
      organizationParent: organizations.find(it => it.id.toString() === values.organizationParent?.toString()),
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
          organizationStatus: 'UNDER_EVALUATION',
          activationStatus: 'INACTIVE',
          ...organizationEntity,
          tenant: organizationEntity?.tenant?.id,
          typeOfOrganization: organizationEntity?.typeOfOrganization?.id,
          organizationParent: organizationEntity?.organizationParent?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.organization.home.createOrEditLabel" data-cy="OrganizationCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.home.createOrEditLabel">
              Create or edit a Organization
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
                  id="organization-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.organization.acronym')}
                id="organization-acronym"
                name="acronym"
                data-cy="acronym"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 20, message: translate('entity.validation.maxlength', { max: 20 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.organization.businessCode')}
                id="organization-businessCode"
                name="businessCode"
                data-cy="businessCode"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 15, message: translate('entity.validation.maxlength', { max: 15 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.organization.hierarchicalLevel')}
                id="organization-hierarchicalLevel"
                name="hierarchicalLevel"
                data-cy="hierarchicalLevel"
                type="text"
                validate={{
                  maxLength: { value: 30, message: translate('entity.validation.maxlength', { max: 30 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.organization.name')}
                id="organization-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 2, message: translate('entity.validation.minlength', { min: 2 }) },
                  maxLength: { value: 255, message: translate('entity.validation.maxlength', { max: 255 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.organization.description')}
                id="organization-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 512, message: translate('entity.validation.maxlength', { max: 512 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.organization.businessHandlerClazz')}
                id="organization-businessHandlerClazz"
                name="businessHandlerClazz"
                data-cy="businessHandlerClazz"
                type="text"
                validate={{
                  maxLength: { value: 512, message: translate('entity.validation.maxlength', { max: 512 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.organization.mainContactPersonDetailsJSON')}
                id="organization-mainContactPersonDetailsJSON"
                name="mainContactPersonDetailsJSON"
                data-cy="mainContactPersonDetailsJSON"
                type="text"
                validate={{
                  maxLength: { value: 2048, message: translate('entity.validation.maxlength', { max: 2048 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.organization.technicalEnvironmentsDetailsJSON')}
                id="organization-technicalEnvironmentsDetailsJSON"
                name="technicalEnvironmentsDetailsJSON"
                data-cy="technicalEnvironmentsDetailsJSON"
                type="text"
                validate={{
                  maxLength: { value: 4096, message: translate('entity.validation.maxlength', { max: 4096 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.organization.customAttributesDetailsJSON')}
                id="organization-customAttributesDetailsJSON"
                name="customAttributesDetailsJSON"
                data-cy="customAttributesDetailsJSON"
                type="text"
                validate={{
                  maxLength: { value: 4096, message: translate('entity.validation.maxlength', { max: 4096 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.organization.organizationStatus')}
                id="organization-organizationStatus"
                name="organizationStatus"
                data-cy="organizationStatus"
                type="select"
              >
                {organizationStatusEnumValues.map(organizationStatusEnum => (
                  <option value={organizationStatusEnum} key={organizationStatusEnum}>
                    {translate('azimuteErpSpringReactMonolith03App.OrganizationStatusEnum.' + organizationStatusEnum)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.organization.activationStatus')}
                id="organization-activationStatus"
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
                label={translate('azimuteErpSpringReactMonolith03App.organization.logoImg')}
                id="organization-logoImg"
                name="logoImg"
                data-cy="logoImg"
                isImage
                accept="image/*"
              />
              <ValidatedField
                id="organization-tenant"
                name="tenant"
                data-cy="tenant"
                label={translate('azimuteErpSpringReactMonolith03App.organization.tenant')}
                type="select"
                required
              >
                <option value="" key="0" />
                {tenants
                  ? tenants.map(otherEntity => (
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
                id="organization-typeOfOrganization"
                name="typeOfOrganization"
                data-cy="typeOfOrganization"
                label={translate('azimuteErpSpringReactMonolith03App.organization.typeOfOrganization')}
                type="select"
                required
              >
                <option value="" key="0" />
                {typeOfOrganizations
                  ? typeOfOrganizations.map(otherEntity => (
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
                id="organization-organizationParent"
                name="organizationParent"
                data-cy="organizationParent"
                label={translate('azimuteErpSpringReactMonolith03App.organization.organizationParent')}
                type="select"
              >
                <option value="" key="0" />
                {organizations
                  ? organizations.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/organization" replace color="info">
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

export default OrganizationUpdate;

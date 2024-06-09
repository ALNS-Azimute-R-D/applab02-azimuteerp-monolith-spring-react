import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IOrganizationMembership } from 'app/shared/model/organization-membership.model';
import { getEntities as getOrganizationMemberships } from 'app/entities/organization-membership/organization-membership.reducer';
import { IOrganizationRole } from 'app/shared/model/organization-role.model';
import { getEntities as getOrganizationRoles } from 'app/entities/organization-role/organization-role.reducer';
import { IOrganizationMemberRole } from 'app/shared/model/organization-member-role.model';
import { getEntity, updateEntity, createEntity, reset } from './organization-member-role.reducer';

export const OrganizationMemberRoleUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const organizationMemberships = useAppSelector(state => state.organizationMembership.entities);
  const organizationRoles = useAppSelector(state => state.organizationRole.entities);
  const organizationMemberRoleEntity = useAppSelector(state => state.organizationMemberRole.entity);
  const loading = useAppSelector(state => state.organizationMemberRole.loading);
  const updating = useAppSelector(state => state.organizationMemberRole.updating);
  const updateSuccess = useAppSelector(state => state.organizationMemberRole.updateSuccess);

  const handleClose = () => {
    navigate('/organization-member-role' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getOrganizationMemberships({}));
    dispatch(getOrganizationRoles({}));
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
      ...organizationMemberRoleEntity,
      ...values,
      organizationMembership: organizationMemberships.find(it => it.id.toString() === values.organizationMembership?.toString()),
      organizationRole: organizationRoles.find(it => it.id.toString() === values.organizationRole?.toString()),
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
          ...organizationMemberRoleEntity,
          organizationMembership: organizationMemberRoleEntity?.organizationMembership?.id,
          organizationRole: organizationMemberRoleEntity?.organizationRole?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="azimuteErpSpringReactMonolith03App.organizationMemberRole.home.createOrEditLabel"
            data-cy="OrganizationMemberRoleCreateUpdateHeading"
          >
            <Translate contentKey="azimuteErpSpringReactMonolith03App.organizationMemberRole.home.createOrEditLabel">
              Create or edit a OrganizationMemberRole
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
                  id="organization-member-role-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.organizationMemberRole.joinedAt')}
                id="organization-member-role-joinedAt"
                name="joinedAt"
                data-cy="joinedAt"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                id="organization-member-role-organizationMembership"
                name="organizationMembership"
                data-cy="organizationMembership"
                label={translate('azimuteErpSpringReactMonolith03App.organizationMemberRole.organizationMembership')}
                type="select"
                required
              >
                <option value="" key="0" />
                {organizationMemberships
                  ? organizationMemberships.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="organization-member-role-organizationRole"
                name="organizationRole"
                data-cy="organizationRole"
                label={translate('azimuteErpSpringReactMonolith03App.organizationMemberRole.organizationRole')}
                type="select"
                required
              >
                <option value="" key="0" />
                {organizationRoles
                  ? organizationRoles.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/organization-member-role" replace color="info">
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

export default OrganizationMemberRoleUpdate;

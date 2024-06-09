import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBrand } from 'app/shared/model/brand.model';
import { getEntities as getBrands } from 'app/entities/brand/brand.reducer';
import { ISupplier } from 'app/shared/model/supplier.model';
import { getEntities as getSuppliers } from 'app/entities/supplier/supplier.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';
import { getEntity, updateEntity, createEntity, reset } from './product.reducer';

export const ProductUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const brands = useAppSelector(state => state.brand.entities);
  const suppliers = useAppSelector(state => state.supplier.entities);
  const productEntity = useAppSelector(state => state.product.entity);
  const loading = useAppSelector(state => state.product.loading);
  const updating = useAppSelector(state => state.product.updating);
  const updateSuccess = useAppSelector(state => state.product.updateSuccess);
  const activationStatusEnumValues = Object.keys(ActivationStatusEnum);

  const handleClose = () => {
    navigate('/product' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getBrands({}));
    dispatch(getSuppliers({}));
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
    if (values.standardCost !== undefined && typeof values.standardCost !== 'number') {
      values.standardCost = Number(values.standardCost);
    }
    if (values.listPrice !== undefined && typeof values.listPrice !== 'number') {
      values.listPrice = Number(values.listPrice);
    }
    if (values.reorderLevel !== undefined && typeof values.reorderLevel !== 'number') {
      values.reorderLevel = Number(values.reorderLevel);
    }
    if (values.targetLevel !== undefined && typeof values.targetLevel !== 'number') {
      values.targetLevel = Number(values.targetLevel);
    }
    if (values.minimumReorderQuantity !== undefined && typeof values.minimumReorderQuantity !== 'number') {
      values.minimumReorderQuantity = Number(values.minimumReorderQuantity);
    }

    const entity = {
      ...productEntity,
      ...values,
      brand: brands.find(it => it.id.toString() === values.brand?.toString()),
      toSuppliers: mapIdList(values.toSuppliers),
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
          ...productEntity,
          brand: productEntity?.brand?.id,
          toSuppliers: productEntity?.toSuppliers?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.product.home.createOrEditLabel" data-cy="ProductCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.product.home.createOrEditLabel">Create or edit a Product</Translate>
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
                  id="product-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.product.productSKU')}
                id="product-productSKU"
                name="productSKU"
                data-cy="productSKU"
                type="text"
                validate={{
                  maxLength: { value: 25, message: translate('entity.validation.maxlength', { max: 25 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.product.productName')}
                id="product-productName"
                name="productName"
                data-cy="productName"
                type="text"
                validate={{
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.product.description')}
                id="product-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  maxLength: { value: 512, message: translate('entity.validation.maxlength', { max: 512 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.product.standardCost')}
                id="product-standardCost"
                name="standardCost"
                data-cy="standardCost"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.product.listPrice')}
                id="product-listPrice"
                name="listPrice"
                data-cy="listPrice"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.product.reorderLevel')}
                id="product-reorderLevel"
                name="reorderLevel"
                data-cy="reorderLevel"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.product.targetLevel')}
                id="product-targetLevel"
                name="targetLevel"
                data-cy="targetLevel"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.product.quantityPerUnit')}
                id="product-quantityPerUnit"
                name="quantityPerUnit"
                data-cy="quantityPerUnit"
                type="text"
                validate={{
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.product.discontinued')}
                id="product-discontinued"
                name="discontinued"
                data-cy="discontinued"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.product.minimumReorderQuantity')}
                id="product-minimumReorderQuantity"
                name="minimumReorderQuantity"
                data-cy="minimumReorderQuantity"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.product.suggestedCategory')}
                id="product-suggestedCategory"
                name="suggestedCategory"
                data-cy="suggestedCategory"
                type="text"
                validate={{
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedBlobField
                label={translate('azimuteErpSpringReactMonolith03App.product.attachments')}
                id="product-attachments"
                name="attachments"
                data-cy="attachments"
                openActionLabel={translate('entity.action.open')}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.product.activationStatus')}
                id="product-activationStatus"
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
                id="product-brand"
                name="brand"
                data-cy="brand"
                label={translate('azimuteErpSpringReactMonolith03App.product.brand')}
                type="select"
                required
              >
                <option value="" key="0" />
                {brands
                  ? brands.map(otherEntity => (
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
                label={translate('azimuteErpSpringReactMonolith03App.product.toSupplier')}
                id="product-toSupplier"
                data-cy="toSupplier"
                type="select"
                multiple
                name="toSuppliers"
              >
                <option value="" key="0" />
                {suppliers
                  ? suppliers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/product" replace color="info">
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

export default ProductUpdate;

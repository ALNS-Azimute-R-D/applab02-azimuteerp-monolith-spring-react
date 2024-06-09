import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISupplier } from 'app/shared/model/supplier.model';
import { getEntities as getSuppliers } from 'app/entities/supplier/supplier.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { getEntities as getProducts } from 'app/entities/product/product.reducer';
import { IWarehouse } from 'app/shared/model/warehouse.model';
import { getEntities as getWarehouses } from 'app/entities/warehouse/warehouse.reducer';
import { IInventoryTransaction } from 'app/shared/model/inventory-transaction.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';
import { getEntity, updateEntity, createEntity, reset } from './inventory-transaction.reducer';

export const InventoryTransactionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const suppliers = useAppSelector(state => state.supplier.entities);
  const products = useAppSelector(state => state.product.entities);
  const warehouses = useAppSelector(state => state.warehouse.entities);
  const inventoryTransactionEntity = useAppSelector(state => state.inventoryTransaction.entity);
  const loading = useAppSelector(state => state.inventoryTransaction.loading);
  const updating = useAppSelector(state => state.inventoryTransaction.updating);
  const updateSuccess = useAppSelector(state => state.inventoryTransaction.updateSuccess);
  const activationStatusEnumValues = Object.keys(ActivationStatusEnum);

  const handleClose = () => {
    navigate('/inventory-transaction' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getSuppliers({}));
    dispatch(getProducts({}));
    dispatch(getWarehouses({}));
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
    if (values.invoiceId !== undefined && typeof values.invoiceId !== 'number') {
      values.invoiceId = Number(values.invoiceId);
    }
    values.transactionCreatedDate = convertDateTimeToServer(values.transactionCreatedDate);
    values.transactionModifiedDate = convertDateTimeToServer(values.transactionModifiedDate);
    if (values.quantity !== undefined && typeof values.quantity !== 'number') {
      values.quantity = Number(values.quantity);
    }

    const entity = {
      ...inventoryTransactionEntity,
      ...values,
      supplier: suppliers.find(it => it.id.toString() === values.supplier?.toString()),
      product: products.find(it => it.id.toString() === values.product?.toString()),
      warehouse: warehouses.find(it => it.id.toString() === values.warehouse?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          transactionCreatedDate: displayDefaultDateTime(),
          transactionModifiedDate: displayDefaultDateTime(),
        }
      : {
          activationStatus: 'INACTIVE',
          ...inventoryTransactionEntity,
          transactionCreatedDate: convertDateTimeFromServer(inventoryTransactionEntity.transactionCreatedDate),
          transactionModifiedDate: convertDateTimeFromServer(inventoryTransactionEntity.transactionModifiedDate),
          supplier: inventoryTransactionEntity?.supplier?.id,
          product: inventoryTransactionEntity?.product?.id,
          warehouse: inventoryTransactionEntity?.warehouse?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="azimuteErpSpringReactMonolith03App.inventoryTransaction.home.createOrEditLabel"
            data-cy="InventoryTransactionCreateUpdateHeading"
          >
            <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.home.createOrEditLabel">
              Create or edit a InventoryTransaction
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
                  id="inventory-transaction-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.inventoryTransaction.invoiceId')}
                id="inventory-transaction-invoiceId"
                name="invoiceId"
                data-cy="invoiceId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.inventoryTransaction.transactionCreatedDate')}
                id="inventory-transaction-transactionCreatedDate"
                name="transactionCreatedDate"
                data-cy="transactionCreatedDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.inventoryTransaction.transactionModifiedDate')}
                id="inventory-transaction-transactionModifiedDate"
                name="transactionModifiedDate"
                data-cy="transactionModifiedDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.inventoryTransaction.quantity')}
                id="inventory-transaction-quantity"
                name="quantity"
                data-cy="quantity"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.inventoryTransaction.transactionComments')}
                id="inventory-transaction-transactionComments"
                name="transactionComments"
                data-cy="transactionComments"
                type="text"
                validate={{
                  maxLength: { value: 512, message: translate('entity.validation.maxlength', { max: 512 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.inventoryTransaction.activationStatus')}
                id="inventory-transaction-activationStatus"
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
                id="inventory-transaction-supplier"
                name="supplier"
                data-cy="supplier"
                label={translate('azimuteErpSpringReactMonolith03App.inventoryTransaction.supplier')}
                type="select"
                required
              >
                <option value="" key="0" />
                {suppliers
                  ? suppliers.map(otherEntity => (
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
                id="inventory-transaction-product"
                name="product"
                data-cy="product"
                label={translate('azimuteErpSpringReactMonolith03App.inventoryTransaction.product')}
                type="select"
                required
              >
                <option value="" key="0" />
                {products
                  ? products.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.productName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="inventory-transaction-warehouse"
                name="warehouse"
                data-cy="warehouse"
                label={translate('azimuteErpSpringReactMonolith03App.inventoryTransaction.warehouse')}
                type="select"
                required
              >
                <option value="" key="0" />
                {warehouses
                  ? warehouses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.acronym}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/inventory-transaction" replace color="info">
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

export default InventoryTransactionUpdate;

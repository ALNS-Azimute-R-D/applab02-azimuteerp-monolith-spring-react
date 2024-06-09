import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IWarehouse } from 'app/shared/model/warehouse.model';
import { getEntities as getWarehouses } from 'app/entities/warehouse/warehouse.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { getEntities as getProducts } from 'app/entities/product/product.reducer';
import { IStockLevel } from 'app/shared/model/stock-level.model';
import { getEntity, updateEntity, createEntity, reset } from './stock-level.reducer';

export const StockLevelUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const warehouses = useAppSelector(state => state.warehouse.entities);
  const products = useAppSelector(state => state.product.entities);
  const stockLevelEntity = useAppSelector(state => state.stockLevel.entity);
  const loading = useAppSelector(state => state.stockLevel.loading);
  const updating = useAppSelector(state => state.stockLevel.updating);
  const updateSuccess = useAppSelector(state => state.stockLevel.updateSuccess);

  const handleClose = () => {
    navigate('/stock-level' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getWarehouses({}));
    dispatch(getProducts({}));
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
    values.lastModifiedDate = convertDateTimeToServer(values.lastModifiedDate);
    if (values.remainingQuantity !== undefined && typeof values.remainingQuantity !== 'number') {
      values.remainingQuantity = Number(values.remainingQuantity);
    }

    const entity = {
      ...stockLevelEntity,
      ...values,
      warehouse: warehouses.find(it => it.id.toString() === values.warehouse?.toString()),
      product: products.find(it => it.id.toString() === values.product?.toString()),
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
          lastModifiedDate: displayDefaultDateTime(),
        }
      : {
          ...stockLevelEntity,
          lastModifiedDate: convertDateTimeFromServer(stockLevelEntity.lastModifiedDate),
          warehouse: stockLevelEntity?.warehouse?.id,
          product: stockLevelEntity?.product?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.stockLevel.home.createOrEditLabel" data-cy="StockLevelCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.stockLevel.home.createOrEditLabel">
              Create or edit a StockLevel
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
                  id="stock-level-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.stockLevel.lastModifiedDate')}
                id="stock-level-lastModifiedDate"
                name="lastModifiedDate"
                data-cy="lastModifiedDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.stockLevel.remainingQuantity')}
                id="stock-level-remainingQuantity"
                name="remainingQuantity"
                data-cy="remainingQuantity"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.stockLevel.commonAttributesDetailsJSON')}
                id="stock-level-commonAttributesDetailsJSON"
                name="commonAttributesDetailsJSON"
                data-cy="commonAttributesDetailsJSON"
                type="text"
                validate={{
                  maxLength: { value: 2048, message: translate('entity.validation.maxlength', { max: 2048 }) },
                }}
              />
              <ValidatedField
                id="stock-level-warehouse"
                name="warehouse"
                data-cy="warehouse"
                label={translate('azimuteErpSpringReactMonolith03App.stockLevel.warehouse')}
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
              <ValidatedField
                id="stock-level-product"
                name="product"
                data-cy="product"
                label={translate('azimuteErpSpringReactMonolith03App.stockLevel.product')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/stock-level" replace color="info">
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

export default StockLevelUpdate;

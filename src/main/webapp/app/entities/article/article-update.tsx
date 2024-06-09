import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAssetCollection } from 'app/shared/model/asset-collection.model';
import { getEntities as getAssetCollections } from 'app/entities/asset-collection/asset-collection.reducer';
import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { IArticle } from 'app/shared/model/article.model';
import { SizeOptionEnum } from 'app/shared/model/enumerations/size-option-enum.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';
import { getEntity, updateEntity, createEntity, reset } from './article.reducer';

export const ArticleUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const assetCollections = useAppSelector(state => state.assetCollection.entities);
  const categories = useAppSelector(state => state.category.entities);
  const articleEntity = useAppSelector(state => state.article.entity);
  const loading = useAppSelector(state => state.article.loading);
  const updating = useAppSelector(state => state.article.updating);
  const updateSuccess = useAppSelector(state => state.article.updateSuccess);
  const sizeOptionEnumValues = Object.keys(SizeOptionEnum);
  const activationStatusEnumValues = Object.keys(ActivationStatusEnum);

  const handleClose = () => {
    navigate('/article' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAssetCollections({}));
    dispatch(getCategories({}));
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
    if (values.inventoryProductId !== undefined && typeof values.inventoryProductId !== 'number') {
      values.inventoryProductId = Number(values.inventoryProductId);
    }
    if (values.priceValue !== undefined && typeof values.priceValue !== 'number') {
      values.priceValue = Number(values.priceValue);
    }

    const entity = {
      ...articleEntity,
      ...values,
      assetCollections: mapIdList(values.assetCollections),
      mainCategory: categories.find(it => it.id.toString() === values.mainCategory?.toString()),
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
          itemSize: 'S',
          activationStatus: 'INACTIVE',
          ...articleEntity,
          assetCollections: articleEntity?.assetCollections?.map(e => e.id.toString()),
          mainCategory: articleEntity?.mainCategory?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.article.home.createOrEditLabel" data-cy="ArticleCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.article.home.createOrEditLabel">Create or edit a Article</Translate>
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
                  id="article-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.article.inventoryProductId')}
                id="article-inventoryProductId"
                name="inventoryProductId"
                data-cy="inventoryProductId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.article.skuCode')}
                id="article-skuCode"
                name="skuCode"
                data-cy="skuCode"
                type="text"
                validate={{
                  maxLength: { value: 60, message: translate('entity.validation.maxlength', { max: 60 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.article.customName')}
                id="article-customName"
                name="customName"
                data-cy="customName"
                type="text"
                validate={{
                  maxLength: { value: 150, message: translate('entity.validation.maxlength', { max: 150 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.article.customDescription')}
                id="article-customDescription"
                name="customDescription"
                data-cy="customDescription"
                type="text"
                validate={{
                  maxLength: { value: 8192, message: translate('entity.validation.maxlength', { max: 8192 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.article.priceValue')}
                id="article-priceValue"
                name="priceValue"
                data-cy="priceValue"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.article.itemSize')}
                id="article-itemSize"
                name="itemSize"
                data-cy="itemSize"
                type="select"
              >
                {sizeOptionEnumValues.map(sizeOptionEnum => (
                  <option value={sizeOptionEnum} key={sizeOptionEnum}>
                    {translate('azimuteErpSpringReactMonolith03App.SizeOptionEnum.' + sizeOptionEnum)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.article.activationStatus')}
                id="article-activationStatus"
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
                label={translate('azimuteErpSpringReactMonolith03App.article.assetCollection')}
                id="article-assetCollection"
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
              <ValidatedField
                id="article-mainCategory"
                name="mainCategory"
                data-cy="mainCategory"
                label={translate('azimuteErpSpringReactMonolith03App.article.mainCategory')}
                type="select"
              >
                <option value="" key="0" />
                {categories
                  ? categories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.acronym}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/article" replace color="info">
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

export default ArticleUpdate;

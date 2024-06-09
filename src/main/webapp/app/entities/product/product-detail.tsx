import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './product.reducer';

export const ProductDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const productEntity = useAppSelector(state => state.product.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="productDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.product.detail.title">Product</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{productEntity.id}</dd>
          <dt>
            <span id="productSKU">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.product.productSKU">Product SKU</Translate>
            </span>
          </dt>
          <dd>{productEntity.productSKU}</dd>
          <dt>
            <span id="productName">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.product.productName">Product Name</Translate>
            </span>
          </dt>
          <dd>{productEntity.productName}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.product.description">Description</Translate>
            </span>
          </dt>
          <dd>{productEntity.description}</dd>
          <dt>
            <span id="standardCost">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.product.standardCost">Standard Cost</Translate>
            </span>
          </dt>
          <dd>{productEntity.standardCost}</dd>
          <dt>
            <span id="listPrice">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.product.listPrice">List Price</Translate>
            </span>
          </dt>
          <dd>{productEntity.listPrice}</dd>
          <dt>
            <span id="reorderLevel">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.product.reorderLevel">Reorder Level</Translate>
            </span>
          </dt>
          <dd>{productEntity.reorderLevel}</dd>
          <dt>
            <span id="targetLevel">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.product.targetLevel">Target Level</Translate>
            </span>
          </dt>
          <dd>{productEntity.targetLevel}</dd>
          <dt>
            <span id="quantityPerUnit">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.product.quantityPerUnit">Quantity Per Unit</Translate>
            </span>
          </dt>
          <dd>{productEntity.quantityPerUnit}</dd>
          <dt>
            <span id="discontinued">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.product.discontinued">Discontinued</Translate>
            </span>
          </dt>
          <dd>{productEntity.discontinued ? 'true' : 'false'}</dd>
          <dt>
            <span id="minimumReorderQuantity">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.product.minimumReorderQuantity">Minimum Reorder Quantity</Translate>
            </span>
          </dt>
          <dd>{productEntity.minimumReorderQuantity}</dd>
          <dt>
            <span id="suggestedCategory">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.product.suggestedCategory">Suggested Category</Translate>
            </span>
          </dt>
          <dd>{productEntity.suggestedCategory}</dd>
          <dt>
            <span id="attachments">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.product.attachments">Attachments</Translate>
            </span>
          </dt>
          <dd>
            {productEntity.attachments ? (
              <div>
                {productEntity.attachmentsContentType ? (
                  <a onClick={openFile(productEntity.attachmentsContentType, productEntity.attachments)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {productEntity.attachmentsContentType}, {byteSize(productEntity.attachments)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.product.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{productEntity.activationStatus}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.product.brand">Brand</Translate>
          </dt>
          <dd>{productEntity.brand ? productEntity.brand.acronym : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.product.toSupplier">To Supplier</Translate>
          </dt>
          <dd>
            {productEntity.toSuppliers
              ? productEntity.toSuppliers.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {productEntity.toSuppliers && i === productEntity.toSuppliers.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/product" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product/${productEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProductDetail;

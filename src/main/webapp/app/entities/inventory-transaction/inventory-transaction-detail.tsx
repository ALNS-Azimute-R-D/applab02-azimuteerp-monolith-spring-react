import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './inventory-transaction.reducer';

export const InventoryTransactionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const inventoryTransactionEntity = useAppSelector(state => state.inventoryTransaction.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="inventoryTransactionDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.detail.title">InventoryTransaction</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{inventoryTransactionEntity.id}</dd>
          <dt>
            <span id="invoiceId">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.invoiceId">Invoice Id</Translate>
            </span>
          </dt>
          <dd>{inventoryTransactionEntity.invoiceId}</dd>
          <dt>
            <span id="transactionCreatedDate">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.transactionCreatedDate">
                Transaction Created Date
              </Translate>
            </span>
          </dt>
          <dd>
            {inventoryTransactionEntity.transactionCreatedDate ? (
              <TextFormat value={inventoryTransactionEntity.transactionCreatedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="transactionModifiedDate">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.transactionModifiedDate">
                Transaction Modified Date
              </Translate>
            </span>
          </dt>
          <dd>
            {inventoryTransactionEntity.transactionModifiedDate ? (
              <TextFormat value={inventoryTransactionEntity.transactionModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{inventoryTransactionEntity.quantity}</dd>
          <dt>
            <span id="transactionComments">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.transactionComments">
                Transaction Comments
              </Translate>
            </span>
          </dt>
          <dd>{inventoryTransactionEntity.transactionComments}</dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{inventoryTransactionEntity.activationStatus}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.supplier">Supplier</Translate>
          </dt>
          <dd>{inventoryTransactionEntity.supplier ? inventoryTransactionEntity.supplier.acronym : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.product">Product</Translate>
          </dt>
          <dd>{inventoryTransactionEntity.product ? inventoryTransactionEntity.product.productName : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.inventoryTransaction.warehouse">Warehouse</Translate>
          </dt>
          <dd>{inventoryTransactionEntity.warehouse ? inventoryTransactionEntity.warehouse.acronym : ''}</dd>
        </dl>
        <Button tag={Link} to="/inventory-transaction" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/inventory-transaction/${inventoryTransactionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default InventoryTransactionDetail;

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './stock-level.reducer';

export const StockLevelDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const stockLevelEntity = useAppSelector(state => state.stockLevel.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="stockLevelDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.stockLevel.detail.title">StockLevel</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{stockLevelEntity.id}</dd>
          <dt>
            <span id="lastModifiedDate">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.stockLevel.lastModifiedDate">Last Modified Date</Translate>
            </span>
          </dt>
          <dd>
            {stockLevelEntity.lastModifiedDate ? (
              <TextFormat value={stockLevelEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="remainingQuantity">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.stockLevel.remainingQuantity">Remaining Quantity</Translate>
            </span>
          </dt>
          <dd>{stockLevelEntity.remainingQuantity}</dd>
          <dt>
            <span id="commonAttributesDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.stockLevel.commonAttributesDetailsJSON">
                Common Attributes Details JSON
              </Translate>
            </span>
          </dt>
          <dd>{stockLevelEntity.commonAttributesDetailsJSON}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.stockLevel.warehouse">Warehouse</Translate>
          </dt>
          <dd>{stockLevelEntity.warehouse ? stockLevelEntity.warehouse.acronym : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.stockLevel.product">Product</Translate>
          </dt>
          <dd>{stockLevelEntity.product ? stockLevelEntity.product.productName : ''}</dd>
        </dl>
        <Button tag={Link} to="/stock-level" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/stock-level/${stockLevelEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default StockLevelDetail;

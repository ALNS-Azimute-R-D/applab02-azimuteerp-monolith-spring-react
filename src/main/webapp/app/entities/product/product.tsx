import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './product.reducer';

export const Product = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const productList = useAppSelector(state => state.product.entities);
  const loading = useAppSelector(state => state.product.loading);
  const totalItems = useAppSelector(state => state.product.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="product-heading" data-cy="ProductHeading">
        <Translate contentKey="azimuteErpSpringReactMonolith03App.product.home.title">Products</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="azimuteErpSpringReactMonolith03App.product.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/product/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="azimuteErpSpringReactMonolith03App.product.home.createLabel">Create new Product</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {productList && productList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.product.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('productSKU')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.product.productSKU">Product SKU</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('productSKU')} />
                </th>
                <th className="hand" onClick={sort('productName')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.product.productName">Product Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('productName')} />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.product.description">Description</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                </th>
                <th className="hand" onClick={sort('standardCost')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.product.standardCost">Standard Cost</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('standardCost')} />
                </th>
                <th className="hand" onClick={sort('listPrice')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.product.listPrice">List Price</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('listPrice')} />
                </th>
                <th className="hand" onClick={sort('reorderLevel')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.product.reorderLevel">Reorder Level</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('reorderLevel')} />
                </th>
                <th className="hand" onClick={sort('targetLevel')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.product.targetLevel">Target Level</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('targetLevel')} />
                </th>
                <th className="hand" onClick={sort('quantityPerUnit')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.product.quantityPerUnit">Quantity Per Unit</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('quantityPerUnit')} />
                </th>
                <th className="hand" onClick={sort('discontinued')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.product.discontinued">Discontinued</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('discontinued')} />
                </th>
                <th className="hand" onClick={sort('minimumReorderQuantity')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.product.minimumReorderQuantity">
                    Minimum Reorder Quantity
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('minimumReorderQuantity')} />
                </th>
                <th className="hand" onClick={sort('suggestedCategory')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.product.suggestedCategory">Suggested Category</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('suggestedCategory')} />
                </th>
                <th className="hand" onClick={sort('attachments')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.product.attachments">Attachments</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('attachments')} />
                </th>
                <th className="hand" onClick={sort('activationStatus')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.product.activationStatus">Activation Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('activationStatus')} />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.product.brand">Brand</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {productList.map((product, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/product/${product.id}`} color="link" size="sm">
                      {product.id}
                    </Button>
                  </td>
                  <td>{product.productSKU}</td>
                  <td>{product.productName}</td>
                  <td>{product.description}</td>
                  <td>{product.standardCost}</td>
                  <td>{product.listPrice}</td>
                  <td>{product.reorderLevel}</td>
                  <td>{product.targetLevel}</td>
                  <td>{product.quantityPerUnit}</td>
                  <td>{product.discontinued ? 'true' : 'false'}</td>
                  <td>{product.minimumReorderQuantity}</td>
                  <td>{product.suggestedCategory}</td>
                  <td>
                    {product.attachments ? (
                      <div>
                        {product.attachmentsContentType ? (
                          <a onClick={openFile(product.attachmentsContentType, product.attachments)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {product.attachmentsContentType}, {byteSize(product.attachments)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <Translate contentKey={`azimuteErpSpringReactMonolith03App.ActivationStatusEnum.${product.activationStatus}`} />
                  </td>
                  <td>{product.brand ? <Link to={`/brand/${product.brand.id}`}>{product.brand.acronym}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/product/${product.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/product/${product.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = `/product/${product.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
                        }
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.product.home.notFound">No Products found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={productList && productList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Product;

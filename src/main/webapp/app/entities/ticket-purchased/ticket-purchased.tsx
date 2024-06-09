import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './ticket-purchased.reducer';

export const TicketPurchased = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const ticketPurchasedList = useAppSelector(state => state.ticketPurchased.entities);
  const loading = useAppSelector(state => state.ticketPurchased.loading);
  const totalItems = useAppSelector(state => state.ticketPurchased.totalItems);

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
      <h2 id="ticket-purchased-heading" data-cy="TicketPurchasedHeading">
        <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.home.title">Ticket Purchaseds</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/ticket-purchased/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.home.createLabel">
              Create new Ticket Purchased
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {ticketPurchasedList && ticketPurchasedList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('buyingCode')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.buyingCode">Buying Code</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('buyingCode')} />
                </th>
                <th className="hand" onClick={sort('duePaymentDate')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.duePaymentDate">Due Payment Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('duePaymentDate')} />
                </th>
                <th className="hand" onClick={sort('amountOfTickets')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.amountOfTickets">Amount Of Tickets</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('amountOfTickets')} />
                </th>
                <th className="hand" onClick={sort('taxValue')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.taxValue">Tax Value</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('taxValue')} />
                </th>
                <th className="hand" onClick={sort('ticketValue')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.ticketValue">Ticket Value</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('ticketValue')} />
                </th>
                <th className="hand" onClick={sort('acquiredSeatsNumbers')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.acquiredSeatsNumbers">
                    Acquired Seats Numbers
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('acquiredSeatsNumbers')} />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.description">Description</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.event">Event</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.invoice">Invoice</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ticketPurchasedList.map((ticketPurchased, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/ticket-purchased/${ticketPurchased.id}`} color="link" size="sm">
                      {ticketPurchased.id}
                    </Button>
                  </td>
                  <td>{ticketPurchased.buyingCode}</td>
                  <td>
                    {ticketPurchased.duePaymentDate ? (
                      <TextFormat type="date" value={ticketPurchased.duePaymentDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{ticketPurchased.amountOfTickets}</td>
                  <td>{ticketPurchased.taxValue}</td>
                  <td>{ticketPurchased.ticketValue}</td>
                  <td>{ticketPurchased.acquiredSeatsNumbers}</td>
                  <td>{ticketPurchased.description}</td>
                  <td>
                    {ticketPurchased.event ? <Link to={`/event/${ticketPurchased.event.id}`}>{ticketPurchased.event.acronym}</Link> : ''}
                  </td>
                  <td>
                    {ticketPurchased.invoice ? <Link to={`/invoice/${ticketPurchased.invoice.id}`}>{ticketPurchased.invoice.id}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/ticket-purchased/${ticketPurchased.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/ticket-purchased/${ticketPurchased.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/ticket-purchased/${ticketPurchased.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="azimuteErpSpringReactMonolith03App.ticketPurchased.home.notFound">
                No Ticket Purchaseds found
              </Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={ticketPurchasedList && ticketPurchasedList.length > 0 ? '' : 'd-none'}>
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

export default TicketPurchased;

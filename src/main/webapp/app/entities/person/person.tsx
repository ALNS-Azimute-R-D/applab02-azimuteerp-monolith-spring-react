import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './person.reducer';

export const Person = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const personList = useAppSelector(state => state.person.entities);
  const loading = useAppSelector(state => state.person.loading);
  const totalItems = useAppSelector(state => state.person.totalItems);

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
      <h2 id="person-heading" data-cy="PersonHeading">
        <Translate contentKey="azimuteErpSpringReactMonolith03App.person.home.title">People</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="azimuteErpSpringReactMonolith03App.person.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/person/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="azimuteErpSpringReactMonolith03App.person.home.createLabel">Create new Person</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {personList && personList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('firstname')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.firstname">Firstname</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('firstname')} />
                </th>
                <th className="hand" onClick={sort('lastname')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.lastname">Lastname</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('lastname')} />
                </th>
                <th className="hand" onClick={sort('fullname')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.fullname">Fullname</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('fullname')} />
                </th>
                <th className="hand" onClick={sort('birthDate')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.birthDate">Birth Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('birthDate')} />
                </th>
                <th className="hand" onClick={sort('gender')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.gender">Gender</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('gender')} />
                </th>
                <th className="hand" onClick={sort('codeBI')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.codeBI">Code BI</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('codeBI')} />
                </th>
                <th className="hand" onClick={sort('codeNIF')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.codeNIF">Code NIF</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('codeNIF')} />
                </th>
                <th className="hand" onClick={sort('streetAddress')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.streetAddress">Street Address</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('streetAddress')} />
                </th>
                <th className="hand" onClick={sort('houseNumber')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.houseNumber">House Number</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('houseNumber')} />
                </th>
                <th className="hand" onClick={sort('locationName')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.locationName">Location Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('locationName')} />
                </th>
                <th className="hand" onClick={sort('postalCode')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.postalCode">Postal Code</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('postalCode')} />
                </th>
                <th className="hand" onClick={sort('mainEmail')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.mainEmail">Main Email</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('mainEmail')} />
                </th>
                <th className="hand" onClick={sort('landPhoneNumber')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.landPhoneNumber">Land Phone Number</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('landPhoneNumber')} />
                </th>
                <th className="hand" onClick={sort('mobilePhoneNumber')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.mobilePhoneNumber">Mobile Phone Number</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('mobilePhoneNumber')} />
                </th>
                <th className="hand" onClick={sort('occupation')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.occupation">Occupation</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('occupation')} />
                </th>
                <th className="hand" onClick={sort('preferredLanguage')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.preferredLanguage">Preferred Language</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('preferredLanguage')} />
                </th>
                <th className="hand" onClick={sort('usernameInOAuth2')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.usernameInOAuth2">Username In O Auth 2</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('usernameInOAuth2')} />
                </th>
                <th className="hand" onClick={sort('userIdInOAuth2')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.userIdInOAuth2">User Id In O Auth 2</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('userIdInOAuth2')} />
                </th>
                <th className="hand" onClick={sort('customAttributesDetailsJSON')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.customAttributesDetailsJSON">
                    Custom Attributes Details JSON
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('customAttributesDetailsJSON')} />
                </th>
                <th className="hand" onClick={sort('activationStatus')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.activationStatus">Activation Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('activationStatus')} />
                </th>
                <th className="hand" onClick={sort('avatarImg')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.avatarImg">Avatar Img</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('avatarImg')} />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.typeOfPerson">Type Of Person</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.district">District</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.person.managerPerson">Manager Person</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {personList.map((person, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/person/${person.id}`} color="link" size="sm">
                      {person.id}
                    </Button>
                  </td>
                  <td>{person.firstname}</td>
                  <td>{person.lastname}</td>
                  <td>{person.fullname}</td>
                  <td>{person.birthDate ? <TextFormat type="date" value={person.birthDate} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>
                    <Translate contentKey={`azimuteErpSpringReactMonolith03App.GenderEnum.${person.gender}`} />
                  </td>
                  <td>{person.codeBI}</td>
                  <td>{person.codeNIF}</td>
                  <td>{person.streetAddress}</td>
                  <td>{person.houseNumber}</td>
                  <td>{person.locationName}</td>
                  <td>{person.postalCode}</td>
                  <td>{person.mainEmail}</td>
                  <td>{person.landPhoneNumber}</td>
                  <td>{person.mobilePhoneNumber}</td>
                  <td>{person.occupation}</td>
                  <td>{person.preferredLanguage}</td>
                  <td>{person.usernameInOAuth2}</td>
                  <td>{person.userIdInOAuth2}</td>
                  <td>{person.customAttributesDetailsJSON}</td>
                  <td>
                    <Translate contentKey={`azimuteErpSpringReactMonolith03App.ActivationStatusEnum.${person.activationStatus}`} />
                  </td>
                  <td>
                    {person.avatarImg ? (
                      <div>
                        {person.avatarImgContentType ? (
                          <a onClick={openFile(person.avatarImgContentType, person.avatarImg)}>
                            <img src={`data:${person.avatarImgContentType};base64,${person.avatarImg}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {person.avatarImgContentType}, {byteSize(person.avatarImg)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {person.typeOfPerson ? <Link to={`/type-of-person/${person.typeOfPerson.id}`}>{person.typeOfPerson.code}</Link> : ''}
                  </td>
                  <td>{person.district ? <Link to={`/district/${person.district.id}`}>{person.district.name}</Link> : ''}</td>
                  <td>
                    {person.managerPerson ? <Link to={`/person/${person.managerPerson.id}`}>{person.managerPerson.lastname}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/person/${person.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/person/${person.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/person/${person.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.home.notFound">No People found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={personList && personList.length > 0 ? '' : 'd-none'}>
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

export default Person;

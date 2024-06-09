import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './person.reducer';

export const PersonDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const personEntity = useAppSelector(state => state.person.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="personDetailsHeading">
          <Translate contentKey="azimuteErpSpringReactMonolith03App.person.detail.title">Person</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{personEntity.id}</dd>
          <dt>
            <span id="firstname">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.firstname">Firstname</Translate>
            </span>
          </dt>
          <dd>{personEntity.firstname}</dd>
          <dt>
            <span id="lastname">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.lastname">Lastname</Translate>
            </span>
          </dt>
          <dd>{personEntity.lastname}</dd>
          <dt>
            <span id="fullname">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.fullname">Fullname</Translate>
            </span>
          </dt>
          <dd>{personEntity.fullname}</dd>
          <dt>
            <span id="birthDate">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.birthDate">Birth Date</Translate>
            </span>
          </dt>
          <dd>
            {personEntity.birthDate ? <TextFormat value={personEntity.birthDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="gender">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{personEntity.gender}</dd>
          <dt>
            <span id="codeBI">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.codeBI">Code BI</Translate>
            </span>
          </dt>
          <dd>{personEntity.codeBI}</dd>
          <dt>
            <span id="codeNIF">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.codeNIF">Code NIF</Translate>
            </span>
          </dt>
          <dd>{personEntity.codeNIF}</dd>
          <dt>
            <span id="streetAddress">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.streetAddress">Street Address</Translate>
            </span>
          </dt>
          <dd>{personEntity.streetAddress}</dd>
          <dt>
            <span id="houseNumber">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.houseNumber">House Number</Translate>
            </span>
          </dt>
          <dd>{personEntity.houseNumber}</dd>
          <dt>
            <span id="locationName">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.locationName">Location Name</Translate>
            </span>
          </dt>
          <dd>{personEntity.locationName}</dd>
          <dt>
            <span id="postalCode">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.postalCode">Postal Code</Translate>
            </span>
          </dt>
          <dd>{personEntity.postalCode}</dd>
          <dt>
            <span id="mainEmail">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.mainEmail">Main Email</Translate>
            </span>
          </dt>
          <dd>{personEntity.mainEmail}</dd>
          <dt>
            <span id="landPhoneNumber">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.landPhoneNumber">Land Phone Number</Translate>
            </span>
          </dt>
          <dd>{personEntity.landPhoneNumber}</dd>
          <dt>
            <span id="mobilePhoneNumber">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.mobilePhoneNumber">Mobile Phone Number</Translate>
            </span>
          </dt>
          <dd>{personEntity.mobilePhoneNumber}</dd>
          <dt>
            <span id="occupation">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.occupation">Occupation</Translate>
            </span>
          </dt>
          <dd>{personEntity.occupation}</dd>
          <dt>
            <span id="preferredLanguage">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.preferredLanguage">Preferred Language</Translate>
            </span>
          </dt>
          <dd>{personEntity.preferredLanguage}</dd>
          <dt>
            <span id="usernameInOAuth2">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.usernameInOAuth2">Username In O Auth 2</Translate>
            </span>
          </dt>
          <dd>{personEntity.usernameInOAuth2}</dd>
          <dt>
            <span id="userIdInOAuth2">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.userIdInOAuth2">User Id In O Auth 2</Translate>
            </span>
          </dt>
          <dd>{personEntity.userIdInOAuth2}</dd>
          <dt>
            <span id="customAttributesDetailsJSON">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.customAttributesDetailsJSON">
                Custom Attributes Details JSON
              </Translate>
            </span>
          </dt>
          <dd>{personEntity.customAttributesDetailsJSON}</dd>
          <dt>
            <span id="activationStatus">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.activationStatus">Activation Status</Translate>
            </span>
          </dt>
          <dd>{personEntity.activationStatus}</dd>
          <dt>
            <span id="avatarImg">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.person.avatarImg">Avatar Img</Translate>
            </span>
          </dt>
          <dd>
            {personEntity.avatarImg ? (
              <div>
                {personEntity.avatarImgContentType ? (
                  <a onClick={openFile(personEntity.avatarImgContentType, personEntity.avatarImg)}>
                    <img src={`data:${personEntity.avatarImgContentType};base64,${personEntity.avatarImg}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {personEntity.avatarImgContentType}, {byteSize(personEntity.avatarImg)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.person.typeOfPerson">Type Of Person</Translate>
          </dt>
          <dd>{personEntity.typeOfPerson ? personEntity.typeOfPerson.code : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.person.district">District</Translate>
          </dt>
          <dd>{personEntity.district ? personEntity.district.name : ''}</dd>
          <dt>
            <Translate contentKey="azimuteErpSpringReactMonolith03App.person.managerPerson">Manager Person</Translate>
          </dt>
          <dd>{personEntity.managerPerson ? personEntity.managerPerson.lastname : ''}</dd>
        </dl>
        <Button tag={Link} to="/person" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/person/${personEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PersonDetail;

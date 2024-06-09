import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPaymentGateway } from 'app/shared/model/payment-gateway.model';
import { getEntities as getPaymentGateways } from 'app/entities/payment-gateway/payment-gateway.reducer';
import { IPayment } from 'app/shared/model/payment.model';
import { PaymentTypeEnum } from 'app/shared/model/enumerations/payment-type-enum.model';
import { PaymentStatusEnum } from 'app/shared/model/enumerations/payment-status-enum.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';
import { getEntity, updateEntity, createEntity, reset } from './payment.reducer';

export const PaymentUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const paymentGateways = useAppSelector(state => state.paymentGateway.entities);
  const paymentEntity = useAppSelector(state => state.payment.entity);
  const loading = useAppSelector(state => state.payment.loading);
  const updating = useAppSelector(state => state.payment.updating);
  const updateSuccess = useAppSelector(state => state.payment.updateSuccess);
  const paymentTypeEnumValues = Object.keys(PaymentTypeEnum);
  const paymentStatusEnumValues = Object.keys(PaymentStatusEnum);
  const activationStatusEnumValues = Object.keys(ActivationStatusEnum);

  const handleClose = () => {
    navigate('/payment' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPaymentGateways({}));
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
    if (values.installmentNumber !== undefined && typeof values.installmentNumber !== 'number') {
      values.installmentNumber = Number(values.installmentNumber);
    }
    values.paymentDueDate = convertDateTimeToServer(values.paymentDueDate);
    values.paymentPaidDate = convertDateTimeToServer(values.paymentPaidDate);
    if (values.paymentAmount !== undefined && typeof values.paymentAmount !== 'number') {
      values.paymentAmount = Number(values.paymentAmount);
    }

    const entity = {
      ...paymentEntity,
      ...values,
      paymentGateway: paymentGateways.find(it => it.id.toString() === values.paymentGateway?.toString()),
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
          paymentDueDate: displayDefaultDateTime(),
          paymentPaidDate: displayDefaultDateTime(),
        }
      : {
          typeOfPayment: 'CASH',
          statusPayment: 'OPEN',
          activationStatus: 'INACTIVE',
          ...paymentEntity,
          paymentDueDate: convertDateTimeFromServer(paymentEntity.paymentDueDate),
          paymentPaidDate: convertDateTimeFromServer(paymentEntity.paymentPaidDate),
          paymentGateway: paymentEntity?.paymentGateway?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.payment.home.createOrEditLabel" data-cy="PaymentCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.home.createOrEditLabel">Create or edit a Payment</Translate>
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
                  id="payment-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.payment.installmentNumber')}
                id="payment-installmentNumber"
                name="installmentNumber"
                data-cy="installmentNumber"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.payment.paymentDueDate')}
                id="payment-paymentDueDate"
                name="paymentDueDate"
                data-cy="paymentDueDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.payment.paymentPaidDate')}
                id="payment-paymentPaidDate"
                name="paymentPaidDate"
                data-cy="paymentPaidDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.payment.paymentAmount')}
                id="payment-paymentAmount"
                name="paymentAmount"
                data-cy="paymentAmount"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.payment.typeOfPayment')}
                id="payment-typeOfPayment"
                name="typeOfPayment"
                data-cy="typeOfPayment"
                type="select"
              >
                {paymentTypeEnumValues.map(paymentTypeEnum => (
                  <option value={paymentTypeEnum} key={paymentTypeEnum}>
                    {translate('azimuteErpSpringReactMonolith03App.PaymentTypeEnum.' + paymentTypeEnum)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.payment.statusPayment')}
                id="payment-statusPayment"
                name="statusPayment"
                data-cy="statusPayment"
                type="select"
              >
                {paymentStatusEnumValues.map(paymentStatusEnum => (
                  <option value={paymentStatusEnum} key={paymentStatusEnum}>
                    {translate('azimuteErpSpringReactMonolith03App.PaymentStatusEnum.' + paymentStatusEnum)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.payment.customAttributesDetailsJSON')}
                id="payment-customAttributesDetailsJSON"
                name="customAttributesDetailsJSON"
                data-cy="customAttributesDetailsJSON"
                type="text"
                validate={{
                  maxLength: { value: 2048, message: translate('entity.validation.maxlength', { max: 2048 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.payment.activationStatus')}
                id="payment-activationStatus"
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
                id="payment-paymentGateway"
                name="paymentGateway"
                data-cy="paymentGateway"
                label={translate('azimuteErpSpringReactMonolith03App.payment.paymentGateway')}
                type="select"
                required
              >
                <option value="" key="0" />
                {paymentGateways
                  ? paymentGateways.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.aliasCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/payment" replace color="info">
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

export default PaymentUpdate;

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
import { IInvoice } from 'app/shared/model/invoice.model';
import { InvoiceStatusEnum } from 'app/shared/model/enumerations/invoice-status-enum.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';
import { getEntity, updateEntity, createEntity, reset } from './invoice.reducer';

export const InvoiceUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const paymentGateways = useAppSelector(state => state.paymentGateway.entities);
  const invoiceEntity = useAppSelector(state => state.invoice.entity);
  const loading = useAppSelector(state => state.invoice.loading);
  const updating = useAppSelector(state => state.invoice.updating);
  const updateSuccess = useAppSelector(state => state.invoice.updateSuccess);
  const invoiceStatusEnumValues = Object.keys(InvoiceStatusEnum);
  const activationStatusEnumValues = Object.keys(ActivationStatusEnum);

  const handleClose = () => {
    navigate('/invoice' + location.search);
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
    values.invoiceDate = convertDateTimeToServer(values.invoiceDate);
    values.dueDate = convertDateTimeToServer(values.dueDate);
    if (values.taxValue !== undefined && typeof values.taxValue !== 'number') {
      values.taxValue = Number(values.taxValue);
    }
    if (values.shippingValue !== undefined && typeof values.shippingValue !== 'number') {
      values.shippingValue = Number(values.shippingValue);
    }
    if (values.amountDueValue !== undefined && typeof values.amountDueValue !== 'number') {
      values.amountDueValue = Number(values.amountDueValue);
    }
    if (values.numberOfInstallmentsOriginal !== undefined && typeof values.numberOfInstallmentsOriginal !== 'number') {
      values.numberOfInstallmentsOriginal = Number(values.numberOfInstallmentsOriginal);
    }
    if (values.numberOfInstallmentsPaid !== undefined && typeof values.numberOfInstallmentsPaid !== 'number') {
      values.numberOfInstallmentsPaid = Number(values.numberOfInstallmentsPaid);
    }
    if (values.amountPaidValue !== undefined && typeof values.amountPaidValue !== 'number') {
      values.amountPaidValue = Number(values.amountPaidValue);
    }

    const entity = {
      ...invoiceEntity,
      ...values,
      preferrablePaymentGateway: paymentGateways.find(it => it.id.toString() === values.preferrablePaymentGateway?.toString()),
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
          invoiceDate: displayDefaultDateTime(),
          dueDate: displayDefaultDateTime(),
        }
      : {
          status: 'PAID_ONCE',
          activationStatus: 'INACTIVE',
          ...invoiceEntity,
          invoiceDate: convertDateTimeFromServer(invoiceEntity.invoiceDate),
          dueDate: convertDateTimeFromServer(invoiceEntity.dueDate),
          preferrablePaymentGateway: invoiceEntity?.preferrablePaymentGateway?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="azimuteErpSpringReactMonolith03App.invoice.home.createOrEditLabel" data-cy="InvoiceCreateUpdateHeading">
            <Translate contentKey="azimuteErpSpringReactMonolith03App.invoice.home.createOrEditLabel">Create or edit a Invoice</Translate>
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
                  id="invoice-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.invoice.businessCode')}
                id="invoice-businessCode"
                name="businessCode"
                data-cy="businessCode"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 15, message: translate('entity.validation.maxlength', { max: 15 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.invoice.invoiceDate')}
                id="invoice-invoiceDate"
                name="invoiceDate"
                data-cy="invoiceDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.invoice.dueDate')}
                id="invoice-dueDate"
                name="dueDate"
                data-cy="dueDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.invoice.description')}
                id="invoice-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 80, message: translate('entity.validation.maxlength', { max: 80 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.invoice.taxValue')}
                id="invoice-taxValue"
                name="taxValue"
                data-cy="taxValue"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.invoice.shippingValue')}
                id="invoice-shippingValue"
                name="shippingValue"
                data-cy="shippingValue"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.invoice.amountDueValue')}
                id="invoice-amountDueValue"
                name="amountDueValue"
                data-cy="amountDueValue"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.invoice.numberOfInstallmentsOriginal')}
                id="invoice-numberOfInstallmentsOriginal"
                name="numberOfInstallmentsOriginal"
                data-cy="numberOfInstallmentsOriginal"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.invoice.numberOfInstallmentsPaid')}
                id="invoice-numberOfInstallmentsPaid"
                name="numberOfInstallmentsPaid"
                data-cy="numberOfInstallmentsPaid"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.invoice.amountPaidValue')}
                id="invoice-amountPaidValue"
                name="amountPaidValue"
                data-cy="amountPaidValue"
                type="text"
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.invoice.status')}
                id="invoice-status"
                name="status"
                data-cy="status"
                type="select"
              >
                {invoiceStatusEnumValues.map(invoiceStatusEnum => (
                  <option value={invoiceStatusEnum} key={invoiceStatusEnum}>
                    {translate('azimuteErpSpringReactMonolith03App.InvoiceStatusEnum.' + invoiceStatusEnum)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.invoice.customAttributesDetailsJSON')}
                id="invoice-customAttributesDetailsJSON"
                name="customAttributesDetailsJSON"
                data-cy="customAttributesDetailsJSON"
                type="text"
                validate={{
                  maxLength: { value: 4096, message: translate('entity.validation.maxlength', { max: 4096 }) },
                }}
              />
              <ValidatedField
                label={translate('azimuteErpSpringReactMonolith03App.invoice.activationStatus')}
                id="invoice-activationStatus"
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
                id="invoice-preferrablePaymentGateway"
                name="preferrablePaymentGateway"
                data-cy="preferrablePaymentGateway"
                label={translate('azimuteErpSpringReactMonolith03App.invoice.preferrablePaymentGateway')}
                type="select"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/invoice" replace color="info">
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

export default InvoiceUpdate;

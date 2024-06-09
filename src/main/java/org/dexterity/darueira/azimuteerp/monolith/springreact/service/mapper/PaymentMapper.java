package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Payment;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.PaymentGateway;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.PaymentDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.PaymentGatewayDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Payment} and its DTO {@link PaymentDTO}.
 */
@Mapper(componentModel = "spring")
public interface PaymentMapper extends EntityMapper<PaymentDTO, Payment> {
    @Mapping(target = "paymentGateway", source = "paymentGateway", qualifiedByName = "paymentGatewayAliasCode")
    PaymentDTO toDto(Payment s);

    @Named("paymentGatewayAliasCode")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "aliasCode", source = "aliasCode")
    PaymentGatewayDTO toDtoPaymentGatewayAliasCode(PaymentGateway paymentGateway);
}

package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.PaymentGateway;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.PaymentGatewayDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link PaymentGateway} and its DTO {@link PaymentGatewayDTO}.
 */
@Mapper(componentModel = "spring")
public interface PaymentGatewayMapper extends EntityMapper<PaymentGatewayDTO, PaymentGateway> {}

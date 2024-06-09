package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.PaymentGatewayAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.PaymentGatewayTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PaymentGatewayMapperTest {

    private PaymentGatewayMapper paymentGatewayMapper;

    @BeforeEach
    void setUp() {
        paymentGatewayMapper = new PaymentGatewayMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getPaymentGatewaySample1();
        var actual = paymentGatewayMapper.toEntity(paymentGatewayMapper.toDto(expected));
        assertPaymentGatewayAllPropertiesEquals(expected, actual);
    }
}

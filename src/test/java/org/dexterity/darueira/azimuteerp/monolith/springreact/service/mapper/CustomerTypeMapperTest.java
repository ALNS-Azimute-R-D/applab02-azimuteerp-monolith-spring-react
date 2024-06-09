package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.CustomerTypeAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.CustomerTypeTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CustomerTypeMapperTest {

    private CustomerTypeMapper customerTypeMapper;

    @BeforeEach
    void setUp() {
        customerTypeMapper = new CustomerTypeMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCustomerTypeSample1();
        var actual = customerTypeMapper.toEntity(customerTypeMapper.toDto(expected));
        assertCustomerTypeAllPropertiesEquals(expected, actual);
    }
}

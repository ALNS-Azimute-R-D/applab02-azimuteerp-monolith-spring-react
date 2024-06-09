package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.CommonLocalityAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.CommonLocalityTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CommonLocalityMapperTest {

    private CommonLocalityMapper commonLocalityMapper;

    @BeforeEach
    void setUp() {
        commonLocalityMapper = new CommonLocalityMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCommonLocalitySample1();
        var actual = commonLocalityMapper.toEntity(commonLocalityMapper.toDto(expected));
        assertCommonLocalityAllPropertiesEquals(expected, actual);
    }
}
